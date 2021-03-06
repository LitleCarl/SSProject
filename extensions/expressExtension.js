var _ = require('lodash');
var util = require('util');
module.exports = function (express) {
    // options: {viewPath: , locals: }
    express.response.renderWithValidation = async function (req, callback, options = {}) {
        var res = this;
        var locals = options['locals'] || {}
        if (!locals['err']) {
            locals['err'] = []
        }
        else if (!_.isArray(locals['err'])) {
            locals['err'] = [locals['err']]
        }

        return req.getValidationResult().then(async function(result) {
            if (!result.isEmpty()) {
                locals['err'].push(result.array()[0]['msg']);
                return locals
            }
            else {
                try {
                    if (callback) {
                        let returnValue = callback();
                        var trueValue;
                        if (returnValue && returnValue.then) {
                           trueValue = await returnValue;
                        }
                        else {
                            trueValue = returnValue
                        }

                        var customAsName = 'pageData';

                        var tempLocals = {}
                        // 判断as是否可用
                        var recursiveSet = function (node, arrayOfValues){
                            let checkingResult = _.map(arrayOfValues, function (item) {
                                                    if (_.isString(item)) {
                                                        return 'String'
                                                    }
                                                    else if (_.isArray(item)) {
                                                        return 'Array'
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                });
                            let uniqCheckingTypes = _.uniq(checkingResult);
                            // 每一项又是一个数组
                            if (uniqCheckingTypes.length == 1 && uniqCheckingTypes[0] == 'Array') {
                               let nestedRecursive =  _.uniq(_.map(arrayOfValues, function (nestedArray) {
                                    return recursiveSet(node, nestedArray)
                                }));

                                return (nestedRecursive.length == 1 && nestedRecursive[0] == true)
                            }
                            else if (_.last(checkingResult) == 'String' && _.last(arrayOfValues).toLowerCase().indexOf('as ') == 0) {
                                let pattern = _.without(_.split(_.last(arrayOfValues), " "), "");
                                if (pattern && pattern.length == 2 && pattern[0].toLowerCase() == 'as') {
                                    var customAsName = pattern[1];
                                    var finalValue = _.dropRight(arrayOfValues);
                                    if (finalValue.length == 1) {
                                        finalValue = finalValue[0]
                                    }
                                    node[customAsName] = finalValue;
                                    return true
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false
                            }
                        };

                        if (recursiveSet(tempLocals, trueValue)) {
                            locals = _.assign(locals, tempLocals)
                        }
                        else {
                            locals[customAsName] = trueValue;
                        }

                        if (req.user) {
                            locals['user'] = req.user
                        }
                    }

                }
                catch (e) {
                    locals['err'].push( _.isError(e) ? e.message : e.toString());

                    console.log('API Raise: ', e)
                }
                finally {
                    console.log('locals: ,', locals);
                    return locals
                }
            }
        })
    };

    express.response.apiValidation = async function(req, cb) {
        var res = this;
        var apiResult = {code: 1};
        let locals = await res.renderWithValidation(req, cb);
        apiResult.data = locals;
        if (locals['err'] && locals['err'].length > 0) {
            apiResult['code'] = 0;
            apiResult['err'] = locals['err'];
        }
        delete locals['err']

        return apiResult
    }
};
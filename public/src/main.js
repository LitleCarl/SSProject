var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./jsx/header');
var Footer = require('./jsx/footer');
var Body = require('./jsx/body');
var PriceUnit = require('./jsx/price-unit');
var SignIn = require('./jsx/loginForm');
var Profile = require('./jsx/profile');
exports.ReactDOM = ReactDOM;
exports.React = React;
const Components = exports.components = {
    Header: Header,
    Footer: Footer,
    Body: Body,
    PriceUnit: PriceUnit,
    SignIn: SignIn,
    Profile: Profile
};

const header = <Components.Header user={locals['user']}/>


if (pageRoute == 'index') {
    ReactDOM.render(
        <div>
            {header}
            <Components.Body/>
            <Components.PriceUnit/>
            <Components.Footer/>
        </div>
        ,
        document.getElementById('root')
    );
}
else if (pageRoute == 'signin'){
    var errData = locals['err'];
    ReactDOM.render(
        <div>
            {header}
            <Components.SignIn err={errData}/>
            <Components.Footer/>
        </div>
        ,
        document.getElementById('root')
    );
}
else if (pageRoute == 'profile'){
    var errData = locals['err'];
    var user = locals['user'];
    var regions = locals['regions'];
    var regionsOwned = locals['regionsOwned'];
    ReactDOM.render(
        <div>
            {header}
            <Components.Profile user={user} regions={regions} regionsOwned={regionsOwned}/>
            <Components.Footer/>
        </div>
        ,
        document.getElementById('root')
    );
}
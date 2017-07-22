var React = require('react');

class PriceUnit extends React.Component {
    render (){
        var model = this.props['model']
        return <div className="pricing animated swing">
            <div className="thumbnail animated pulse infinite">
                <div className="price-unit-fa fa fa-paper-plane" />
            </div>
            <div className="price-unit-title">
                {model['name']}
            </div>
            <div className="content">
                <div className="price-unit-sub-title">
                    {model['price']}
                    <i>per year</i>
                </div>
                <ul>
                    <li>
                        <div className="price-unit-fa fa fa-check" />
                        Complete Access To All Themes
                    </li>
                    <li>
                        <div className="price-unit-fa fa fa-check" />
                        Perpetual Theme Updates
                    </li>
                    <li>
                        <div className="price-unit-fa fa fa-check" />
                        Premium Technical Support
                    </li>
                    <li>
                        <div className="price-unit-fa fa fa-close" />
                        Complete Access To All Plugins
                    </li>
                    <li>
                        <div className="price-unit-fa fa fa-close" />
                        Layered Photoshop Files
                    </li>
                    <li>
                        <div className="price-unit-fa fa fa-close" />
                        No Yearly Fees
                    </li>
                </ul>
                <a href="https://www.elegantthemes.com/cgi-bin/members/register.cgi?sub=16">
                    Sign Up
                </a>
            </div>
            <div className="clickMe">
                Click
            </div>
        </div>
    }
}

module.exports = class PriceUnitList extends React.Component {
    render () {
        var models = [{
            name: '日本',
            price: '$9.9'
        },{
            name: '韩国',
            price: '$9.9'
        },{
            name: '美国',
            price: '$12.9'
        },{
            name: '台湾',
            price: '$9.9'
        },{
            name: '大陆',
            price: '$9.9'
        }];
        return (
        <div>
            <nav className="level" style={{'justifyContent': 'center', flexWrap: 'wrap'}}>

                {
                    models.map(
                    function(v, i){

                        return  <div className="level-item has-text-centered" style={{'flexGrow': 0, margin: '2em'}} key={i}>
                            <PriceUnit model={models[i]}/>
                        </div>
                    }
                )}
            </nav>
        </div>

        );
    }
};
var React = require('react');
var _ = require('lodash')
var moment = require('moment');
var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup') // ES5 with npm

var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryBrief(name) {
    var brief = ''
    _.each(isoCountries, (full, bf)=>{
        if (name == full) {
            brief = bf.toLowerCase()
            return false
        }
    });
    return brief
}

class Account extends React.Component {
    render() {
        return  <section style={{flexDirection: 'row', display: 'flex', marginTop: '20px'}}>
            <section style={{flexDirection: 'column', display: 'flex'}}>
                <figure className="image is-96x96" style={{}}>
                    <img src="http://bulma.io/images/placeholders/128x128.png"/>
                </figure>
                <a className="button is-small" style={{marginTop: '1em'}}>Change</a>
            </section>

            <section style={{flexGrow: 1,marginLeft: '50px'}}>
                <div>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Email" name="email" value={this.props.user.email} />
                                                <span className="icon is-small is-left">
                                                  <i className="fa fa-envelope" />
                                                </span>

                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password" name="password" value={this.props.user.password} />
                                                <span className="icon is-small is-left">
                                                  <i className="fa fa-lock" />
                                                </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Repeat Password" name="passwordRepeat" value={this.props.user.password} />
                                                <span className="icon is-small is-left">
                                                  <i className="fa fa-lock" />
                                                </span>
                        </p>
                    </div>
                </div>
            </section>
            </section>
    }
}

class RegionUnowned extends React.Component {

    render() {
        var self = this;
        var selectedRegions = this.props['selectedRegions'];
        var regionsUnowned = this.props['regionsUnowned'];
        if (regionsUnowned == null || regionsUnowned.length < 1) {
            return  <h4>No more regions available for you! Thanks.</h4>
        }
        else {
            return <section style={{flexDirection: 'row', display: 'flex', marginTop: '5px', background: '#fafafa'}}>
                {
                    _.map(regionsUnowned, (region)=>{
                        var selected=  _.indexOf(selectedRegions, region) >= 0;
                        return  <section style={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}} key={region.id}>
                                <div style={{flexDirection: 'column', display: 'flex', alignItems:'center', margin: '0.5em 1em', cursor:'pointer'}} onClick={
                                    ()=>{
                                       self.props.selectHandler(region)
                                    }
                                } >
                                    <figure className="" style={{display: 'flex', filter: selected ? '' : 'grayscale(100%)', width: '63px', height: '48px'}}>
                                        <div className={`flag-icon flag-icon-${getCountryBrief(region.name)}`} style={{flexGrow: 1}}></div>
                                    </figure>
                                    {
                                        selected ?  <h2 className="is-success">{region.name}</h2> : <h2>{region.name}</h2>
                                    }

                                </div>
                            </section>

                    })
                }
            </section>

        }

    }
}
RegionUnowned.propTypes = {
    selectedRegions: React.PropTypes.array,
    regionsUnowned: React.PropTypes.array,
    selectHandler: React.PropTypes.func
};

class RegionOwned extends React.Component {
    render() {
        var regionsOwned = this.props['regionsOwned'];

        if (regionsOwned == null || regionsOwned.length < 1) {
            return  <h4>You have no region available.</h4>
        }
        else {
            return <section style={{flexDirection: 'column', display: 'flex', marginTop: '5px', background: '#fafafa'}}>
                {
                    _.map(regionsOwned, (region)=>{
                        // 计算剩余多少天
                        var userRegion = region['userRegion'];
                        var from = moment(userRegion.startAt);
                        var deadline = moment(userRegion.endAt);
                        var interval = deadline.diff(from, 'days');
                        var used = moment().diff(from, 'days');

                        var progress = used / interval;
                        var progressColor = 'is-success'
                        if (progress < 0.5) {
                            progressColor = 'is-success'
                        }
                        else if (progress < 0.7) {
                            progressColor = 'is-warning'
                        }
                        else {
                            progressColor = 'is-danger'
                        }

                        console.log('from:',from)
                        console.log('deadline:',deadline)
                        return(<section style={{flexDirection: 'row', display: 'flex', flexWrap: 'wrap', flexGrow: 1}} key={region.id}>
                                        <div style={{flexDirection: 'column', display: 'flex', alignItems:'center', margin: '0.5em 1em'}}>
                                            <figure className="" style={{display: 'flex', filter: 'grayscale(0%)', width: '63px', height: '48px'}}>
                                                <div className={`flag-icon flag-icon-${getCountryBrief(region.name)}`} style={{flexGrow: 1}}></div>
                                            </figure>
                                            <h2>{region.name}</h2>
                                        </div>
                                        <div style={{flexGrow:1, display: 'flex', alignItems: 'center', padding:'0 1.3em', justifyContent: 'space-between'}}>
                                            <section>
                                                <progress className={`progress ${progressColor}`} value={used} max={interval} style={{marginBottom: '0', maxWidth:'180px', minWidth:'150px'}}>60%</progress>
                                                <span className="title is-6" style={{fontSize: '0.7em'}}>{interval - used} Days Left</span>
                                            </section>

                                            <section>
                                                <a className="button is-small">renew</a>
                                                <a className="button is-small" style={{marginLeft: '0.5em'}}>detail</a>
                                            </section>
                                        </div>
                                    </section>)

                })
            }
            </section>
        }

    }
}

RegionOwned.propTypes = {
    regionsOwned: React.PropTypes.array,
};


const Checkout = class Checkout extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        var itemList = this.props.itemList;

        return <div className="container" style={{maxWidth: '480px', display:'flex', flexDirection:'column'}}>
            <h1 className="title is-2">Payment</h1>
            <h2 className="subtitle" style={{color: '#888'}}>Checkout</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Region</th>
                    <th>Duration</th>
                    <th>Price</th>

                </tr>
                </thead>

                <tbody>
                {
                    _.map(itemList, function(item){
                        return  <tr>
                            <th>1</th>
                            <td>{item.name}</td>
                            <td>
                                <div className="select">
                                    <select>
                                        <option>30 Days</option>
                                        <option>90 Days</option>
                                    </select>
                                </div>
                            </td>
                            <td>{item.price}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>

            <a className="button is-primary is-outlined">Checkout</a>


        </div>
    }
}


const Profile = module.exports = class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRegions: [],
        };
    }

    selectRegion(region) {
        if (region && region['name']) {
            var clonedRegions = _.clone(this.state.selectedRegions);
            if (_.indexOf(clonedRegions, region) >= 0 ) {
                _.remove(clonedRegions, region)
            }
            else {
                clonedRegions.push(region);
            }
            this.setState({
                selectedRegions: clonedRegions
            })
        }
    }

    render () {
        var self = this;
        return (
            <section className="hero">
                <div className="hero-body">
                    <section style={{display:'flex', flexDirection:'column', alignItems: 'center', flexWrap:'wrap'}}>

                        <div className="container" style={{maxWidth: '480px', display:'flex', flexDirection:'column', margin: '0 0'}}>
                            <h1 className="title is-2">Profile</h1>
                            <h2 className="subtitle" style={{color: '#888'}}>Account</h2>

                            <Account user={this.props.user}/>

                            <hr style={{marginTop: '3em'}}/>

                            <h2 className="subtitle" style={{color: '#888'}}>Available Region</h2>
                            <RegionOwned regionsOwned={this.props.regionsOwned}/>

                            <h2 className="subtitle" style={{color: '#888', marginTop: '2em'}}>Buy now {
                                self.state.selectedRegions.length > 0 ? `(${self.state.selectedRegions.length} selected)` : null
                            }</h2>
                            <RegionUnowned regionsUnowned={
                            _.differenceWith(self.props.regions, self.props.regionsOwned, (v1, v2)=>{return v1.id == v2.id})
                        } selectedRegions={self.state.selectedRegions} selectHandler={
                            self.selectRegion.bind(this)
                        }/>
                        </div>

                        {
                           <CSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}>
                               { this.state.selectedRegions.length > 0 ? <Checkout itemList={this.state.selectedRegions}/>: null }
                            </CSSTransitionGroup>
                        }


                    </section>
                </div>
            </section>
        );
    }
};

Profile.propTypes = {
    user: React.PropTypes.object,
    regionsOwned: React.PropTypes.array,
    regions: React.PropTypes.array
};
var React = require('react');

const Header = module.exports = class Header extends React.Component {
    render () {
        var user = this.props.user;
        return (

            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a className="navbar-item" href="http://bulma.io">
                        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width={112} height={28} />
                    </a>
                    <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
            <span className="icon" style={{color: '#333'}}>
              <i className="fa fa-github" />
            </span>
                    </a>
                    <a className="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
            <span className="icon" style={{color: '#55acee'}}>
              <i className="fa fa-twitter" />
            </span>
                    </a>
                    <div className="navbar-burger burger" data-target="navMenuTransparentExample">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                <div id="navMenuTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item " href="http://bulma.io/">
                            Home
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link " href="http://bulma.io/blog/">
                                Blog
                            </a>
                            <div id="blogDropdown" className="navbar-dropdown is-boxed" data-style="width: 18rem;">
                                <a className="navbar-item" href="/2017/03/10/new-field-element/">
                                    <div className="navbar-content">
                                        <p>
                                            <small className="has-text-info">10 Mar 2017</small>
                                        </p>
                                        <p>New field element (for better controls)</p>
                                    </div>
                                </a>
                                <a className="navbar-item" href="/2016/04/11/metro-ui-css-grid-with-bulma-tiles/">
                                    <div className="navbar-content">
                                        <p>
                                            <small className="has-text-info">11 Apr 2016</small>
                                        </p>
                                        <p>Metro UI CSS grid with Bulma tiles</p>
                                    </div>
                                </a>
                                <a className="navbar-item" href="/2016/02/09/blog-launched-new-responsive-columns-new-helpers/">
                                    <div className="navbar-content">
                                        <p>
                                            <small className="has-text-info">09 Feb 2016</small>
                                        </p>
                                        <p>Blog launched, new responsive columns, new helpers</p>
                                    </div>
                                </a>
                                <a className="navbar-item" href="http://bulma.io/blog/">
                                    More posts
                                </a>
                                <hr className="navbar-divider" />
                                <div className="navbar-item">
                                    <div className="navbar-content">
                                        <div className="level is-mobile">
                                            <div className="level-left">
                                                <div className="level-item">
                                                    <strong>Stay up to date!</strong>
                                                </div>
                                            </div>
                                            <div className="level-right">
                                                <div className="level-item">
                                                    <a className="button is-rss is-small" href="http://bulma.io/atom.xml">
                            <span className="icon is-small">
                              <i className="fa fa-rss" />
                            </span>
                                                        <span>Subscribe</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="navbar-end">
                        <a className="navbar-item" href="https://github.com/jgthms/bulma" target="_blank">
                            线路
                        </a>
                        <a className="navbar-item" href="https://twitter.com/jgthms" target="_blank">
                            套餐
                        </a>


                        {
                            user ? <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link  is-active" href="/documentation/overview/start/">
                                    {user.email}
                                </a>
                                <div className="navbar-dropdown is-boxed">
                                    <a className="navbar-item " href="/documentation/overview/start/">
                                        Overview
                                    </a>

                                    <hr className="navbar-divider" />
                                    <div className="navbar-item">
                                        <div> <a className="has-text-info">Sign Out</a></div>
                                    </div>
                                </div>
                            </div> :
                                <div className="navbar-item">
                                    <div className="field is-grouped">
                                        <p className="control">
                                            <a className="button is-primary" href="https://github.com/jgthms/bulma/archive/0.4.3.zip">
                                                <span>登录</span>
                                            </a>
                                        </p>
                                        <p className="control">
                                            <a id="twitter" className="button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&url=http://bulma.io&via=jgthms">
                                                <span>注册</span>
                                            </a>
                                        </p>

                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        );
    }
};

Header.propTypes = {
    user: React.PropTypes.object
}
var React = require('react');

module.exports = class Header extends React.Component {
    render () {
        return (

            <section className="hero is-medium is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <nav className="level">
                            {/* Left side */}
                            <div className="level-left">
                                <div className="level-item" style={{
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                                }}>
                                    <h1 className="title">
                                        先试用,后购买
                                    </h1>
                                    <h2 className="">
                                        价格实惠,安全稳定,连接极速,不限流量,海量VPN服务器
                                    </h2>
                                </div>
                            </div>
                            {/* Right side */}
                            <div className="level-right">
                                <p className="level-item"> <a className="button is-primary is-inverted">立即试用</a></p>
                            </div>
                        </nav>



                    </div>
                </div>
            </section>
        );
    }
};
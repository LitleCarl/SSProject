exports.generateServer = (server) => {
    const Server = db['server']
    var s1 = Server.build();
    s1.host = '150.95.147.125';
    s1.port = '6002';
    s1.password = '123456';
    s1.regionId = 1
    s1.extra = 'z.com'
    s1.save()
}
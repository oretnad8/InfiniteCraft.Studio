const dns = require('dns');

console.log('Resolving SRV...');
dns.resolveSrv('_mongodb._tcp.infinitecraftstore.khpi2fk.mongodb.net', (err, addresses) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Addresses:', JSON.stringify(addresses, null, 2));
});

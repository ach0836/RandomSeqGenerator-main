const { buildClient } = require('@xata.io/client');

const xata = buildClient({
    databaseURL: 'https://AN-CHAE-HEON-s-workspace-m2rvm3.us-east-1.xata.sh/db/random_sequences:main',
    apiKey: process.env.XATA_API_KEY,
});

console.log('Xata Client:', xata);
console.log('Xata DB:', xata.db);

module.exports = { xata };

const { buildClient } = require('@xata.io/client');

const xata = buildClient({
    databaseURL: 'https://AN-CHAE-HEON-s-workspace-m2rvm3.us-east-1.xata.sh/db/canon:main',
    apiKey: process.env.XATA_API_KEY,
});

module.exports = { xata };

const { buildClient } = require('@xata.io/client');

const xata = buildClient({
    databaseURL: 'https://AN-CHAE-HEON-s-workspace-m2rvm3.us-east-1.xata.sh/db/random_sequences:main',
    apiKey: process.env.XATA_API_KEY,
});

// 디버깅 로그 추가
console.log('Xata client initialized:', xata);
console.log('Xata database:', xata.db);

module.exports = { xata };

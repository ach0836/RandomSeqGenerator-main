const { buildClient } = require('@xata.io/client');

const xata = buildClient({
    databaseURL: process.env.XATA_DATABASE_URL,
    apiKey: process.env.XATA_API_KEY,
});

// 디버깅 로그 추가
console.log('Xata client initialized:', xata);
console.log('Xata database:', xata.db);

module.exports = { xata };

const { buildClient } = require('@xata.io/client');

const xata = buildClient({
    databaseURL: process.env.XATA_DATABASE_URL,
    apiKey: process.env.XATA_API_KEY,
});

module.exports = async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Fetching data from Xata...');
            console.log('Xata client:', xata);
            console.log('Xata db:', xata.db); // 데이터베이스 확인
            console.log('Database URL:', process.env.XATA_DATABASE_URL);
            console.log('API Key:', process.env.XATA_API_KEY);

            // 클라이언트 및 데이터베이스 확인
            if (!xata || !xata.db) {
                throw new Error('Xata client is not initialized or database is undefined.');
            }

            const sequences = await xata.db.random_sequences.getAll(); // 테이블 데이터 가져오기
            console.log('Fetched sequences:', sequences);

            res.status(200).json(sequences);
        } catch (error) {
            console.error('Error fetching data from Xata:', error.message);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};

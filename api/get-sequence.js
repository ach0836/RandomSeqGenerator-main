const { xata } = require('../xata');

module.exports = async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Fetching data from Xata...');
            console.log('Xata client:', xata);
            console.log('Database URL:', process.env.XATA_DATABASE_URL);
            console.log('API Key:', process.env.XATA_API_KEY);

            if (!xata || !xata.db) {
                throw new Error('Xata client is not initialized or database is undefined.');
            }

            const sequences = await xata.db.random_sequences.getAll(); // 테이블 이름 확인
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

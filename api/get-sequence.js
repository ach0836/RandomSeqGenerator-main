const { xata } = require('../xata');

module.exports = async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Fetching data from Xata...');
            console.log('Xata client:', xata);
            console.log('Database URL:', process.env.XATA_DATABASE_URL); // 올바른 환경 변수 확인
            console.log('API Key:', process.env.XATA_API_KEY);

            // 클라이언트 초기화 검증
            if (!xata || !xata.db) {
                throw new Error('Xata client is not initialized or database is undefined.');
            }

            // 데이터베이스 테이블 접근 테스트
            console.log('Available databases:', xata.db);

            const sequences = await xata.db.random_sequences.getAll(); // 테이블에서 데이터 가져오기
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

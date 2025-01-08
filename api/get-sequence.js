const { xata } = require('../xata');

module.exports = async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Fetching data from Xata...');
            console.log('Xata client:', xata);
            console.log('Database URL:', process.env.XATA_DATABASE_URL);
            console.log('API Key:', process.env.XATA_API_KEY);

            // 데이터 가져오기
            const records = await xata.db.random_sequences.getMany();
            console.log('Fetched records:', records);

            if (!records || records.length === 0) {
                console.log('No records found in the table.');
                return res.status(404).json({ success: false, message: 'No records found' });
            }

            res.status(200).json({ success: true, records });
        } catch (error) {
            console.error('Error fetching data from Xata:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};

import { xata } from '../../xata';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Fetching data from Xata...');
            const records = await xata.db.random_sequences.getMany();
            console.log('Fetched records:', records);

            if (records.length === 0) {
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
}

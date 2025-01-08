const { xata } = require('../xata');


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const records = await xata.db.random_sequences.getMany({ pagination: { size: 1 } });
            res.status(200).json({ success: true, record: records[0] });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}

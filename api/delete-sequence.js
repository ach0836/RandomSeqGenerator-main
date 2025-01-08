const { xata } = require('../../xata');


export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.body;

        try {
            await xata.db.random_sequences.delete(id);
            res.status(200).json({ success: true, message: 'Record deleted' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}

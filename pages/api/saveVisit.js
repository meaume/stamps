import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }

    const uri = process.env.MONGODB_URI; // MongoDB URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    const db = client.db('stampTour'); // 데이터베이스 이름

    cachedClient = client;
    cachedDb = db;

    return { client, db };
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { locationId, locationName } = req.body;

        if (!locationId || !locationName) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        try {
            const { db } = await connectToDatabase();
            await db.collection('visits').insertOne({
                locationId,
                locationName,
                timestamp: new Date(),
            });

            return res.status(200).json({ message: 'Visit saved successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to save visit' });
        }
    }

    if (req.method === 'GET') {
        try {
            const { db } = await connectToDatabase();
            const visits = await db.collection('visits').find({}).toArray();

            return res.status(200).json({ data: visits });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch visits' });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}

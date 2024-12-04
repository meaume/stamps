import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://servpeace:<a1b1c1!!>@stamp-tour.pwq37.mongodb.net/?retryWrites=true&w=majority&appName=stamp-tour'; // MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
    if (!client.isConnected()) await client.connect();
    const db = client.db('stampTour');
    return { db, client };
}

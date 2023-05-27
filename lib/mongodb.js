
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://mitzanu:250786aa@cluster1.j5uhq.mongodb.net/?retryWrites=true&w=majority'
const MONGODB_DB = 'bookings'

if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
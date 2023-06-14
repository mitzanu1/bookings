
import { MongoClient } from 'mongodb';

const MONGODB_URI = 'mongodb+srv://mitzanu:250786aa@cluster1.j5uhq.mongodb.net/?retryWrites=true&w=majority'
const MONGODB_DB = 'bookings'

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
import { loggerTimestamp } from "../utils/utils";
import { MongoClient, Db} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB!;
const client = new MongoClient(uri);
const dbName = 'RevoU';

async function connectToDatabase(): Promise<Db> {
    await client.connect();
    loggerTimestamp("Connected to database")
    const db = client.db(dbName);
    return db
}

export default connectToDatabase;


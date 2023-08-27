import { loggerTimestamp } from "../utils/utils";
import { MongoClient, Db} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_DB!;
const client = new MongoClient(uri);
const dbName = 'RevoU';

async function connectToDatabase(): Promise<Db> {
    loggerTimestamp("Connecting to database")
    await client.connect();
    const db = client.db(dbName);
    return db
}

export default connectToDatabase;


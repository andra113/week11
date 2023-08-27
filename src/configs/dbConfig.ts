import { loggerTimestamp } from "../utils/utils";
import { MongoClient, Db} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_DB!;
const client = new MongoClient(uri);
const dbName = 'RevoU';

async function connectToDatabase(): Promise<Db> {
    try {
        loggerTimestamp("Connecting to database")
        await client.connect();
        loggerTimestamp("Connected to database1")
        const db = client.db(dbName);
        return db 
    } catch (error) {
        throw new Error("Database connection error")
    }   
}

export default connectToDatabase;


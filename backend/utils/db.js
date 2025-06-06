import { MongoClient, ServerApiVersion } from 'mongodb';
import { configDotenv } from 'dotenv';

configDotenv();

class DBClient {
    // Connects Mondodb and return instance of the database
    constructor() {
        const database = process.env.DB_DATABASE;
        const url = process.env.DB_URL;
        this.client = new MongoClient(url, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
        });

        this.client.connect()
            .then(() => {
                console.log('Database Connected successfully')
                this.db = this.client.db(database);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    // Checks if Mongodb is connected
    isAlive() {
        return Boolean(this.db);
    }

    async waitForConnection() {
        await this.client.connect()
            .then(() => {
                console.log('Database Connected successfully for test')
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

const dbClient = new DBClient();
export default dbClient;
const { MongoClient, ObjectId } = require('mongodb');

// const url = 'mongodb+srv://anishkumarak8686:Anish123@cluster0.x6fub1x.mongodb.net/';
const url = 'mongodb+srv://outdid:outdid@cluster0.t16a63a.mongodb.net/';

const dbName = 'ev_admin_duplicate';

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(url);
        try {
            await client.connect();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }
    return client.db(dbName);
}

module.exports = {
    connectToDatabase,
};
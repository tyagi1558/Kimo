const { MongoClient } = require('mongodb');
const fs = require('fs');

async function importData() {
    const uri = "mongodb+srv://Anmol908:<password>@cluster.dho9xwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"; // Replace with your MongoDB Atlas connection string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('kimo'); // Replace with your database name
        const collection = database.collection('Courses'); // The collection name

        // Read the JSON file
        const data = JSON.parse(fs.readFileSync('/home/anmol/Anmol/projects/courses.json', 'utf8'));

        // Insert data into the collection
        await collection.insertMany(data);

        console.log('Data imported successfully');
    } catch (error) {
        console.error('Error importing data:', error);
    } finally {
        await client.close();
    }
}

importData();

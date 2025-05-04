import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { name, number, email } = req.body;
  if (!name || !number || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);
    await db.collection('contacts').insertOne({ name, number, email });

    await client.close();

    return res.status(200).json({ message: 'Contact saved successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

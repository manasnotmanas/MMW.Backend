export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { name, number, email } = req.body;
  
    if (!name || !number || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Just for testing; remove this part and add MongoDB later
    res.status(200).json({ message: 'Received successfully' });
  }
  
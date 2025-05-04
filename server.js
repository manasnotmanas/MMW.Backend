require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// Use environment variable or default fallback
const port = process.env.PORT || 5000;
const contactsFile = process.env.CONTACTS_FILE || 'contacts.json';

app.use(cors());
app.use(bodyParser.json());

// POST route to save contact form data
app.post('/api/contact', (req, res) => {
  const { name, number, email } = req.body;

  if (!name || !number || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const contactData = { name, number, email };

  fs.appendFile(contactsFile, JSON.stringify(contactData) + '\n', (err) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).json({ message: 'Error saving data' });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

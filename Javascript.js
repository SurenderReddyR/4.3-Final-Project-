const express = require('express');
const app = express();
const port = 3000;

// Set up MongoDB connection
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/mydatabase';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define API endpoints
app.get('/api/data', (req, res) => {
  // Retrieve all data from the MongoDB collection
  client.connect((err) => {
    const collection = client.db('mydatabase').collection('data');
    collection.find().toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
});

app.get('/api/data/:id', (req, res) => {
  const id = req.params.id;
  // Retrieve data by ID from the MongoDB collection
  client.connect((err) => {
    const collection = client.db('mydatabase').collection('data');
    collection.findOne({ id: id }, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
});

// Define other API endpoints for adding, updating, deleting data

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

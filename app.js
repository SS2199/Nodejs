const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string from Azure Cosmos DB or MongoDB Atlas
const mongoURI = process.env.AZURE_COSMOS_CONNECTIONSTRING;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a simple schema and model
const DataSchema = new mongoose.Schema({
  message: String,
});

const DataModel = mongoose.model('Data', DataSchema);

// Root route
app.get('/', async (req, res) => {
  const data = await DataModel.find();
  res.send(`Hello, Azure! This is a Node.js app. Stored messages: ${JSON.stringify(data)}`);
});


app.get('/add', async (req, res) => {
  try {
    const newData = new DataModel({ message: 'Sample message from Node.js app' });
    console.log('New data object created:', newData);

    await newData.save();
    console.log('Data saved to MongoDB successfully');

    res.send('Data added successfully!');
  } catch (err) {
    console.error('Error while saving data:', err);
    res.status(500).send('Error while saving data');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

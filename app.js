const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Azure Cosmos DB connection string
const mongoURI = "mongodb://celescontainerwebapp-server:Cd8bsmtPGb944jUTWSF6f03i9ZyuoYpKSNd14ZX7rrL5hM9yzcdZF6WidOZABiakigan29ihvSGtACDbgtLJdg==@celescontainerwebapp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@celescontainerwebapp-server@";

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Define a schema and model
const DataSchema = new mongoose.Schema({
  message: { type: String, required: true },
});

const DataModel = mongoose.model('Data', DataSchema);

// Routes
// Serve the HTML UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to fetch all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await DataModel.find();
    res.json({ success: true, messages });
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({ success: false, message: 'Error retrieving messages' });
  }
});

// Endpoint to add a new message
app.post('/add-message', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  try {
    const newData = new DataModel({ message });
    const result = await newData.save();
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Error while saving message:', err);
    res.status(500).json({ success: false, message: 'Error while saving message' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

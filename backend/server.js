const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect('mongodb+srv://username:password@cluster.mongodb.net/myGameDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define schema for player progress
const SaveSchema = new mongoose.Schema({
  playerId: String,
  chapter: Number,
  choices: [String],
});
const Save = mongoose.model('Save', SaveSchema);

// endpoint to save progress
app.post('/save', async (req, res) => {
  const { playerId, chapter, choices } = req.body;
  await Save.findOneAndUpdate({ playerId }, { chapter, choices }, { upsert: true });
  res.send('Progress saved');
});

// endpoint to load progress
app.get('/load/:playerId', async (req, res) => {
  const save = await Save.findOne({ playerId: req.params.playerId });
  res.json(save || {});
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/data/:datasetName', (req, res) => {
  const fileName = req.params.datasetName + '.json';
  const filePath = path.join(__dirname, '../3-memory', fileName);

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(rawData));
  } else {
    res.status(404).json({ error: 'NASA Dataset not found in 3-memory' });
  }
});

app.listen(5000, () => {
  console.log('NASA Earth Jukebox Backend running at http://localhost:5000');
});
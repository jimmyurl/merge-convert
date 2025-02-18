// server/index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/convert', upload.array('files'), async (req, res) => {
  try {
    const { files } = req;
    const convertTo = req.body.convertTo;
    
    // Here you would implement the conversion logic
    // For now, we'll just return the first file
    res.sendFile(files[0].path);
  } catch (error) {
    res.status(500).send('Conversion failed');
  }
});

app.post('/merge', upload.array('files'), async (req, res) => {
  try {
    const { files } = req;
    
    // Here you would implement the merging logic
    // For now, we'll just return the first file
    res.sendFile(files[0].path);
  } catch (error) {
    res.status(500).send('Merge failed');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
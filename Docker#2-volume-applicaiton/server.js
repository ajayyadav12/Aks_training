const fs = require('fs').promises;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});
app.get('/view-feedback', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'view-feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

  // Check if the file already exists
  try {
    await fs.access(finalFilePath);
    res.redirect('/exists');
  } catch (err) {
    // File doesn't exist, create it
    try {
      await fs.writeFile(finalFilePath, content);
      res.redirect('/');
    } catch (err) {
      console.error('Error writing file:', err);
      res.status(500).send('Error writing file');
    }
  }
});

app.listen(80);

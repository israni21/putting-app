// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' });
let inventoryData = []; // In-memory storage

// Upload and process Excel file
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  inventoryData = data.map(item => ({
    id: item.Location, // Adjust based on the actual column name in the Excel file
    spacesAvailable: item.Count // Adjust based on the actual column name in the Excel file
  }));

  fs.unlink(filePath, (err) => {
    if (err) console.error('Error deleting file:', err);
  });

  res.json({ message: 'File processed successfully', data: inventoryData });
});

// Get all inventory items
app.get('/api/inventory', (req, res) => {
  res.json(inventoryData);
});

// Get inventory item by ID
app.get('/api/inventory/:id', (req, res) => {
  const item = inventoryData.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Update inventory item
app.patch('/api/inventory/:id', (req, res) => {
  const itemIndex = inventoryData.findIndex(i => i.id === req.params.id);
  if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

  inventoryData[itemIndex].spacesAvailable -= 1;
  res.json(inventoryData[itemIndex]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

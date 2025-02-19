// server/index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const app = express();
const port = 5000;

// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Endpoint to convert PDF to Word/JPG
app.post('/api/convert', upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    const convertTo = req.body.convertTo;
    
    if (files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // This is where you would implement the actual conversion
    // For now, we'll just simulate it with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would use libraries like:
    // - pdf-lib for PDF manipulation
    // - docx for Word document generation
    // - sharp for image processing

    // Send back a simple success response for now
    res.json({ 
      success: true, 
      message: `Successfully converted ${files.length} file(s) to ${convertTo}` 
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

// Endpoint to merge PDF files
app.post('/api/merge', upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    
    if (files.length < 2) {
      return res.status(400).json({ error: 'At least 2 files required for merging' });
    }

    // This is where you would implement the actual merging
    // For now, we'll just simulate it with a delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real implementation, you would use pdf-lib to merge PDFs:
    /*
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    
    const mergedPdfBytes = await mergedPdf.save();
    const outputPath = path.join('uploads', `merged_${Date.now()}.pdf`);
    fs.writeFileSync(outputPath, mergedPdfBytes);
    
    res.download(outputPath);
    */

    // Send back a simple success response for now
    res.json({ 
      success: true, 
      message: `Successfully merged ${files.length} files` 
    });
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Merge failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
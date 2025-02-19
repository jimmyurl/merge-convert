// src/components/PDFConverter.js
import React, { useState } from 'react';
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  Tab,
  Box,
  Alert,
  AlertTitle
} from '@mui/material'; // Using MUI as an example
import { 
  Upload as UploadIcon, 
  FileText as FileTextIcon, 
  Image as ImageIcon 
} from 'lucide-react';

const PDFConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setError('');
    setSuccess('');
  };

  const handleConversion = async (type) => {
    setConverting(true);
    setError('');
    setSuccess('');

    try {
      // Simulated conversion delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(`Successfully converted ${selectedFiles.length} file(s) to ${type}`);
    } catch (err) {
      setError(err.message || 'Conversion failed');
    } finally {
      setConverting(false);
    }
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      setError('Please select at least 2 files to merge');
      return;
    }

    setConverting(true);
    setError('');
    setSuccess('');

    try {
      // Simulated merge delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(`Successfully merged ${selectedFiles.length} files`);
    } catch (err) {
      setError(err.message || 'Merge failed');
    } finally {
      setConverting(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardHeader title="PDF Converter & Merger" />
      <CardContent>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Convert" />
          <Tab label="Merge" />
        </Tabs>

        <Box hidden={tabValue !== 0}>
          <Box sx={{ 
            border: '2px dashed #ccc', 
            borderRadius: 2, 
            p: 3, 
            textAlign: 'center',
            mb: 3
          }}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-upload"
              multiple
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
              <UploadIcon style={{ width: 48, height: 48, color: '#999', margin: '0 auto' }} />
              <p>Drop PDF files here or click to upload</p>
            </label>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleConversion('DOCX')}
              disabled={!selectedFiles.length || converting}
              fullWidth
              startIcon={<FileTextIcon />}
            >
              Convert to Word
            </Button>
            <Button
              variant="contained"
              onClick={() => handleConversion('JPG')}
              disabled={!selectedFiles.length || converting}
              fullWidth
              startIcon={<ImageIcon />}
            >
              Convert to JPG
            </Button>
          </Box>
        </Box>

        <Box hidden={tabValue !== 1}>
          <Box sx={{ 
            border: '2px dashed #ccc', 
            borderRadius: 2, 
            p: 3, 
            textAlign: 'center',
            mb: 3
          }}>
            <input
              type="file"
              accept=".pdf,.docx,.jpg,.jpeg"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="merge-upload"
              multiple
            />
            <label htmlFor="merge-upload" style={{ cursor: 'pointer' }}>
              <UploadIcon style={{ width: 48, height: 48, color: '#999', margin: '0 auto' }} />
              <p>Select multiple files to merge</p>
            </label>
          </Box>

          <Button
            variant="contained"
            onClick={handleMerge}
            disabled={selectedFiles.length < 2 || converting}
            fullWidth
          >
            Merge Files
          </Button>
        </Box>

        {selectedFiles.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <h3>Selected Files:</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 3 }}>
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFConverter;
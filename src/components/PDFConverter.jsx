import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Image, Combine } from 'lucide-react';

const PDFConverter = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

    // Simulated conversion delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you would handle the conversion here
    setSuccess(`Successfully converted ${selectedFiles.length} file(s) to ${type}`);
    setConverting(false);
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      setError('Please select at least 2 files to merge');
      return;
    }

    setConverting(true);
    setError('');
    setSuccess('');

    // Simulated merge delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, you would handle the merge here
    setSuccess(`Successfully merged ${selectedFiles.length} files`);
    setConverting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">PDF Converter & Merger</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="convert">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="convert" className="w-1/2">Convert</TabsTrigger>
            <TabsTrigger value="merge" className="w-1/2">Merge</TabsTrigger>
          </TabsList>

          <TabsContent value="convert">
            <div className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  multiple
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Drop PDF files here or click to upload</p>
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => handleConversion('DOCX')}
                  disabled={!selectedFiles.length || converting}
                  className="w-1/2"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Convert to Word
                </Button>
                <Button
                  onClick={() => handleConversion('JPG')}
                  disabled={!selectedFiles.length || converting}
                  className="w-1/2"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Convert to JPG
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="merge">
            <div className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf,.docx,.jpg,.jpeg"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="merge-upload"
                  multiple
                />
                <label htmlFor="merge-upload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Select multiple files to merge</p>
                </label>
              </div>

              <Button
                onClick={handleMerge}
                disabled={selectedFiles.length < 2 || converting}
                className="w-full"
              >
                <Combine className="mr-2 h-4 w-4" />
                Merge Files
              </Button>
            </div>
          </TabsContent>

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Selected Files:</h3>
              <ul className="space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-sm">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-6">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default PDFConverter;
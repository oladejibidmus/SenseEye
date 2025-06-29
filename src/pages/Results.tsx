import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Share,
  Printer,
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Results: React.FC = () => {
  const { testResults, patients } = useStore();
  const [selectedResult, setSelectedResult] = useState(testResults[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const filteredResults = testResults.filter(result => {
    const patient = patients.find(p => p.id === result.patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : '';
    
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || result.testType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getPatientInfo = (patientId: string) => {
    return patients.find(p => p.id === patientId);
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 95) return 'text-success';
    if (score >= 90) return 'text-warning';
    return 'text-error';
  };

  const generateReport = async () => {
    if (!selectedResult) return;
    
    setIsGeneratingReport(true);
    
    try {
      const patient = getPatientInfo(selectedResult.patientId);
      if (!patient) {
        throw new Error('Patient information not found');
      }

      // Create a comprehensive report
      const reportContent = `
VISUAL FIELD TEST REPORT
========================

PATIENT INFORMATION:
Name: ${patient.firstName} ${patient.lastName}
Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}
Email: ${patient.email}
Phone: ${patient.phone}
Insurance: ${patient.insuranceProvider}

TEST DETAILS:
Test Date: ${new Date(selectedResult.date).toLocaleDateString()}
Test Type: ${selectedResult.testType}
Strategy: ${selectedResult.strategy}
Eye Tested: ${selectedResult.eye}
Duration: ${Math.floor(selectedResult.duration / 60)}:${(selectedResult.duration % 60).toString().padStart(2, '0')}

GLOBAL INDICES:
Mean Deviation (MD): ${selectedResult.indices.md} dB
Pattern Standard Deviation (PSD): ${selectedResult.indices.psd} dB
Visual Field Index (VFI): ${selectedResult.indices.vfi}%
Glaucoma Hemifield Test (GHT): ${selectedResult.indices.ght}

RELIABILITY INDICES:
False Positives: ${selectedResult.reliability.falsePositives}%
False Negatives: ${selectedResult.reliability.falseNegatives}%
Fixation Losses: ${selectedResult.reliability.fixationLosses}%
Overall Reliability Score: ${selectedResult.reliability.score}%

CLINICAL INTERPRETATION:
${selectedResult.indices.md < -2 ? 'Significant visual field defect detected.' : 'Visual field within normal limits.'}
${selectedResult.reliability.score >= 95 ? 'Test reliability is excellent.' : 
  selectedResult.reliability.score >= 90 ? 'Test reliability is good.' : 'Test reliability is poor - consider retesting.'}

NOTES:
${selectedResult.notes || 'No additional notes.'}

MEDICAL HISTORY:
${patient.medicalHistory.length > 0 ? patient.medicalHistory.join(', ') : 'No significant medical history recorded.'}

Report generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      `.trim();

      // Create and download the report
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Visual_Field_Report_${patient.lastName}_${patient.firstName}_${selectedResult.date}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success notification
      setTimeout(() => {
        alert('Report generated and downloaded successfully!');
      }, 500);

    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handlePrint = () => {
    if (!selectedResult) return;
    
    const patient = getPatientInfo(selectedResult.patientId);
    if (!patient) return;

    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Visual Field Test Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .indices { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            .reliability { background: #e8f5e8; padding: 15px; border-radius: 5px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>VISUAL FIELD TEST REPORT</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="grid">
            <div class="section">
              <h3>Patient Information</h3>
              <p><strong>Name:</strong> ${patient.firstName} ${patient.lastName}</p>
              <p><strong>Date of Birth:</strong> ${new Date(patient.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Email:</strong> ${patient.email}</p>
              <p><strong>Phone:</strong> ${patient.phone}</p>
              <p><strong>Insurance:</strong> ${patient.insuranceProvider}</p>
            </div>
            
            <div class="section">
              <h3>Test Details</h3>
              <p><strong>Test Date:</strong> ${new Date(selectedResult.date).toLocaleDateString()}</p>
              <p><strong>Test Type:</strong> ${selectedResult.testType}</p>
              <p><strong>Strategy:</strong> ${selectedResult.strategy}</p>
              <p><strong>Eye Tested:</strong> ${selectedResult.eye}</p>
              <p><strong>Duration:</strong> ${Math.floor(selectedResult.duration / 60)}:${(selectedResult.duration % 60).toString().padStart(2, '0')}</p>
            </div>
          </div>
          
          <div class="grid">
            <div class="section indices">
              <h3>Global Indices</h3>
              <p><strong>Mean Deviation (MD):</strong> ${selectedResult.indices.md} dB</p>
              <p><strong>Pattern Standard Deviation (PSD):</strong> ${selectedResult.indices.psd} dB</p>
              <p><strong>Visual Field Index (VFI):</strong> ${selectedResult.indices.vfi}%</p>
              <p><strong>Glaucoma Hemifield Test (GHT):</strong> ${selectedResult.indices.ght}</p>
            </div>
            
            <div class="section reliability">
              <h3>Reliability Indices</h3>
              <p><strong>False Positives:</strong> ${selectedResult.reliability.falsePositives}%</p>
              <p><strong>False Negatives:</strong> ${selectedResult.reliability.falseNegatives}%</p>
              <p><strong>Fixation Losses:</strong> ${selectedResult.reliability.fixationLosses}%</p>
              <p><strong>Overall Score:</strong> ${selectedResult.reliability.score}%</p>
            </div>
          </div>
          
          <div class="section">
            <h3>Clinical Notes</h3>
            <p>${selectedResult.notes || 'No additional notes.'}</p>
          </div>
          
          <div class="section">
            <h3>Medical History</h3>
            <p>${patient.medicalHistory.length > 0 ? patient.medicalHistory.join(', ') : 'No significant medical history recorded.'}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleShare = async () => {
    if (!selectedResult) return;
    
    const patient = getPatientInfo(selectedResult.patientId);
    if (!patient) return;

    const shareData = {
      title: 'Visual Field Test Report',
      text: `Visual Field Test Report for ${patient.firstName} ${patient.lastName} - ${selectedResult.testType} test performed on ${new Date(selectedResult.date).toLocaleDateString()}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        alert('Report information copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Unable to share. Please try copying the URL manually.');
    }
  };

  const renderVisualField = (data: number[][]) => {
    return (
      <div className="grid grid-cols-8 gap-1 w-64 h-64 mx-auto">
        {data.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const opacity = Math.max(0.1, Math.min(1, (value + 10) / 50));
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="rounded-sm"
                style={{
                  backgroundColor: value < -5 ? '#ef4444' : value < 0 ? '#f59e0b' : '#22c55e',
                  opacity,
                }}
                title={`${value} dB`}
              />
            );
          })
        )}
      </div>
    );
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Test Results</h1>
            <p className="text-text-secondary">View and analyze visual field test results</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <Button variant="tertiary" icon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results List */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Test Results</h3>
              
              {/* Search and Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    placeholder="Search results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                >
                  <option value="all">All Tests</option>
                  <option value="24-2">24-2</option>
                  <option value="30-2">30-2</option>
                  <option value="10-2">10-2</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => setSelectedResult(result)}
                  className={`w-full text-left p-4 rounded-button border transition-colors ${
                    selectedResult?.id === result.id
                      ? 'bg-accent-primary/20 border-accent-primary'
                      : 'bg-background-tertiary border-border-default hover:border-border-strong'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-text-primary">
                      {getPatientName(result.patientId)}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      result.status === 'completed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p>{result.testType} - {result.eye}</p>
                    <p>{new Date(result.date).toLocaleDateString()}</p>
                    <div className="flex items-center space-x-4">
                      <span>MD: {result.indices.md} dB</span>
                      <span className={getReliabilityColor(result.reliability.score)}>
                        {result.reliability.score}%
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Detailed View */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          {selectedResult ? (
            <>
              {/* Result Header */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {getPatientName(selectedResult.patientId)}
                    </h3>
                    <p className="text-text-secondary">
                      {selectedResult.testType} {selectedResult.strategy} - {selectedResult.eye}
                    </p>
                    <p className="text-text-tertiary text-sm">
                      {new Date(selectedResult.date).toLocaleDateString()} • 
                      Duration: {Math.floor(selectedResult.duration / 60)}:{(selectedResult.duration % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="tertiary" 
                      size="sm" 
                      icon={<Printer className="w-4 h-4" />}
                      onClick={handlePrint}
                    >
                      Print
                    </Button>
                    <Button 
                      variant="tertiary" 
                      size="sm" 
                      icon={<Share className="w-4 h-4" />}
                      onClick={handleShare}
                    >
                      Share
                    </Button>
                    <Button 
                      size="sm" 
                      icon={<FileText className="w-4 h-4" />}
                      onClick={generateReport}
                      loading={isGeneratingReport}
                      disabled={isGeneratingReport}
                    >
                      {isGeneratingReport ? 'Generating...' : 'Report'}
                    </Button>
                  </div>
                </div>

                {/* Global Indices */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-background-tertiary rounded-button">
                    <p className="text-text-tertiary text-sm">Mean Deviation</p>
                    <p className="text-xl font-bold text-text-primary">{selectedResult.indices.md} dB</p>
                    <div className="flex items-center justify-center mt-1">
                      {selectedResult.indices.md < -2 ? (
                        <TrendingDown className="w-4 h-4 text-error" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-success" />
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-background-tertiary rounded-button">
                    <p className="text-text-tertiary text-sm">Pattern Std Dev</p>
                    <p className="text-xl font-bold text-text-primary">{selectedResult.indices.psd} dB</p>
                  </div>
                  
                  <div className="text-center p-4 bg-background-tertiary rounded-button">
                    <p className="text-text-tertiary text-sm">VFI</p>
                    <p className="text-xl font-bold text-text-primary">{selectedResult.indices.vfi}%</p>
                  </div>
                  
                  <div className="text-center p-4 bg-background-tertiary rounded-button">
                    <p className="text-text-tertiary text-sm">GHT</p>
                    <p className="text-sm font-medium text-text-primary">{selectedResult.indices.ght}</p>
                  </div>
                </div>
              </Card>

              {/* Visual Field Map */}
              <Card>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">Visual Field Map</h4>
                  <p className="text-text-tertiary text-sm">Grayscale representation of sensitivity values</p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  {renderVisualField(selectedResult.visualFieldData)}
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-success rounded"></div>
                      <span className="text-text-secondary">Normal (≥0 dB)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-warning rounded"></div>
                      <span className="text-text-secondary">Reduced (-5 to 0 dB)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-error rounded"></div>
                      <span className="text-text-secondary">Defect (&lt;-5 dB)</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Reliability */}
              <Card>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-2">Reliability Analysis</h4>
                  <p className="text-text-tertiary text-sm">Test reliability and quality metrics</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">False Positives</span>
                        <span className={`font-medium ${selectedResult.reliability.falsePositives > 3 ? 'text-warning' : 'text-success'}`}>
                          {selectedResult.reliability.falsePositives}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">False Negatives</span>
                        <span className={`font-medium ${selectedResult.reliability.falseNegatives > 3 ? 'text-warning' : 'text-success'}`}>
                          {selectedResult.reliability.falseNegatives}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Fixation Losses</span>
                        <span className={`font-medium ${selectedResult.reliability.fixationLosses > 2 ? 'text-warning' : 'text-success'}`}>
                          {selectedResult.reliability.fixationLosses}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-center p-6 bg-background-tertiary rounded-button">
                      <p className="text-text-tertiary text-sm mb-2">Overall Reliability Score</p>
                      <p className={`text-3xl font-bold ${getReliabilityColor(selectedResult.reliability.score)}`}>
                        {selectedResult.reliability.score}%
                      </p>
                      <p className="text-text-tertiary text-xs mt-2">
                        {selectedResult.reliability.score >= 95 ? 'Excellent' : 
                         selectedResult.reliability.score >= 90 ? 'Good' : 'Poor'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {selectedResult.notes && (
                  <div className="mt-6 p-4 bg-background-tertiary rounded-button">
                    <h5 className="font-medium text-text-primary mb-2">Notes</h5>
                    <p className="text-text-secondary text-sm">{selectedResult.notes}</p>
                  </div>
                )}
              </Card>
            </>
          ) : (
            <Card>
              <div className="text-center py-12">
                <Eye className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Result Selected</h3>
                <p className="text-text-tertiary">Select a test result from the list to view details</p>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  MoreVertical,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

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

// Mock test results data
const mockTestResults = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    testType: '24-2',
    strategy: 'SITA Standard',
    eye: 'OD',
    date: '2024-01-15',
    duration: 285,
    reliability: { score: 98, falsePositives: 2, falseNegatives: 1, fixationLosses: 0 },
    indices: { md: -2.4, psd: 3.2, vfi: 94, ght: 'Within Normal Limits' },
    status: 'completed'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    testType: '30-2',
    strategy: 'SITA Fast',
    eye: 'OS',
    date: '2024-01-20',
    duration: 195,
    reliability: { score: 95, falsePositives: 1, falseNegatives: 3, fixationLosses: 2 },
    indices: { md: -4.1, psd: 5.8, vfi: 88, ght: 'Borderline' },
    status: 'completed'
  },
  {
    id: '3',
    patientName: 'Emma Rodriguez',
    testType: '24-2',
    strategy: 'SITA Standard',
    eye: 'OU',
    date: '2024-01-22',
    duration: 320,
    reliability: { score: 96, falsePositives: 1, falseNegatives: 2, fixationLosses: 1 },
    indices: { md: -1.8, psd: 2.9, vfi: 97, ght: 'Within Normal Limits' },
    status: 'completed'
  }
];

export const ContentSection: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState(mockTestResults[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredResults = mockTestResults.filter(result => {
    const matchesSearch = result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || result.testType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getReliabilityColor = (score: number) => {
    if (score >= 95) return 'text-success';
    if (score >= 90) return 'text-warning';
    return 'text-error';
  };

  const renderVisualField = (data?: number[][]) => {
    // Generate mock visual field data if not provided
    const fieldData = data || Array(8).fill(null).map(() => 
      Array(8).fill(null).map(() => Math.floor(Math.random() * 40) - 5)
    );

    return (
      <div className="grid grid-cols-8 gap-1 w-64 h-64 mx-auto">
        {fieldData.map((row, rowIndex) =>
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
    <section className="py-16 md:py-32 bg-background-primary">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={item}
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-4"
          >
            Advanced Results Analysis
          </motion.h2>
          <motion.p 
            variants={item}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Comprehensive visual field test results with detailed analysis, 
            reliability metrics, and clinical interpretation tools.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div variants={item}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Test Results Dashboard</h3>
                <p className="text-text-secondary">View and analyze visual field test results with advanced metrics</p>
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
                  <h4 className="text-lg font-semibold text-text-primary mb-4">Test Results</h4>
                  
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
                        <h5 className="font-medium text-text-primary">
                          {result.patientName}
                        </h5>
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
              {/* Result Header */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-text-primary">
                      {selectedResult.patientName}
                    </h4>
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
                    >
                      Print
                    </Button>
                    <Button 
                      variant="tertiary" 
                      size="sm" 
                      icon={<Share className="w-4 h-4" />}
                    >
                      Share
                    </Button>
                    <Button 
                      size="sm" 
                      icon={<FileText className="w-4 h-4" />}
                    >
                      Report
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
                  <h5 className="text-lg font-semibold text-text-primary mb-2">Visual Field Map</h5>
                  <p className="text-text-tertiary text-sm">Grayscale representation of sensitivity values</p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  {renderVisualField()}
                  
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
                      <span className="text-text-secondary">Defect (<-5 dB)</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Reliability Analysis */}
              <Card>
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-text-primary mb-2">Reliability Analysis</h5>
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
              </Card>
            </motion.div>
          </div>

          {/* Feature Highlights */}
          <motion.div 
            variants={container}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-accent-primary" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Comprehensive Reports</h4>
              <p className="text-text-secondary text-sm">
                Generate detailed PDF reports with visual field maps, indices, and clinical interpretations.
              </p>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent-secondary" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Trend Analysis</h4>
              <p className="text-text-secondary text-sm">
                Track progression over time with automated trend analysis and statistical significance testing.
              </p>
            </motion.div>

            <motion.div variants={item} className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Quality Assurance</h4>
              <p className="text-text-secondary text-sm">
                Advanced reliability metrics and quality control ensure accurate, clinically meaningful results.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PatientForm, PatientFormData } from '../components/forms/PatientForm';
import { useStore } from '../store/useStore';
import { useDatabase } from '../hooks/useDatabase';
import {
  Search,
  Plus,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Eye,
  Clock,
  MoreVertical,
  Edit,
  Archive,
  FileText,
  Users,
  RefreshCw,
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

export const Patients: React.FC = () => {
  const { patients, testResults, loading, error } = useStore();
  const { addPatient, updatePatient } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patients[0] || null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPatientTests = (patientId: string) => {
    return testResults.filter(result => result.patientId === patientId);
  };

  const getLastTestDate = (patientId: string) => {
    const tests = getPatientTests(patientId);
    if (tests.length === 0) return null;
    return new Date(Math.max(...tests.map(test => new Date(test.date).getTime())));
  };

  const handleAddPatient = async (patientData: PatientFormData) => {
    try {
      setFormLoading(true);
      
      // Generate a default avatar URL
      const avatarUrl = `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`;
      
      const newPatient = {
        ...patientData,
        avatar: avatarUrl,
        lastVisit: new Date().toISOString().split('T')[0], // Today's date
      };

      console.log('Submitting patient data:', newPatient);
      await addPatient(newPatient);
      setShowPatientForm(false);
      console.log('Patient added successfully');
    } catch (error) {
      console.error('Failed to add patient:', error);
      // You could add a toast notification here
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditPatient = async (patientData: PatientFormData) => {
    if (!editingPatient) return;
    
    try {
      setFormLoading(true);
      
      const updatedPatient = {
        ...patientData,
        avatar: selectedPatient?.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        lastVisit: selectedPatient?.lastVisit || new Date().toISOString().split('T')[0],
      };

      console.log('Updating patient data:', updatedPatient);
      await updatePatient(editingPatient, updatedPatient);
      setEditingPatient(null);
      setShowPatientForm(false);
      console.log('Patient updated successfully');
    } catch (error) {
      console.error('Failed to update patient:', error);
      // You could add a toast notification here
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormSubmit = async (patientData: PatientFormData) => {
    if (editingPatient) {
      await handleEditPatient(patientData);
    } else {
      await handleAddPatient(patientData);
    }
  };

  const openEditForm = (patient: any) => {
    setEditingPatient(patient.id);
    setShowPatientForm(true);
  };

  const openAddForm = () => {
    setEditingPatient(null);
    setShowPatientForm(true);
  };

  const closeForm = () => {
    setEditingPatient(null);
    setShowPatientForm(false);
  };

  // Update selected patient when patients list changes
  React.useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-error text-2xl">⚠</span>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Unable to Load Patients</h3>
          <p className="text-text-secondary mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
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
              <h1 className="text-3xl font-bold text-text-primary mb-2">Patient Management</h1>
              <p className="text-text-secondary">
                Manage patient records and information ({patients.length} patients)
              </p>
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <div className="flex border border-border-default rounded-button overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  List
                </button>
              </div>
              <Button 
                icon={<Plus className="w-4 h-4" />}
                onClick={openAddForm}
              >
                Add Patient
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div variants={item}>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background-secondary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
            />
          </div>
        </motion.div>

        {patients.length === 0 ? (
          <motion.div variants={item}>
            <Card>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No Patients Found</h3>
                <p className="text-text-tertiary mb-4">
                  Get started by adding your first patient to the system.
                </p>
                <Button 
                  icon={<Plus className="w-4 h-4" />}
                  onClick={openAddForm}
                >
                  Add First Patient
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient List */}
            <motion.div variants={item} className="lg:col-span-2">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPatients.map((patient) => {
                    const lastTest = getLastTestDate(patient.id);
                    const patientTests = getPatientTests(patient.id);
                    
                    return (
                      <Card
                        key={patient.id}
                        hover
                        onClick={() => setSelectedPatient(patient)}
                        className={`cursor-pointer transition-all ${
                          selectedPatient?.id === patient.id ? 'ring-2 ring-accent-primary' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={patient.avatar}
                              alt={`${patient.firstName} ${patient.lastName}`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-text-primary">
                                {patient.firstName} {patient.lastName}
                              </h3>
                              <p className="text-sm text-text-tertiary">
                                ID: {patient.id.slice(0, 8)}...
                              </p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-background-tertiary rounded-button">
                            <MoreVertical className="w-4 h-4 text-text-tertiary" />
                          </button>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-text-secondary">
                            <Calendar className="w-3 h-3 mr-2" />
                            DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-text-secondary">
                            <Eye className="w-3 h-3 mr-2" />
                            Tests: {patientTests.length}
                          </div>
                          <div className="flex items-center text-text-secondary">
                            <Clock className="w-3 h-3 mr-2" />
                            Last visit: {lastTest ? lastTest.toLocaleDateString() : 'No tests'}
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border-subtle flex items-center justify-between">
                          <span className={`px-2 py-1 text-xs rounded ${
                            patient.status === 'active' 
                              ? 'bg-success/20 text-success' 
                              : 'bg-text-tertiary/20 text-text-tertiary'
                          }`}>
                            {patient.status}
                          </span>
                          {patient.nextAppointment && (
                            <span className="text-xs text-text-tertiary">
                              Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border-subtle">
                          <th className="text-left py-3 px-4 font-medium text-text-primary">Patient</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">Contact</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">Tests</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">Last Visit</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-text-primary">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPatients.map((patient) => {
                          const lastTest = getLastTestDate(patient.id);
                          const patientTests = getPatientTests(patient.id);
                          
                          return (
                            <tr
                              key={patient.id}
                              className={`border-b border-border-subtle hover:bg-background-tertiary cursor-pointer ${
                                selectedPatient?.id === patient.id ? 'bg-accent-primary/10' : ''
                              }`}
                              onClick={() => setSelectedPatient(patient)}
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={patient.avatar}
                                    alt={`${patient.firstName} ${patient.lastName}`}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div>
                                    <p className="font-medium text-text-primary">
                                      {patient.firstName} {patient.lastName}
                                    </p>
                                    <p className="text-xs text-text-tertiary">
                                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-sm">
                                  <p className="text-text-secondary">{patient.email}</p>
                                  <p className="text-text-tertiary">{patient.phone}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-text-primary font-medium">
                                  {patientTests.length}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-text-secondary text-sm">
                                  {lastTest ? lastTest.toLocaleDateString() : 'No tests'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs rounded ${
                                  patient.status === 'active' 
                                    ? 'bg-success/20 text-success' 
                                    : 'bg-text-tertiary/20 text-text-tertiary'
                                }`}>
                                  {patient.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <button className="p-1 hover:bg-background-secondary rounded">
                                  <MoreVertical className="w-4 h-4 text-text-tertiary" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </motion.div>

            {/* Patient Details */}
            <motion.div variants={item} className="lg:col-span-1">
              {selectedPatient ? (
                <div className="space-y-6">
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-text-primary">Patient Details</h3>
                      <div className="flex space-x-2">
                        <Button 
                          variant="tertiary" 
                          size="sm" 
                          icon={<Edit className="w-3 h-3" />}
                          onClick={() => openEditForm(selectedPatient)}
                        >
                          Edit
                        </Button>
                        <Button variant="tertiary" size="sm" icon={<MoreVertical className="w-3 h-3" />} />
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <img
                        src={selectedPatient.avatar}
                        alt={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                      />
                      <h4 className="text-xl font-bold text-text-primary">
                        {selectedPatient.firstName} {selectedPatient.lastName}
                      </h4>
                      <p className="text-text-tertiary">Patient ID: {selectedPatient.id.slice(0, 8)}...</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-text-tertiary" />
                        <div>
                          <p className="text-sm text-text-tertiary">Date of Birth</p>
                          <p className="text-text-primary">
                            {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-text-tertiary" />
                        <div>
                          <p className="text-sm text-text-tertiary">Email</p>
                          <p className="text-text-primary">{selectedPatient.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-text-tertiary" />
                        <div>
                          <p className="text-sm text-text-tertiary">Phone</p>
                          <p className="text-text-primary">{selectedPatient.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-text-tertiary mt-1" />
                        <div>
                          <p className="text-sm text-text-tertiary">Address</p>
                          <p className="text-text-primary text-sm">{selectedPatient.address}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <h4 className="font-semibold text-text-primary mb-4">Medical History</h4>
                    <div className="space-y-2">
                      {selectedPatient.medicalHistory.map((condition, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-background-tertiary rounded-button text-sm text-text-primary"
                        >
                          {condition}
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  <Card>
                    <h4 className="font-semibold text-text-primary mb-4">Insurance</h4>
                    <p className="text-text-secondary">{selectedPatient.insuranceProvider}</p>
                  </Card>
                  
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-text-primary">Test History</h4>
                      <Button variant="tertiary" size="sm" icon={<FileText className="w-3 h-3" />}>
                        View All
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {getPatientTests(selectedPatient.id).slice(0, 3).map((test) => (
                        <div key={test.id} className="flex items-center justify-between p-3 bg-background-tertiary rounded-button">
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              {test.testType} - {test.eye}
                            </p>
                            <p className="text-xs text-text-tertiary">
                              {new Date(test.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            test.reliability.score >= 95 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                          }`}>
                            {test.reliability.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ) : (
                <Card>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-primary mb-2">No Patient Selected</h3>
                    <p className="text-text-tertiary">Select a patient to view details</p>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Patient Form Modal */}
      <PatientForm
        isOpen={showPatientForm}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        loading={formLoading}
        initialData={editingPatient && selectedPatient ? {
          firstName: selectedPatient.firstName,
          lastName: selectedPatient.lastName,
          dateOfBirth: selectedPatient.dateOfBirth,
          email: selectedPatient.email,
          phone: selectedPatient.phone,
          address: selectedPatient.address,
          medicalHistory: selectedPatient.medicalHistory,
          insuranceProvider: selectedPatient.insuranceProvider,
          status: selectedPatient.status,
        } : undefined}
        isEditing={!!editingPatient}
      />
    </>
  );
};
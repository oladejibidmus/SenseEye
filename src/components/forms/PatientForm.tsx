import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Save,
  Plus,
  Edit,
} from 'lucide-react';

interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patient: PatientFormData) => Promise<void>;
  loading?: boolean;
  initialData?: PatientFormData;
  isEditing?: boolean;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string[];
  insuranceProvider: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export const PatientForm: React.FC<PatientFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    medicalHistory: [],
    insuranceProvider: '',
    avatar: '',
    status: 'active',
  });

  const [medicalCondition, setMedicalCondition] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: '',
        medicalHistory: [],
        insuranceProvider: '',
        avatar: '',
        status: 'active',
      });
    }
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.insuranceProvider.trim()) {
      newErrors.insuranceProvider = 'Insurance provider is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      medicalHistory: [],
      insuranceProvider: '',
      avatar: '',
      status: 'active',
    });
    setMedicalCondition('');
    setErrors({});
    onClose();
  };

  const addMedicalCondition = () => {
    if (medicalCondition.trim() && !formData.medicalHistory.includes(medicalCondition.trim())) {
      setFormData(prev => ({
        ...prev,
        medicalHistory: [...prev.medicalHistory, medicalCondition.trim()]
      }));
      setMedicalCondition('');
    }
  };

  const removeMedicalCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter(c => c !== condition)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background-secondary rounded-card shadow-medium w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-primary/20 rounded-lg flex items-center justify-center">
              {isEditing ? <Edit className="w-4 h-4 text-accent-primary" /> : <User className="w-4 h-4 text-accent-primary" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {isEditing ? 'Edit Patient' : 'Add New Patient'}
              </h2>
              <p className="text-text-tertiary text-sm">
                {isEditing ? 'Update patient information' : 'Enter patient information'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-background-tertiary rounded-button transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`w-full px-3 py-2 bg-background-tertiary border rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent ${
                    errors.firstName ? 'border-error' : 'border-border-default'
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-error text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`w-full px-3 py-2 bg-background-tertiary border rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent ${
                    errors.lastName ? 'border-error' : 'border-border-default'
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-error text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className={`w-full px-3 py-2 bg-background-tertiary border rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent ${
                    errors.dateOfBirth ? 'border-error' : 'border-border-default'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="text-error text-xs mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  className="w-full px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-2 bg-background-tertiary border rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent ${
                      errors.email ? 'border-error' : 'border-border-default'
                    }`}
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-error text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-2 bg-background-tertiary border rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent ${
                      errors.phone ? 'border-error' : 'border-border-default'
                    }`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-error text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-tertiary" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className={`w-full pl-10 pr-4 py-2 bg-background-tertiary border rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-none ${
                      errors.address ? 'border-error' : 'border-border-default'
                    }`}
                    placeholder="Enter full address"
                  />
                </div>
                {errors.address && (
                  <p className="text-error text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Medical Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Insurance Provider *
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData(prev => ({ ...prev, insuranceProvider: e.target.value }))}
                    className={`w-full pl-10 pr-4 py-2 bg-background-tertiary border rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent ${
                      errors.insuranceProvider ? 'border-error' : 'border-border-default'
                    }`}
                    placeholder="Enter insurance provider"
                  />
                </div>
                {errors.insuranceProvider && (
                  <p className="text-error text-xs mt-1">{errors.insuranceProvider}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Medical History
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMedicalCondition())}
                    className="flex-1 px-3 py-2 bg-background-tertiary border border-border-default rounded-input text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                    placeholder="Add medical condition"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    icon={<Plus className="w-3 h-3" />}
                    onClick={addMedicalCondition}
                  >
                    Add
                  </Button>
                </div>
                
                {formData.medicalHistory.length > 0 && (
                  <div className="space-y-2">
                    {formData.medicalHistory.map((condition, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 bg-background-tertiary rounded-button"
                      >
                        <span className="text-text-primary text-sm">{condition}</span>
                        <button
                          type="button"
                          onClick={() => removeMedicalCondition(condition)}
                          className="text-error hover:text-error/80 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border-subtle">
            <Button
              type="button"
              variant="tertiary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={isEditing ? <Edit className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              loading={loading}
            >
              {isEditing ? 'Update Patient' : 'Add Patient'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
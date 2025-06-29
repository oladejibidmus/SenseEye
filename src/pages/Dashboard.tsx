import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PatientForm, PatientFormData } from '../components/forms/PatientForm';
import { useStore } from '../store/useStore';
import { useDatabase } from '../hooks/useDatabase';
import {
  TrendingUp,
  Users,
  Calendar,
  Activity,
  Plus,
  Play,
  Eye,
  Clock,
  Target,
  AlertTriangle,
  UserPlus,
  TestTube,
  CalendarCheck,
  Settings,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

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

interface ActivityItem {
  id: string;
  type: 'test' | 'patient' | 'appointment';
  patient: string;
  action: string;
  time: string;
  status: 'success' | 'warning' | 'info' | 'error';
  timestamp: Date;
}

interface ChartData {
  period: string;
  tests: number;
  reliability: number;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { patients, testResults, appointments, dashboardFrequency, setDashboardFrequency } = useStore();
  const { addPatient } = useDatabase();
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const stats = {
    totalPatients: patients.length,
    testsToday: testResults.filter(test => {
      const testDate = new Date(test.date);
      const today = new Date();
      return testDate.toDateString() === today.toDateString();
    }).length,
    avgReliability: testResults.length > 0 
      ? Math.round(testResults.reduce((sum, test) => sum + test.reliability.score, 0) / testResults.length * 10) / 10
      : 0,
    monthlyBookings: appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      const now = new Date();
      return aptDate.getMonth() === now.getMonth() && aptDate.getFullYear() === now.getFullYear();
    }).length,
  };

  // Generate chart data based on selected frequency
  const chartData = useMemo((): ChartData[] => {
    const today = new Date();
    const data: ChartData[] = [];
    
    switch (dashboardFrequency) {
      case 'daily': {
        // Last 24 hours by hour
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(today);
          hour.setHours(today.getHours() - i, 0, 0, 0);
          
          const hourLabel = hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
          const hourStart = new Date(hour);
          const hourEnd = new Date(hour);
          hourEnd.setHours(hour.getHours() + 1);
          
          // Filter tests for this hour
          const hourTests = testResults.filter(test => {
            const testDate = new Date(test.created_at || test.date);
            return testDate >= hourStart && testDate < hourEnd;
          });
          
          const avgReliability = hourTests.length > 0 
            ? Math.round(hourTests.reduce((sum, test) => sum + test.reliability.score, 0) / hourTests.length)
            : 0;
          
          data.push({
            period: hourLabel,
            tests: hourTests.length,
            reliability: avgReliability
          });
        }
        break;
      }
      
      case 'weekly': {
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dateString = date.toISOString().split('T')[0];
          
          const dayTests = testResults.filter(test => {
            const testDate = new Date(test.date);
            return testDate.toISOString().split('T')[0] === dateString;
          });
          
          const avgReliability = dayTests.length > 0 
            ? Math.round(dayTests.reduce((sum, test) => sum + test.reliability.score, 0) / dayTests.length)
            : 0;
          
          data.push({
            period: dayName,
            tests: dayTests.length,
            reliability: avgReliability
          });
        }
        break;
      }
      
      case 'monthly': {
        // Last 30 days by week
        for (let i = 3; i >= 0; i--) {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - (i * 7 + 6));
          const weekEnd = new Date(today);
          weekEnd.setDate(today.getDate() - (i * 7));
          
          const weekLabel = `Week ${4 - i}`;
          
          const weekTests = testResults.filter(test => {
            const testDate = new Date(test.date);
            return testDate >= weekStart && testDate <= weekEnd;
          });
          
          const avgReliability = weekTests.length > 0 
            ? Math.round(weekTests.reduce((sum, test) => sum + test.reliability.score, 0) / weekTests.length)
            : 0;
          
          data.push({
            period: weekLabel,
            tests: weekTests.length,
            reliability: avgReliability
          });
        }
        break;
      }
      
      case 'yearly': {
        // Last 12 months
        for (let i = 11; i >= 0; i--) {
          const month = new Date(today);
          month.setMonth(today.getMonth() - i, 1);
          
          const monthLabel = month.toLocaleDateString('en-US', { month: 'short' });
          
          const monthTests = testResults.filter(test => {
            const testDate = new Date(test.date);
            return testDate.getMonth() === month.getMonth() && 
                   testDate.getFullYear() === month.getFullYear();
          });
          
          const avgReliability = monthTests.length > 0 
            ? Math.round(monthTests.reduce((sum, test) => sum + test.reliability.score, 0) / monthTests.length)
            : 0;
          
          data.push({
            period: monthLabel,
            tests: monthTests.length,
            reliability: avgReliability
          });
        }
        break;
      }
    }
    
    return data;
  }, [testResults, dashboardFrequency]);

  // Generate real recent activity from database data - LIMITED TO 4 ITEMS
  const recentActivity = useMemo((): ActivityItem[] => {
    const activities: ActivityItem[] = [];

    // Add recent test results (limit to 2)
    testResults
      .sort((a, b) => new Date(b.created_at || b.date).getTime() - new Date(a.created_at || a.date).getTime())
      .slice(0, 2)
      .forEach(test => {
        const patient = patients.find(p => p.id === test.patientId);
        if (patient) {
          const testDate = new Date(test.created_at || test.date);
          const now = new Date();
          const diffMs = now.getTime() - testDate.getTime();
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutes = Math.floor(diffMs / (1000 * 60));
          
          let timeAgo = '';
          if (diffMinutes < 60) {
            timeAgo = diffMinutes <= 1 ? 'Just now' : `${diffMinutes} min ago`;
          } else if (diffHours < 24) {
            timeAgo = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
          } else {
            const diffDays = Math.floor(diffHours / 24);
            timeAgo = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
          }

          activities.push({
            id: `test-${test.id}`,
            type: 'test',
            patient: `${patient.firstName} ${patient.lastName}`,
            action: `Completed ${test.testType} visual field test (${test.eye}) - Reliability: ${test.reliability.score}%`,
            time: timeAgo,
            status: test.reliability.score >= 95 ? 'success' : test.reliability.score >= 90 ? 'warning' : 'error',
            timestamp: testDate,
          });
        }
      });

    // Add recent patient registrations (limit to 1)
    patients
      .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
      .slice(0, 1)
      .forEach(patient => {
        const visitDate = new Date(patient.lastVisit);
        const now = new Date();
        const diffMs = now.getTime() - visitDate.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        
        let timeAgo = '';
        if (diffMinutes < 60) {
          timeAgo = diffMinutes <= 1 ? 'Just now' : `${diffMinutes} min ago`;
        } else if (diffHours < 24) {
          timeAgo = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
        } else {
          const diffDays = Math.floor(diffHours / 24);
          timeAgo = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
        }

        activities.push({
          id: `patient-${patient.id}`,
          type: 'patient',
          patient: `${patient.firstName} ${patient.lastName}`,
          action: `Patient registration updated - Total tests: ${patient.totalTests}`,
          time: timeAgo,
          status: 'info',
          timestamp: visitDate,
        });
      });

    // Add recent appointments (limit to 1)
    appointments
      .filter(apt => apt.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 1)
      .forEach(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        if (patient) {
          const aptDate = new Date(`${appointment.date}T${appointment.time}`);
          const now = new Date();
          const diffMs = aptDate.getTime() - now.getTime();
          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHours / 24);
          
          let timeText = '';
          if (diffDays > 0) {
            timeText = diffDays === 1 ? 'Tomorrow' : `In ${diffDays} days`;
          } else if (diffHours > 0) {
            timeText = diffHours === 1 ? 'In 1 hour' : `In ${diffHours} hours`;
          } else {
            timeText = 'Today';
          }

          activities.push({
            id: `appointment-${appointment.id}`,
            type: 'appointment',
            patient: `${patient.firstName} ${patient.lastName}`,
            action: `${appointment.type} scheduled for ${new Date(appointment.date).toLocaleDateString()}`,
            time: timeText,
            status: 'info',
            timestamp: aptDate,
          });
        }
      });

    // Sort all activities by timestamp (most recent first) and limit to exactly 4
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 4);
  }, [patients, testResults, appointments]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'test': return <TestTube className="w-4 h-4" />;
      case 'patient': return <UserPlus className="w-4 h-4" />;
      case 'appointment': return <CalendarCheck className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-info';
    }
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

      console.log('Adding patient from dashboard:', newPatient);
      await addPatient(newPatient);
      setShowPatientForm(false);
      console.log('Patient added successfully from dashboard');
      
      // Show success message
      alert('Patient added successfully!');
    } catch (error) {
      console.error('Failed to add patient from dashboard:', error);
      alert('Failed to add patient. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const openAddPatientForm = () => {
    setShowPatientForm(true);
  };

  const closePatientForm = () => {
    setShowPatientForm(false);
  };

  const handleStartQuickTest = () => {
    // Navigate to test setup page
    navigate('/setup');
  };

  const getFrequencyLabel = () => {
    switch (dashboardFrequency) {
      case 'daily': return 'Daily View (24 Hours)';
      case 'weekly': return 'Weekly View (7 Days)';
      case 'monthly': return 'Monthly View (4 Weeks)';
      case 'yearly': return 'Yearly View (12 Months)';
      default: return 'Weekly View';
    }
  };

  const getChartTitle = () => {
    switch (dashboardFrequency) {
      case 'daily': return 'Hourly Test Volume';
      case 'weekly': return 'Daily Test Volume';
      case 'monthly': return 'Weekly Test Volume';
      case 'yearly': return 'Monthly Test Volume';
      default: return 'Test Volume';
    }
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Welcome Section */}
        <motion.div variants={item}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Visual Field Testing Dashboard
              </h1>
              <p className="text-text-secondary">
                Comprehensive visual field analysis and patient management system
              </p>
            </div>
            <div className="flex space-x-3 mt-4 lg:mt-0">
              <Button 
                icon={<Plus className="w-4 h-4" />}
                onClick={openAddPatientForm}
              >
                Add New Patient
              </Button>
              <Button 
                variant="secondary" 
                icon={<Play className="w-4 h-4" />}
                onClick={handleStartQuickTest}
              >
                Start Quick Test
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-tertiary text-sm font-medium">Total Patients</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stats.totalPatients}</p>
                <p className="text-success text-sm mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Active patients
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-primary" />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-tertiary text-sm font-medium">Tests Today</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stats.testsToday}</p>
                <p className="text-info text-sm mt-1 flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  Completed today
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent-secondary" />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-tertiary text-sm font-medium">Avg Reliability</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stats.avgReliability}%</p>
                <p className={`text-sm mt-1 flex items-center ${stats.avgReliability >= 95 ? 'text-success' : stats.avgReliability >= 90 ? 'text-warning' : 'text-error'}`}>
                  <Target className="w-3 h-3 mr-1" />
                  {stats.avgReliability >= 95 ? 'Excellent' : stats.avgReliability >= 90 ? 'Good' : 'Needs attention'}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-tertiary text-sm font-medium">Monthly Bookings</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{stats.monthlyBookings}</p>
                <p className="text-info text-sm mt-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  This month
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurable Test Volume Chart */}
          <motion.div variants={item}>
            <Card>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">{getChartTitle()}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate('/settings')}
                      className="p-2 hover:bg-background-tertiary rounded-button transition-colors"
                      title="Change time period in Settings"
                    >
                      <Settings className="w-4 h-4 text-text-tertiary" />
                    </button>
                  </div>
                </div>
                <p className="text-text-tertiary text-sm">
                  {getFrequencyLabel()} - Tests from your database
                  {chartData.reduce((sum, period) => sum + period.tests, 0) === 0 && ` (No tests found in this period)`}
                </p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="period" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Bar dataKey="tests" fill="#ff6b35" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Summary Stats */}
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-text-tertiary">Total Tests</p>
                    <p className="text-text-primary font-semibold">
                      {chartData.reduce((sum, period) => sum + period.tests, 0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-tertiary">Peak Period</p>
                    <p className="text-text-primary font-semibold">
                      {chartData.reduce((max, period) => period.tests > max.tests ? period : max, chartData[0] || { period: 'N/A', tests: 0 }).period}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-tertiary">Average</p>
                    <p className="text-text-primary font-semibold">
                      {Math.round(chartData.reduce((sum, period) => sum + period.tests, 0) / chartData.length * 10) / 10 || 0}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Configurable Reliability Trend */}
          <motion.div variants={item}>
            <Card>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Reliability Trend</h3>
                <p className="text-text-tertiary text-sm">
                  {getFrequencyLabel()} - Average reliability scores
                  {chartData.every(period => period.reliability === 0) && ' (No reliability data available)'}
                </p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="period" stroke="#a3a3a3" />
                    <YAxis domain={[80, 100]} stroke="#a3a3a3" />
                    <Line 
                      type="monotone" 
                      dataKey="reliability" 
                      stroke="#4a9eff" 
                      strokeWidth={3}
                      dot={{ fill: '#4a9eff', strokeWidth: 2, r: 4 }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Reliability Summary */}
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-text-tertiary">Period Average</p>
                    <p className={`font-semibold ${stats.avgReliability >= 95 ? 'text-success' : stats.avgReliability >= 90 ? 'text-warning' : 'text-error'}`}>
                      {stats.avgReliability}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-tertiary">Best Period</p>
                    <p className="text-success font-semibold">
                      {Math.max(...chartData.map(period => period.reliability))}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-tertiary">Quality</p>
                    <p className={`font-semibold ${stats.avgReliability >= 95 ? 'text-success' : stats.avgReliability >= 90 ? 'text-warning' : 'text-error'}`}>
                      {stats.avgReliability >= 95 ? 'Excellent' : stats.avgReliability >= 90 ? 'Good' : 'Poor'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity - LIMITED TO 4 ITEMS */}
        <motion.div variants={item}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Recent Activity</h3>
                <p className="text-text-tertiary text-sm">
                  Latest 4 activities from your database
                  {recentActivity.length === 0 && ' (No recent activity found)'}
                </p>
              </div>
              <Button 
                variant="tertiary" 
                size="sm"
                onClick={() => navigate('/patients')}
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-background-tertiary rounded-button transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)} bg-current bg-opacity-20`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-text-primary font-medium">{activity.patient}</p>
                      <p className="text-text-secondary text-sm">{activity.action}</p>
                    </div>
                    <div className="text-text-tertiary text-sm">
                      {activity.time}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                  <p className="text-text-secondary">No recent activity found</p>
                  <p className="text-text-tertiary text-sm mt-1">
                    Start by adding patients or conducting tests to see activity here
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Patient Form Modal */}
      <PatientForm
        isOpen={showPatientForm}
        onClose={closePatientForm}
        onSubmit={handleAddPatient}
        loading={formLoading}
        isEditing={false}
      />
    </>
  );
};
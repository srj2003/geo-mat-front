import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Calendar, Clock, CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

interface LeaveRequest {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

const mockLeaves: LeaveRequest[] = [
  {
    id: '1',
    type: 'Casual Leave',
    fromDate: '2024-03-15',
    toDate: '2024-03-16',
    status: 'Pending',
    reason: 'Personal work',
  },
  {
    id: '2',
    type: 'Sick Leave',
    fromDate: '2024-03-10',
    toDate: '2024-03-11',
    status: 'Approved',
    reason: 'Medical appointment',
  },
];

export default function MyLeaves() {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');

  const stats = {
    total: 15,
    approved: 10,
    pending: 3,
    rejected: 2,
  };

  const filteredLeaves = mockLeaves.filter(leave => leave.status === activeTab);

  const handleCancelRequest = (id: string) => {
    Alert.alert(
      'Cancel Leave Request',
      'Are you sure you want to cancel this leave request?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => console.log('Cancelled leave:', id) },
      ]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 size={20} color="#10b981" />;
      case 'Pending':
        return <Clock size={20} color="#f59e0b" />;
      case 'Rejected':
        return <XCircle size={20} color="#ef4444" />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Leave Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Calendar size={24} color="#6366f1" />
            <Text style={styles.statCount}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <CheckCircle2 size={24} color="#10b981" />
            <Text style={styles.statCount}>{stats.approved}</Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
          <View style={styles.statItem}>
            <AlertCircle size={24} color="#f59e0b" />
            <Text style={styles.statCount}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <XCircle size={24} color="#ef4444" />
            <Text style={styles.statCount}>{stats.rejected}</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {(['Pending', 'Approved', 'Rejected'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.leavesList}>
        {filteredLeaves.map((leave) => (
          <View key={leave.id} style={styles.leaveCard}>
            <View style={styles.leaveHeader}>
              <Text style={styles.leaveType}>{leave.type}</Text>
              {getStatusIcon(leave.status)}
            </View>
            <View style={styles.leaveDates}>
              <Text style={styles.dateLabel}>From:</Text>
              <Text style={styles.dateText}>{leave.fromDate}</Text>
              <Text style={styles.dateLabel}>To:</Text>
              <Text style={styles.dateText}>{leave.toDate}</Text>
            </View>
            <Text style={styles.reason}>{leave.reason}</Text>
            {leave.status === 'Pending' && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelRequest(leave.id)}>
                <Text style={styles.cancelText}>Cancel Request</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  leavesList: {
    gap: 12,
  },
  leaveCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leaveType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  leaveDates: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#1e293b',
    marginRight: 12,
  },
  reason: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelText: {
    color: '#ef4444',
    fontWeight: '500',
  },
});
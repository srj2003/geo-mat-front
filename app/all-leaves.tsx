import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { Search, Filter } from 'lucide-react-native';

type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

interface LeaveRequest {
  id: string;
  employee: string;
  type: string;
  fromDate: string;
  toDate: string;
  status: LeaveStatus;
  reason: string;
}

const mockLeaves: LeaveRequest[] = [
  {
    id: '1',
    employee: 'John Doe',
    type: 'Casual Leave',
    fromDate: '2024-03-15',
    toDate: '2024-03-16',
    status: 'Pending',
    reason: 'Personal work',
  },
  {
    id: '2',
    employee: 'Jane Smith',
    type: 'Sick Leave',
    fromDate: '2024-03-18',
    toDate: '2024-03-19',
    status: 'Approved',
    reason: 'Medical appointment',
  },
  {
    id: '3',
    employee: 'Alice Johnson',
    type: 'Vacation',
    fromDate: '2024-03-20',
    toDate: '2024-03-22',
    status: 'Rejected',
    reason: 'Family trip',
  },
];

export default function AllLeaves() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeaveStatus | 'All'>('All');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredLeaves = mockLeaves.filter(leave => {
    const matchesSearch = leave.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || leave.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Count the number of leaves by status
  const leaveCounts = {
    All: mockLeaves.length,
    Pending: mockLeaves.filter(leave => leave.status === 'Pending').length,
    Approved: mockLeaves.filter(leave => leave.status === 'Approved').length,
    Rejected: mockLeaves.filter(leave => leave.status === 'Rejected').length,
  };

  const getStatusColor = (status: LeaveStatus) => {
    switch (status) {
      case 'Approved':
        return '#10b981';
      case 'Pending':
        return '#f59e0b';
      case 'Rejected':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  const renderLeaveItem = ({ item }: { item: LeaveRequest }) => (
    <View style={styles.leaveCard}>
      <View style={styles.leaveHeader}>
        <Text style={styles.employeeName}>{item.employee}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.leaveDetails}>
        <Text style={styles.leaveType}>{item.type}</Text>
        <Text style={styles.dates}>
          {item.fromDate} - {item.toDate}
        </Text>
      </View>
      <Text style={styles.reason}>{item.reason}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={24} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search leaves..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {/* Leave Counts Section */}
      <View style={styles.leaveCountsContainer}>
        <View style={styles.leaveCount}>
          <Text style={styles.leaveCountNumber}>{leaveCounts.All}</Text>
          <Text style={styles.leaveCountLabel}>Total</Text>
        </View>
        <View style={styles.leaveCount}>
          <Text style={styles.leaveCountNumber}>{leaveCounts.Pending}</Text>
          <Text style={styles.leaveCountLabel}>Pending</Text>
        </View>
        <View style={styles.leaveCount}>
          <Text style={styles.leaveCountNumber}>{leaveCounts.Approved}</Text>
          <Text style={styles.leaveCountLabel}>Approved</Text>
        </View>
        <View style={styles.leaveCount}>
          <Text style={styles.leaveCountNumber}>{leaveCounts.Rejected}</Text>
          <Text style={styles.leaveCountLabel}>Rejected</Text>
        </View>
      </View>

      <View style={styles.filterTabs}>
        {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterTab,
              selectedStatus === status && styles.filterTabActive,
            ]}
            onPress={() => setSelectedStatus(status)}>
            <Text
              style={[
                styles.filterTabText,
                selectedStatus === status && styles.filterTabTextActive,
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredLeaves}
        renderItem={renderLeaveItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18, // Increased font size
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaveCountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  leaveCount: {
    alignItems: 'center',
  },
  leaveCountNumber: {
    fontSize: 24, // Increased font size
    fontWeight: '700',
    color: '#1e293b',
  },
  leaveCountLabel: {
    fontSize: 16, // Increased font size
    color: '#64748b',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: '#6366f1',
  },
  filterTabText: {
    color: '#64748b',
    fontSize: 16, // Increased font size
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  leaveCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  employeeName: {
    fontSize: 18, // Increased font size
    fontWeight: '600',
    color: '#1e293b',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 14, // Increased font size
    fontWeight: '500',
  },
  leaveDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  leaveType: {
    fontSize: 16, // Increased font size
    color: '#6366f1',
    fontWeight: '500',
  },
  dates: {
    fontSize: 16, // Increased font size
    color: '#64748b',
  },
  reason: {
    fontSize: 16, // Increased font size
    color: '#64748b',
  },
});
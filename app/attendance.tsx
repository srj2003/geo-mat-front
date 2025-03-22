import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { format } from 'date-fns';
import { Check, X, Clock } from 'lucide-react-native';

interface AttendanceItem {
    id: string;
    date: Date;
    status: 'present' | 'absent';
    checkInTime: string;
    checkOutTime: string;
    location: string;
  }

const mockAttendanceData: AttendanceItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: i.toString(),
  date: new Date(2024, 0, 30 - i),
  status: Math.random() > 0.2 ? 'present' : 'absent',
  checkInTime: '09:00 AM',
  checkOutTime: '05:00 PM',
  location: 'Main Office',
}));

export default function AttendanceScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const renderAttendanceItem = ({ item }: { item: AttendanceItem }) => (
    <Pressable style={styles.attendanceItem}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{format(item.date, 'MMM dd')}</Text>
        <Text style={styles.dayText}>{format(item.date, 'EEEE')}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <View style={styles.statusContainer}>
        {item.status === 'present' ? (
          <>
            <View style={[styles.statusBadge, styles.presentBadge]}>
              <Check size={16} color="#059669" />
              <Text style={styles.presentText}>Present</Text>
            </View>
            <View style={styles.timeContainer}>
              <Clock size={14} color="#64748b" />
              <Text style={styles.timeText}>
                {item.checkInTime} - {item.checkOutTime}
              </Text>
            </View>
          </>
        ) : (
          <View style={[styles.statusBadge, styles.absentBadge]}>
            <X size={16} color="#dc2626" />
            <Text style={styles.absentText}>Absent</Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>John Doe</Text>
        </View>
      </View>
      <FlatList
        data={mockAttendanceData}
        renderItem={renderAttendanceItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerText: {
    marginLeft: 12,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
  },
  nameText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#0f172a',
  },
  listContent: {
    padding: 16,
  },
  attendanceItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  dayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94a3b8',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  presentBadge: {
    backgroundColor: '#dcfce7',
  },
  absentBadge: {
    backgroundColor: '#fee2e2',
  },
  presentText: {
    fontFamily: 'Inter-Medium',
    color: '#059669',
    marginLeft: 4,
  },
  absentText: {
    fontFamily: 'Inter-Medium',
    color: '#dc2626',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
});
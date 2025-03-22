import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { Calendar, Clock as ClockIcon, Timer, UserCheck, UserX, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react-native';
import userAttendanceData from '../../user-attendance-data.json'; // Import JSON data

const { width } = Dimensions.get('window');

export default function StatsScreen() {
  const [selectedView, setSelectedView] = useState<'week' | 'month' | 'year'>('month');
  const [selectedPeriod, setSelectedPeriod] = useState('Last Week'); // State for Work Hours dropdown

  const stats = {
    totalDays: 30,
    presentDays: 26,
    absentDays: 4,
    averageCheckIn: '09:15',
    averageCheckOut: '05:15 PM',
    attendanceRate: '86.7%',
    trend: '+2.3%',
  };

  type StatCardProps = {
    icon: React.ReactElement;
    title: string;
    value: string | number;
    subValue?: string | null;
    color: string;
  };
  const StatCard: React.FC<StatCardProps> = ({ icon, title, value, subValue, color }) => (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.cardHeader}>
        {icon}
        {subValue && (
          <View style={styles.trendContainer}>
            <TrendingUp size={14} color="#059669" />
            <Text style={styles.trendText}>{subValue}</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>User Overview</Text>

      {/* Dropdown for Work Hours */}
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value: string) => setSelectedPeriod(value)}
          items={[
            { label: 'Last Week', value: 'Last Week' },
            { label: 'Last Month', value: 'Last Month' },
            { label: 'Last Year', value: 'Last Year' },
          ]}
          value={selectedPeriod}
          placeholder={{}}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon={<Calendar size={24} color="#0891b2" />}
          title="Total Days"
          value={stats.totalDays}
          subValue={stats.trend}
          color="#f0f9ff"
        />
        <StatCard
          icon={<UserCheck size={24} color="#059669" />}
          title="Present Days"
          value={stats.presentDays}
          subValue={null}
          color="#f0fdf4"
        />
        <StatCard
          icon={<UserX size={24} color="#dc2626" />}
          title="Absent Days"
          value={stats.absentDays}
          subValue={null}
          color="#fef2f2"
        />
        <StatCard
          icon={<ClockIcon size={24} color="#0891b2" />}
          title="Attendance Rate"
          value={stats.attendanceRate}
          subValue={null}
          color="#f0f9ff"
        />
      </View>

      <Text style={styles.sectionTitle}>Time Analysis</Text>
      <View style={styles.timeStats}>
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Average Check-in</Text>
          <Text style={styles.timeValue}>{stats.averageCheckIn}</Text>
        </View>
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Average Check-out</Text>
          <Text style={styles.timeValue}>{stats.averageCheckOut}</Text>
        </View>
      </View>

      {/* Work Hours Section */}
      <Text style={styles.sectionTitle}>Work Hours</Text>
      <Analysis selectedPeriod={selectedPeriod} />
    </ScrollView>
  );
}

const Analysis = ({ selectedPeriod }: { selectedPeriod: string }) => {
  const [workHours, setWorkHours] = useState(0); // State to store total work hours
  const [averageWorkHours, setAverageWorkHours] = useState(0); // State to store average work hours

  // Function to calculate work hours
  const calculateWorkHours = (records: any[]) => {
    let totalMinutes = 0;

    records.forEach((record) => {
      const loginTime = new Date(`1970-01-01T${record.loginTime}Z`);
      const logoutTime = new Date(`1970-01-01T${record.logoutTime}Z`);
      const diff = logoutTime.getTime() - loginTime.getTime(); // Difference in milliseconds
      totalMinutes += diff / (1000 * 60); // Convert to minutes
    });

    const totalHours = (totalMinutes / 60).toFixed(1); // Convert to hours
    const averageHours = (parseFloat(totalHours) / records.length).toFixed(1); // Calculate average

    return { totalHours, averageHours };
  };

  // Function to filter records based on the selected period
  const filterRecords = (period: string) => {
    const today = new Date();
    const records = userAttendanceData.userData.attendanceRecords;

    switch (period) {
      case 'Last Week':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return records.filter((record) => new Date(record.date) >= lastWeek);
      case 'Last Month':
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        return records.filter((record) => new Date(record.date) >= lastMonth);
      case 'Last Year':
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);
        return records.filter((record) => new Date(record.date) >= lastYear);
      default:
        return [];
    }
  };

  // Update work hours when the selected period changes
  useEffect(() => {
    const filteredRecords = filterRecords(selectedPeriod);
    const { totalHours, averageHours } = calculateWorkHours(filteredRecords);
    setWorkHours(parseFloat(totalHours));
    setAverageWorkHours(parseFloat(averageHours));
  }, [selectedPeriod]);

  return (
    <View style={styles.workHoursGrid}>
      {/* Total Hours Box */}
      <View style={styles.workHoursCard}>
        <View style={styles.iconContainer}>
          <ClockIcon size={32} color="#0891b2" />
        </View>
        <Text style={styles.cardLabel}>Total Hours</Text>
        <Text style={styles.cardValuee}>{workHours}</Text>
        <Text style={styles.cardUnit}>hours</Text>
      </View>

      {/* Average Hours Box */}
      <View style={styles.workHoursCard}>
        <View style={styles.iconContainer}>
          <Timer size={32} color="#059669" />
        </View>
        <Text style={styles.cardLabel}>Daily Average</Text>
        <Text style={styles.cardValuee}>{averageWorkHours}</Text>
        <Text style={styles.cardUnit}>hours/day</Text>
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0f172a',
    marginBottom: 20,
    marginTop: 50,
  },
  dropdownContainer: {
    justifyContent:'center',
    marginBottom: 15 ,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 12,
    paddingVertical:0.1,
    backgroundColor: '#fff',
    height: 50,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: (width - 44) / 2,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#059669',
    marginLeft: 4,
  },
  cardTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  cardValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#0f172a',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#0f172a',
    marginBottom: 16,
  },
  timeStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  timeValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#0f172a',
  },
  workHoursGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  workHoursCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  cardValuee: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    fontFamily: 'Inter-Bold',
  },
  cardUnit: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
});
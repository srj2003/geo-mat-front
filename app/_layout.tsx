import React, { useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, ScrollView, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Navbar from './navbar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ChevronDown, ChevronUp, Home, User, Settings, Bell, Calendar, Users, FileText, DollarSign, ShoppingCart } from 'lucide-react-native';

// Define navigation types
type RootStackParamList = {
  '(tabs)': undefined;
  attendance: undefined;
  users: undefined;
  leavedashboard: undefined;
  'apply-leave': undefined;
  'my-leaves': undefined;
  'all-leaves': undefined;
  expenseform: undefined;
  expensedetails: undefined;
  addrequisition: undefined;
  requisitions: undefined;
};

// Define expanded state type
interface ExpandedState {
  attendance: boolean;
  users: boolean;
  leave: boolean;
  expenses: boolean;
  requisition: boolean;
}

// Custom Drawer Component
const CustomDrawerContent = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State for expand/collapse
  const [expanded, setExpanded] = useState<ExpandedState>({
    attendance: false,
    users: false,
    leave: false,
    expenses: false,
    requisition: false,
  });

  // Animated values for height
  const attendanceHeight = useState(new Animated.Value(0))[0];
  const usersHeight = useState(new Animated.Value(0))[0];
  const leaveHeight = useState(new Animated.Value(0))[0];
  const expensesHeight = useState(new Animated.Value(0))[0];
  const requisitionHeight = useState(new Animated.Value(0))[0];

  // Toggle expand/collapse
  const toggleSection = (section: keyof ExpandedState) => {
    const newExpanded = !expanded[section];
    setExpanded({ ...expanded, [section]: newExpanded });

    // Calculate height based on the number of subsections
    const subsectionCount = {
      attendance: 1,
      users: 1,
      leave: 3,
      expenses: 2,
      requisition: 2,
    }[section];

    const heightValue = newExpanded ? subsectionCount * 40 : 0; // 40 is the height of each subsection
    Animated.timing(
      section === 'attendance'
        ? attendanceHeight
        : section === 'users'
        ? usersHeight
        : section === 'leave'
        ? leaveHeight
        : section === 'expenses'
        ? expensesHeight
        : requisitionHeight,
      {
        toValue: heightValue,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }
    ).start();
  };

  return (
    <ScrollView style={styles.drawerContainer}>
      {/* Logo at the top */}
      <Image
        source={require('../assets/images/geomaticx_logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Group 1: Dashboard */}
      <TouchableOpacity
        style={styles.groupHeader}
        onPress={() => navigation.navigate('(tabs)')}
      >
        <Home size={20} color="#1f2937" style={styles.icon} />
        <Text style={styles.groupHeaderText}>Dashboard</Text>
      </TouchableOpacity>

      {/* Group 2: Manage Attendance */}
      <View style={styles.group}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleSection('attendance')}
        >
          <Calendar size={20} color="#1f2937" style={styles.icon} />
          <Text style={styles.groupHeaderText}>Manage Attendance</Text>
          {expanded.attendance ? (
            <ChevronUp size={20} color="#1f2937" style={styles.icon} />
          ) : (
            <ChevronDown size={20} color="#1f2937" style={styles.icon} />
          )}
        </TouchableOpacity>
        <Animated.View style={{ height: attendanceHeight, overflow: 'hidden' }}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('attendance')}
          >
            <Text style={styles.sub}>My Attendance</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Group 3: Manage Users */}
      <View style={styles.group}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleSection('users')}
        >
          <Users size={20} color="#1f2937" style={styles.icon} />
          <Text style={styles.groupHeaderText}>Manage Users</Text>
          {expanded.users ? (
            <ChevronUp size={20} color="#1f2937" style={styles.icon} />
          ) : (
            <ChevronDown size={20} color="#1f2937" style={styles.icon} />
          )}
        </TouchableOpacity>
        <Animated.View style={{ height: usersHeight, overflow: 'hidden' }}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('users')}
          >
            <Text style={styles.sub}>All Users</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Group 4: Manage Leave */}
      <View style={styles.group}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleSection('leave')}
        >
          <FileText size={20} color="#1f2937" style={styles.icon} />
          <Text style={styles.groupHeaderText}>Manage Leave</Text>
          {expanded.leave ? (
            <ChevronUp size={20} color="#1f2937" style={styles.icon} />
          ) : (
            <ChevronDown size={20} color="#1f2937" style={styles.icon} />
          )}
        </TouchableOpacity>
        <Animated.View style={{ height: leaveHeight, overflow: 'hidden' }}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('apply-leave')}
          >
            <Text style={styles.sub}>Add Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('my-leaves')}
          >
            <Text style={styles.sub}>My Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('all-leaves')}
          >
            <Text style={styles.sub}>All Leaves</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Group 5: My Expenses */}
      <View style={styles.group}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleSection('expenses')}
        >
          <DollarSign size={20} color="#1f2937" style={styles.icon} />
          <Text style={styles.groupHeaderText}>My Expenses</Text>
          {expanded.expenses ? (
            <ChevronUp size={20} color="#1f2937" style={styles.icon} />
          ) : (
            <ChevronDown size={20} color="#1f2937" style={styles.icon} />
          )}
        </TouchableOpacity>
        <Animated.View style={{ height: expensesHeight, overflow: 'hidden' }}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('expenseform')}
          >
            <Text style={styles.sub}>Add Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('expensedetails')}
          >
            <Text style={styles.sub}>My Expenses</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Group 6: Requisition */}
      <View style={styles.group}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleSection('requisition')}
        >
          <ShoppingCart size={20} color="#1f2937" style={styles.icon} />
          <Text style={styles.groupHeaderText}>Requisition</Text>
          {expanded.requisition ? (
            <ChevronUp size={20} color="#1f2937" style={styles.icon} />
          ) : (
            <ChevronDown size={20} color="#1f2937" style={styles.icon} />
          )}
        </TouchableOpacity>
        <Animated.View style={{ height: requisitionHeight, overflow: 'hidden' }}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('addrequisition')}
          >
            <Text style={styles.sub}>Add Requisition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('requisitions')}
          >
            <Text style={styles.sub}>Requested Requisition</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default function RootLayout() {
  useFrameworkReady();

  return (
    <Drawer
      drawerContent={() => <CustomDrawerContent />} // Use custom Drawer content
      screenOptions={{
        header: () => <Navbar />, // Render Navbar as the header
      }}
    >
      {/* Define your screens */}
      <Drawer.Screen
        name="(tabs)" // This will render the tabs navigation
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="my-attendance" // My Attendance screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="all-users" // All Users screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="leave-dashboard" // Leave Dashboard screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="add-leave" // Add Leave screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="my-leave" // My Leave screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="all-leaves" // All Leaves screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="add-expenses" // Add Expenses screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="my-expenses" // My Expenses screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="add-requisition" // Add Requisition screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="requested-requisition" // Requested Requisition screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
      <Drawer.Screen
        name="+not-found" // Example: Hide the "not-found" screen
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the Drawer
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
  },
  logo: {
    width: '100%',
    height: 80,
    marginBottom: 20,
    marginTop: 40,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  groupHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 10,
  },
  group: {
    marginTop: 10,
  },
  drawerItem: {
    paddingVertical: 10,
    paddingLeft: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sub: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  icon: {
    marginRight: 10,
  },
});
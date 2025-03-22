import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet, Animated } from 'react-native';
import { Search, Menu, Users, LogOut, User, MapPin, Calendar, FileText, DollarSign, FileCheck, ClipboardList, X } from 'lucide-react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Bell } from 'lucide-react-native'; // Assuming you're using lucide-react-native for icons
import { router } from 'expo-router';

// Placeholder components for dropdowns
const NotificationDropdown = ({ notifications, style }: { notifications: string[], style: any }) => (
  <Animated.View style={[styles.dropdown, style]}>
    {notifications.map((notification, index) => (
      <Text key={index} style={styles.dropdownItem}>{notification}</Text>
    ))}
  </Animated.View>
);

const ProfileDropdown = ({ style }: { style: any }) => {
  const navigation = useNavigation();

  const handleNavigation = (route: string) => {
    if (route === 'Profile') {
      router.push('/profile'); // Navigate to the Profile screen
    } else if (route === 'Logout') {
      // Handle logout logic here
      console.log('Logging out...');
    }
  };

  return (
    <Animated.View style={[styles.dropdown, style]}>
      {/* Profile Option */}
      <Pressable
        style={styles.dropdownItemContainer}
        onPress={() => handleNavigation('Profile')}
      >
        <User size={20} color="#1f2937" style={styles.icon} />
        <Text style={styles.dropdownItem}>Profile</Text>
      </Pressable>

      {/* Logout Option */}
      <Pressable
        style={[styles.dropdownItemContainer, styles.logoutContainer]}
        onPress={() => handleNavigation('Logout')}
      >
        <LogOut size={20} color="#ef4444" style={styles.icon} />
        <Text style={[styles.dropdownItem, styles.logoutText]}>Logout</Text>
      </Pressable>
    </Animated.View>
  );
};

const Navbar = () => {
  const navigation = useNavigation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Animation values
  const notificationAnimation = useRef(new Animated.Value(0)).current;
  const profileAnimation = useRef(new Animated.Value(0)).current;

  // Dummy notifications data
  const notifications = ['Notification 1', 'Notification 2', 'Notification 3'];

  const toggleNotifications = () => {
    if (showNotifications) {
      Animated.timing(notificationAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setShowNotifications(false));
    } else {
      setShowNotifications(true);
      Animated.timing(notificationAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setShowProfile(false); // Close profile dropdown if open
    }
  };

  const toggleProfile = () => {
    if (showProfile) {
      Animated.timing(profileAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setShowProfile(false));
    } else {
      setShowProfile(true);
      Animated.timing(profileAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setShowNotifications(false); // Close notifications dropdown if open
    }
  };

  // Interpolate animation values for dropdown height and opacity
  const notificationDropdownStyle = {
    height: notificationAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100], // Adjust height based on content
    }),
    opacity: notificationAnimation,
  };

  const profileDropdownStyle = {
    height: profileAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100], // Adjust height based on content
    }),
    opacity: profileAnimation,
  };

  return (
    <View style={styles.navbar}>
      {/* Left side: Menu button and title */}
      <View style={styles.navLeft}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
        {/* <Text style={styles.title}>My App</Text> */}
      </View>

      {/* Right side: Notification and profile buttons */}
      <View style={styles.navRight}>
        <View style={styles.notificationContainer}>
          <Pressable style={styles.iconButton} onPress={toggleNotifications}>
            <Bell size={24} color="#1f2937" />
            <View style={styles.notificationBadge} />
          </Pressable>
          {showNotifications && (
            <NotificationDropdown notifications={notifications} style={notificationDropdownStyle} />
          )}
        </View>
        <View style={styles.profileContainer}>
          <Pressable style={styles.profileButton} onPress={toggleProfile}>
            <Image
              source={{ uri: 'https://i.postimg.cc/RhY6gvjr/download.jpg' }}
              style={styles.profileImage}
            />
          </Pressable>
          {showProfile && <ProfileDropdown style={profileDropdownStyle} />}
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    fontSize: 24,
    color: 'black',
    marginRight: 15,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    position: 'relative',
    marginRight: 20,
  },
  iconButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  profileContainer: {
    position: 'relative',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
    overflow: 'hidden',
  },
  dropdownItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItem: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 10,
  },
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
    paddingTop: 8,
  },
  logoutText: {
    color: '#ef4444',
  },
  icon: {
    marginRight: 10,
  },
});

export default Navbar;
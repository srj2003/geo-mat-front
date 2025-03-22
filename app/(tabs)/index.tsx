import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { Bell, Search, Users, Settings, LogOut, User, MapPin, Calendar, FileText, DollarSign, FileCheck, ClipboardList, RefreshCw } from 'lucide-react-native';
import { router } from 'expo-router';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface ActiveUser {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

const activeUsers: ActiveUser[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'In office'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'Remote'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    status: 'In meeting'
  }
];

const NotificationDropdown = ({ notifications }: { notifications: { id: string; text: string }[] }) => (
  <View style={styles.dropdownMenu}>
    {notifications.length === 0 ? (
      <Text style={styles.dropdownText}>No new notifications</Text>
    ) : (
      notifications.map(item => (
        <Text key={item.id} style={styles.dropdownText}>{item.text}</Text>
      ))
    )}
  </View>
);

const ProfileDropdown = () => {
  const handleLogout = () => {
    console.log('Logging out...');
  };

  // const handleSettings = () => {
  //   router.push('/settings');
  // };

  const handleViewProfile = () => {
    router.push('/profile');
  };

  return (
    <View style={[styles.dropdownMenu, styles.profileDropdown]}>
      <Pressable style={styles.dropdownItem} onPress={handleViewProfile}>
        <User size={20} color="#374151" />
        <Text style={styles.dropdownText}>My Profile</Text>
      </Pressable>
      <View style={styles.dropdownDivider} />
      <Pressable style={styles.dropdownItem} onPress={handleLogout}>
        <LogOut size={20} color="#ef4444" />
        <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
      </Pressable>
    </View>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <View style={styles.statContent}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
    <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
      <Icon size={24} color={color} />
    </View>
  </View>
);

const ActiveUserCard = ({ user }: { user: ActiveUser }) => (
  <View style={styles.activeUserCard}>
    <Image source={{ uri: user.avatar }} style={styles.activeUserAvatar} />
    <View style={styles.activeUserInfo}>
      <Text style={styles.activeUserName}>{user.name}</Text>
      <Text style={styles.activeUserStatus}>{user.status}</Text>
    </View>
  </View>
);

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState({
    latitude: '22.5726',
    longitude: '88.3639'
  });

  const notifications = [
    { id: '1', text: 'New user registered' },
    { id: '2', text: 'Order #1234 has been placed' },
    { id: '3', text: 'Server maintenance scheduled' },
  ];

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfile) setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    if (showNotifications) setShowNotifications(false);
  };

  const refreshLocation = () => {
    const newLat = (22.5726 + (Math.random() * 0.02 - 0.01)).toFixed(4);
    const newLong = (88.3639 + (Math.random() * 0.02 - 0.01)).toFixed(4);
    setLocation({
      latitude: newLat,
      longitude: newLong
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.welcomeBanner}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Sandip Maiti</Text>
            <Text style={styles.welcomeDescription}>Master Admin</Text>
          </View>
          <Image 
            source={{ uri: 'https://i.postimg.cc/RhY6gvjr/download.jpg' }}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Users"
            value="1,234"
            icon={Users}
            color="#6366f1"
          />
        </View>

        <View style={styles.loginSection}>
          <Text style={styles.loginStatusText}>
            {isLoggedIn ? 'Logged In' : 'Login to register your attendance'}
          </Text>
          <TouchableOpacity 
            style={[
              styles.button,
              { backgroundColor: isLoggedIn ? '#ef4444' : '#4CAF50' }
            ]} 
            onPress={handleAuthToggle}
          >
            <Text style={styles.buttonText}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationSection}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#374151" />
            <Text style={styles.sectionTitle}>Your Location</Text>
            <TouchableOpacity 
              style={styles.refreshButton}
              onPress={refreshLocation}
            >
              <RefreshCw size={18} color="#374151" />
            </TouchableOpacity>
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
            <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
          </View>
        </View>

        <View style={styles.activeUsersSection}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#374151" />
            <Text style={styles.sectionTitle}>Currently Active Users</Text>
          </View>
          {activeUsers.map(user => (
            <ActiveUserCard key={user.id} user={user} />
          ))}
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={() => router.push('/users')}
          >
            <Text style={styles.moreButtonText}>View All Users</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
  },
  welcomeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  welcomeContent: {
    flex: 1,
    paddingRight: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  welcomeDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 20,
  },
  welcomeImage: {
    width: 140,
    height: 140,
    borderRadius: 40
  },
  statsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  loginSection: {
    padding: 16,
    alignItems: 'center',
  },
  loginStatusText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    fontWeight: '500',
  },
  locationSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationDetails: {
    marginLeft: 28,
  },
  locationText: {
    fontSize: 16,
    color: '#4b5563',
  },
  refreshButton: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeUsersSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  activeUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activeUserInfo: {
    marginLeft: 12,
  },
  activeUserName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  activeUserStatus: {
    fontSize: 14,
    color: '#6b7280',
  },
  moreButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 45,
    right: -80,
    width: 250,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    zIndex: 1000,
  },
  profileDropdown: {
    width: 200,
    right: 0,
    padding: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 6,
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },
  logoutText: {
    color: '#ef4444',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronLeft, ChevronRight, CreditCard as Edit2, Lock, Trash2, ArrowLeft, Plus, Upload, Check } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';

type UserRole = {
  id: number;
  role: string;
  count: number;
};

type UserDetails = {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
  photo: string;
};

type FormData = {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  gender: 'male' | 'female';
  organization: string;
  address: string;
  state: string;
  city: string;
  country: string;
  zipCode: string;
};

const ROLES_DATA: UserRole[] = [
  { id: 1, role: 'DIRECTOR', count: 1 },
  { id: 2, role: 'ADMIN MANAGER', count: 4 },
  { id: 3, role: 'PROJECT MANAGER', count: 6 },
  { id: 4, role: 'TEAM LEADER', count: 15 },
  { id: 5, role: 'SUPERVISOR', count: 0 },
  { id: 6, role: 'PROJECT LEAD', count: 0 },
  { id: 7, role: 'GIS SURVEYOR EXECUTIVE', count: 0 },
  { id: 8, role: 'ACCOUNTANT', count: 0 },
  { id: 9, role: 'GIS SURVEYOR', count: 0 },
  { id: 10, role: 'JR. GIS SURVEYOR EXECUTIVE', count: 0 },
  { id: 11, role: 'JR. GIS SURVEYOR', count: 0 },
  { id: 12, role: 'DRIVER', count: 0 },
  { id: 13, role: 'JR. DEVELOPER', count: 0 },
  { id: 14, role: 'QUALITY CONTROL ANALYST', count: 0 },
];

const MOCK_USERS: Record<string, UserDetails> = {
  '1': {
    id: '1',
    userId: 'GSTS002',
    name: 'John Smith',
    email: 'john.smith@example.com',
    mobile: '79xxxxxxxx',
    role: 'DIRECTOR',
    status: 'ACTIVE',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&q=80',
  },
  '2': {
    id: '2',
    userId: 'GSTS003',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    mobile: '8789560127',
    role: 'PROJECT MANAGER',
    status: 'ACTIVE',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80',
  },
  '3': {
    id: '3',
    userId: 'GSTS004',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    mobile: '9831042222',
    role: 'TEAM LEADER',
    status: 'ACTIVE',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&q=80',
  },
};

const ITEMS_PER_PAGE = 10;

export default function UsersScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const isMobile = width < 640;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserDetails | null>(null);
  const [showAddUser, setShowAddUser] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: '',
    gender: 'male',
    organization: '',
    address: '',
    state: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const filteredRoles = ROLES_DATA.filter(role =>
    role.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const users = selectedRole
    ? Object.values(MOCK_USERS).filter(user => 
        user.role === selectedRole &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
         user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleDelete = (userId: string) => {
    setSelectedUser(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedUser(null);
  };

  const handleViewProfile = (user: UserDetails) => {
    setEditedUser(user);
    setShowUserProfile(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user
    setIsEditing(false);
  };

  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleSubmitUser = () => {
    // Here you would typically make an API call to create the user
    console.log('Form submitted:', formData);
    setShowAddUser(false);
  };

  const renderRoleItem = ({ item }: { item: UserRole }) => (
    <TouchableOpacity onPress={() => setSelectedRole(item.role)}>
      <Animated.View
        entering={FadeIn}
        style={[
          styles.row,
          { backgroundColor: item.id % 2 === 0 ? '#f9fafb' : '#ffffff' }
        ]}
      >
        <Text style={[styles.cell, { flex: isDesktop ? 0.5 : 0.3 }]}>{item.id}</Text>
        <View style={[styles.roleCell, { flex: isDesktop ? 2 : 1.5 }]}>
          <Text style={[styles.cell, styles.roleText]}>{item.role}</Text>
        </View>
        <Text style={[styles.cell, styles.countText, { flex: isDesktop ? 1 : 0.5 }]}>{item.count}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderUserItem = ({ item }: { item: UserDetails }) => (
    <TouchableOpacity onPress={() => handleViewProfile(item)}>
      <Animated.View
        entering={FadeIn}
        style={[
          styles.userRow,
          { backgroundColor: users.indexOf(item) % 2 === 0 ? '#f9fafb' : '#ffffff' }
        ]}
      >
        <View style={[styles.userInfoContainer, { flex: isDesktop ? 2 : 1.5 }]}>
          <Image source={{ uri: item.photo }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.userId}>{item.userId}</Text>
          </View>
        </View>
        {!isMobile && (
          <>
            <Text style={[styles.email, { flex: isDesktop ? 2 : 1.5 }]} numberOfLines={1}>{item.email}</Text>
            <Text style={[styles.mobile, { flex: 1 }]} numberOfLines={1}>{item.mobile}</Text>
          </>
        )}
        <View style={[styles.statusContainer, { flex: isDesktop ? 1 : 0.8 }]}>
          <View style={[
            styles.statusBadge,
            item.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive
          ]}>
            <Text style={[
              styles.statusText,
              item.status === 'ACTIVE' ? styles.statusTextActive : styles.statusTextInactive
            ]}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={[styles.actions, { flex: isDesktop ? 1 : 0.8 }]}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleViewProfile(item)}>
            <Edit2 size={16} color="#6366f1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Lock size={16} color="#6366f1" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  const renderUserProfile = () => {
    if (!editedUser) return null;

    return (
      <Modal visible={showUserProfile} animationType="slide">
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={() => {
                  setShowUserProfile(false);
                  setIsEditing(false);
                }} 
                style={styles.backButton}
              >
                <ArrowLeft size={24} color="#374151" />
              </TouchableOpacity>
              <Text style={[styles.title, { fontSize: isDesktop ? 28 : 20 }]}>User Profile</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? (
                  <Check size={20} color="#ffffff" />
                ) : (
                  <Edit2 size={20} color="#ffffff" />
                )}
                <Text style={styles.editButtonText}>
                  {isEditing ? 'Save' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.content, { flexDirection: isDesktop ? 'row' : 'column' }]}>
              <View style={[styles.profileSection, isDesktop && styles.desktopProfileSection]}>
                <Image source={{ uri: editedUser.photo }} style={styles.profileImage} />
                <View style={styles.basicInfo}>
                  {isEditing ? (
                    <TextInput
                      style={styles.nameInput}
                      value={editedUser.name}
                      onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                    />
                  ) : (
                    <Text style={styles.name}>{editedUser.name}</Text>
                  )}
                  <Text style={styles.userId}>{editedUser.userId}</Text>
                  <View style={[
                    styles.statusBadge,
                    editedUser.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive
                  ]}>
                    <Text style={[
                      styles.statusText,
                      editedUser.status === 'ACTIVE' ? styles.statusTextActive : styles.statusTextInactive
                    ]}>
                      {editedUser.status}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.detailsSection, isDesktop && styles.desktopDetailsSection]}>
                <View style={styles.detailGroup}>
                  <Text style={styles.label}>Email</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedUser.email}
                      onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                      keyboardType="email-address"
                    />
                  ) : (
                    <Text style={styles.value}>{editedUser.email}</Text>
                  )}
                </View>

                <View style={styles.detailGroup}>
                  <Text style={styles.label}>Mobile</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedUser.mobile}
                      onChangeText={(text) => setEditedUser({ ...editedUser, mobile: text })}
                      keyboardType="phone-pad"
                    />
                  ) : (
                    <Text style={styles.value}>{editedUser.mobile}</Text>
                  )}
                </View>

                <View style={styles.detailGroup}>
                  <Text style={styles.label}>Role</Text>
                  <Text style={styles.value}>{editedUser.role}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderAddUserForm = () => {
    return (
      <Modal visible={showAddUser} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowAddUser(false)} style={styles.backButton}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.title}>Add New User</Text>
          </View>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile Details</Text>
              
              <TouchableOpacity style={styles.uploadContainer}>
                <View style={styles.uploadCircle}>
                  <Upload size={24} color="#6366f1" />
                </View>
                <Text style={styles.uploadText}>Upload Photo</Text>
                <Text style={styles.uploadHint}>JPG, JPEG or PNG. Max size of 800K</Text>
              </TouchableOpacity>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>User ID</Text>
                <TextInput
                  style={styles.input}
                  value={formData.userId}
                  onChangeText={(text) => setFormData({ ...formData, userId: text })}
                  placeholder="Enter user ID"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.firstName}
                    onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                    placeholder="Enter first name"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginHorizontal: 8 }]}>
                  <Text style={styles.label}>Middle Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.middleName}
                    onChangeText={(text) => setFormData({ ...formData, middleName: text })}
                    placeholder="Enter middle name"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                    placeholder="Enter last name"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.mobile}
                  onChangeText={(text) => setFormData({ ...formData, mobile: text })}
                  placeholder="Enter mobile number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Role</Text>
                <TextInput
                  style={styles.input}
                  value={formData.role}
                  onChangeText={(text) => setFormData({ ...formData, role: text })}
                  placeholder="Select role"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[styles.radioButton, formData.gender === 'male' && styles.radioButtonSelected]}
                    onPress={() => setFormData({ ...formData, gender: 'male' })}
                  >
                    <View style={[styles.radio, formData.gender === 'male' && styles.radioSelected]} />
                    <Text style={styles.radioLabel}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioButton, formData.gender === 'female' && styles.radioButtonSelected]}
                    onPress={() => setFormData({ ...formData, gender: 'female' })}
                  >
                    <View style={[styles.radio, formData.gender === 'female' && styles.radioSelected]} />
                    <Text style={styles.radioLabel}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Organization Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Organization</Text>
                <TextInput
                  style={styles.input}
                  value={formData.organization}
                  onChangeText={(text) => setFormData({ ...formData, organization: text })}
                  placeholder="Enter organization name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.address}
                  onChangeText={(text) => setFormData({ ...formData, address: text })}
                  placeholder="Enter address"
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>State</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.state}
                    onChangeText={(text) => setFormData({ ...formData, state: text })}
                    placeholder="Enter state"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>City</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                    placeholder="Enter city"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Country</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.country}
                    onChangeText={(text) => setFormData({ ...formData, country: text })}
                    placeholder="Enter country"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>ZIP Code</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.zipCode}
                    onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
                    placeholder="Enter ZIP code"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddUser(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitUser}>
                <Text style={styles.submitButtonText}>Add User</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedRole ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setSelectedRole(null)} style={styles.backButton}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={[styles.title, { fontSize: isDesktop ? 28 : 20 }]}>{selectedRole}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddUser}
            >
              <Plus size={20} color="#ffffff" />
              {!isMobile && <Text style={styles.addButtonText}>Add User</Text>}
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { fontSize: isDesktop ? 16 : 14 }]}
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
  
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: isDesktop ? 2 : 1.5 }]}>USER</Text>
            {!isMobile && (
              <>
                <Text style={[styles.headerCell, { flex: isDesktop ? 2 : 1.5 }]}>EMAIL</Text>
                <Text style={[styles.headerCell, { flex: 1 }]}>MOBILE</Text>
              </>
            )}
            <Text style={[styles.headerCell, { flex: isDesktop ? 1 : 0.8 }]}>STATUS</Text>
            <Text style={[styles.headerCell, styles.actionsHeader, { flex: isDesktop ? 1 : 0.8 }]}>ACTIONS</Text>
          </View>

          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#6b7280" style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { fontSize: isDesktop ? 16 : 14 }]}
                placeholder="Search roles..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { flex: isDesktop ? 0.5 : 0.3 }]}>ID</Text>
            <Text style={[styles.headerCell, { flex: isDesktop ? 2 : 1.5 }]}>USER ROLE</Text>
            <Text style={[styles.headerCell, { flex: isDesktop ? 1.1 : 0.8 }]}>TOTAL COUNT</Text>
          </View>

          <FlatList
            data={paginatedRoles}
            renderItem={renderRoleItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.pagination}>
            <Text style={styles.paginationText}>
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredRoles.length)} of{' '}
              {filteredRoles.length} entries
            </Text>
            <View style={styles.paginationControls}>
              <TouchableOpacity
                style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                onPress={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} color={currentPage === 1 ? '#9ca3af' : '#6366f1'} />
              </TouchableOpacity>
              <View style={styles.pageNumbers}>
                <Text style={[styles.pageNumber, styles.currentPage]}>{currentPage}</Text>
                <Text style={styles.pageNumber}>of {totalPages}</Text>
              </View>
              <TouchableOpacity
                style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
                onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} color={currentPage === totalPages ? '#9ca3af' : '#6366f1'} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      <Modal visible={showDeleteConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.modalTitle}>Delete User</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this user? This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalDeleteButton]}
                onPress={confirmDelete}
              >
                <Text style={[styles.modalButtonText, styles.modalDeleteText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {renderUserProfile()}
      {renderAddUserForm()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontWeight: '600',
    fontSize:20,
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#374151',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cell: {
    paddingHorizontal: 8,
    color: '#374151',
  },
  roleCell: {
    flex: 2,
  },
  roleText: {
    color: '#6366f1',
    fontWeight: '500',
  },
  countText: {
    textAlign: 'left',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  userId: {
    fontSize: 12,
    color: '#6b7280',
  },
  email: {
    fontSize: 14,
    color: '#374151',
  },
  mobile: {
    fontSize: 14,
    color: '#374151',
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 9999,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusInactive: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextActive: {
    color: '#16a34a',
  },
  statusTextInactive: {
    color: '#ef4444',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 120,
    gap: 8,
  },
  actionsHeader: {
    flex: 1,
    textAlign: 'right',
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 16,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '500',
    marginLeft: 8,
  },
  pagination: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  paginationText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 12,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  pageNumber: {
    color: '#374151',
    fontSize: 14,
    marginHorizontal: 4,
  },
  currentPage: {
    color: '#6366f1',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  confirmModal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#f3f4f6',
  },
  modalDeleteButton: {
    backgroundColor: '#ef4444',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  modalDeleteText: {
    color: '#ffffff',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  profileSection: {
    alignItems: 'center',
    gap: 16,
  },
  desktopProfileSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  basicInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 8,
    marginBottom: 4,
  },
  detailsSection: {
    gap: 24,
  },
  desktopDetailsSection: {
    flex: 2,
  },
  detailGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  value: {
    fontSize: 16,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    color: '#111827',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  searchIcon: {
    marginRight: 8,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  uploadContainer: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginBottom: 24,
  },
  uploadCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6366f1',
    marginBottom: 4,
  },
  uploadHint: {
    fontSize: 14,
    color: '#6b7280',
  },
  inputGroup: {
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#6366f1',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 8,
    padding: 2,
  },
  radioSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#6366f1',
  },
  radioLabel: {
    fontSize: 16,
    color: '#374151',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});
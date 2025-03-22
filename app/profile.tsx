import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput } from "react-native";
import { Mail, Phone, MapPin, Briefcase, Clock, Calendar, Edit } from "lucide-react-native";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("john.doe@company.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("San Francisco, CA");

  const handleSave = () => {
    setIsEditing(false);
    console.log("Changes saved:", { email, phone, location });
    // Add logic to save changes to the backend or state management
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Software Engineer</Text>
        <Text style={styles.id}>ID: EMP-2024-001</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          {/* Email */}
          <View style={styles.infoItem}>
            <Mail size={20} color="#64748b" />
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
              />
            ) : (
              <Text style={styles.infoText}>{email}</Text>
            )}
            <Pressable onPress={() => setIsEditing(!isEditing)}>
              <Edit size={20} color="#64748b" style={styles.editIcon} />
            </Pressable>
          </View>

          {/* Phone */}
          <View style={styles.infoItem}>
            <Phone size={20} color="#64748b" />
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
              />
            ) : (
              <Text style={styles.infoText}>{phone}</Text>
            )}
            <Pressable onPress={() => setIsEditing(!isEditing)}>
              <Edit size={20} color="#64748b" style={styles.editIcon} />
            </Pressable>
          </View>

          {/* Location */}
          <View style={styles.infoItem}>
            <MapPin size={20} color="#64748b" />
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
              />
            ) : (
              <Text style={styles.infoText}>{location}</Text>
            )}
            <Pressable onPress={() => setIsEditing(!isEditing)}>
              <Edit size={20} color="#64748b" style={styles.editIcon} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Briefcase size={20} color="#64748b" />
            <Text style={styles.infoText}>Engineering Department</Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={20} color="#64748b" />
            <Text style={styles.infoText}>Full Time</Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={20} color="#64748b" />
            <Text style={styles.infoText}>Joined Jan 2024</Text>
          </View>
        </View>
      </View>

      {isEditing && (
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#0f172a",
    marginBottom: 4,
  },
  role: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#64748b",
    marginBottom: 8,
  },
  id: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#94a3b8",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#0f172a",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  infoText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#0f172a",
    marginLeft: 12,
    flex: 1,
  },
  editInput: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#0f172a",
    marginLeft: 12,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#64748b",
  },
  editIcon: {
    marginLeft: 12,
  },
  saveButton: {
    backgroundColor: "#0891b2",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#ffffff",
  },
});

export default ProfileScreen;
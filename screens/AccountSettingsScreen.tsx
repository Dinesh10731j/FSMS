import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { ArrowLeft, ShieldCheck, Mail, User, MapPin, CheckCircle2 } from "lucide-react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export default function AccountSettingsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState("Field Technician");
  const [email, setEmail] = useState("tech@fsms.com");
  const [branch, setBranch] = useState("Kathmandu Branch");
  const [notifications, setNotifications] = useState(true);
  const [autoCheckIn, setAutoCheckIn] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.header}>Account Settings</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.fieldRow}>
          <User size={18} color="#2563EB" />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            style={styles.input}
          />
        </View>
        <View style={styles.fieldRow}>
          <Mail size={18} color="#0EA5E9" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
        <View style={styles.fieldRow}>
          <MapPin size={18} color="#10B981" />
          <TextInput
            value={branch}
            onChangeText={setBranch}
            placeholder="Branch"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.preferencesCard}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Enable notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
            thumbColor={notifications ? "#2563EB" : "#F3F4F6"}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Auto check-in</Text>
          <Switch
            value={autoCheckIn}
            onValueChange={setAutoCheckIn}
            trackColor={{ false: "#D1D5DB", true: "#A7F3D0" }}
            thumbColor={autoCheckIn ? "#10B981" : "#F3F4F6"}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save changes</Text>
      </TouchableOpacity>

      {saved ? (
        <View style={styles.toast}> 
          <CheckCircle2 size={18} color="#14B8A6" />
          <Text style={styles.toastText}>Settings updated</Text>
        </View>
      ) : null}

      <View style={styles.securityRow}>
        <ShieldCheck size={16} color="#2563EB" />
        <Text style={styles.securityText}>Your account and data are secure.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 14,
    elevation: 3,
    marginBottom: 18,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    borderRadius: 14,
    height: 54,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  preferencesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 14,
    elevation: 3,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 14,
    color: "#111827",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    color: "#475569",
    fontSize: 14,
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 52,
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    backgroundColor: "#ECFDF5",
    padding: 12,
    borderRadius: 14,
  },
  toastText: {
    color: "#0F766E",
    fontWeight: "700",
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
  },
  securityText: {
    color: "#475569",
    fontSize: 13,
  },
});

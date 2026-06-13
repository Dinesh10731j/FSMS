import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import CurvedHeader from "../../components/ui/CurvedHeader";

import {
  User,
  Settings,
  LogOut,
  ClipboardList,
  Wifi,
  Tv,
  Cable,
  Clock,
} from "lucide-react-native";

/* ================= PROFILE SCREEN ================= */

export const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [attendance, setAttendance] = useState<
    "offline" | "checked_in" | "checked_out"
  >("offline");

  const toggleAttendance = () => {
    if (attendance === "offline") {
      setAttendance("checked_in");
    } else if (attendance === "checked_in") {
      setAttendance("checked_out");
    } else {
      setAttendance("offline");
    }
  };

  const getAttendanceColor = () => {
    if (attendance === "checked_in") return "#16A34A";
    if (attendance === "checked_out") return "#F59E0B";
    return "#EF4444";
  };

  const getAttendanceText = () => {
    if (attendance === "checked_in") return "Checked In";
    if (attendance === "checked_out") return "Checked Out";
    return "Offline";
  };

  return (
    <View style={styles.container}>
      <CurvedHeader title="Profile" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= PROFILE CARD ================= */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={28} color="#2563EB" />
          </View>

          <Text style={styles.name}>Field Technician</Text>
          <Text style={styles.role}>Kathmandu Branch</Text>

          {/* ================= ATTENDANCE BUTTON ================= */}
          <TouchableOpacity
            onPress={toggleAttendance}
            style={[
              styles.attendanceBadge,
              { backgroundColor: getAttendanceColor() + "20" },
            ]}
          >
            <Clock size={14} color={getAttendanceColor()} />
            <Text
              style={[
                styles.attendanceText,
                { color: getAttendanceColor() },
              ]}
            >
              {getAttendanceText()}
            </Text>
          </TouchableOpacity>

          <Text style={styles.tapHint}>
            Tap to change attendance status
          </Text>
        </View>

        {/* ================= STATS ================= */}
        <View style={styles.statsRow}>
          <Stat icon={ClipboardList} label="Tickets" value="24" />
          <Stat icon={Wifi} label="Router" value="18" color="#10B981" />
          <Stat icon={Tv} label="IPTV" value="12" color="#F59E0B" />
          <Stat icon={Cable} label="Wire" value="320m" color="#EF4444" />
        </View>

        {/* ================= ATTENDANCE SUMMARY CARD ================= */}
        <View style={styles.attendanceCard}>
          <Text style={styles.sectionTitle}>Today Activity</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text
              style={{ color: getAttendanceColor(), fontWeight: "700" }}
            >
              {getAttendanceText()}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Check-in Time:</Text>
            <Text style={styles.value}>
              {attendance === "checked_in"
                ? new Date().toLocaleTimeString()
                : "--"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Work Status:</Text>
            <Text style={styles.value}>
              {attendance === "checked_in"
                ? "Working"
                : attendance === "checked_out"
                ? "Completed"
                : "Not Started"}
            </Text>
          </View>
        </View>

        {/* ================= MENU ================= */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <MenuItem
            icon={Settings}
            label="Account Settings"
            onPress={() => navigation.navigate("AccountSettings")}
          />
          <MenuItem
            icon={ClipboardList}
            label="Work History"
            onPress={() => navigation.navigate("WorkHistory")}
          />
          <MenuItem icon={LogOut} label="Logout" danger />
        </View>
      </ScrollView>
    </View>
  );
};

/* ================= STAT COMPONENT ================= */

const Stat = ({
  icon: Icon,
  label,
  value,
  color = "#2563EB",
}: any) => {
  return (
    <View style={styles.statBox}>
      <Icon size={18} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

/* ================= MENU ================= */

const MenuItem = ({ icon: Icon, label, danger, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon size={18} color={danger ? "#EF4444" : "#374151"} />
      <Text style={[styles.menuText, danger && { color: "#EF4444" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  profileCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E0ECFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  role: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
  },

  attendanceBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  attendanceText: {
    fontSize: 12,
    fontWeight: "700",
  },

  tapHint: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 6,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  statValue: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 6,
  },

  statLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  attendanceCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 14,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 10,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    color: "#6B7280",
    fontSize: 12,
  },

  value: {
    fontWeight: "700",
    fontSize: 12,
  },

  menuCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 18,
    borderRadius: 16,
    padding: 12,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
});
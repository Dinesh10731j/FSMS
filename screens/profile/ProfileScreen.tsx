import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import CurvedHeader from "../../components/ui/CurvedHeader";
import {
  User,
  Settings,
  LogOut,
  ClipboardList,
  Wifi,
  Tv,
  Cable,
} from "lucide-react-native";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <CurvedHeader title="Profile" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= USER CARD ================= */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <User size={28} color="#2563EB" />
          </View>

          <Text style={styles.name}>Field Technician</Text>
          <Text style={styles.role}>Active • Kathmandu Branch</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Online</Text>
          </View>
        </View>

        {/* ================= STATS ================= */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ClipboardList size={18} color="#2563EB" />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Tickets</Text>
          </View>

          <View style={styles.statBox}>
            <Wifi size={18} color="#10B981" />
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Router</Text>
          </View>

          <View style={styles.statBox}>
            <Tv size={18} color="#F59E0B" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>IPTV</Text>
          </View>

          <View style={styles.statBox}>
            <Cable size={18} color="#EF4444" />
            <Text style={styles.statValue}>320m</Text>
            <Text style={styles.statLabel}>Wire</Text>
          </View>
        </View>

        {/* ================= MENU ================= */}
        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <MenuItem icon={Settings} label="Account Settings" />
          <MenuItem icon={ClipboardList} label="Work History" />
          <MenuItem icon={LogOut} label="Logout" danger />
        </View>
      </ScrollView>
    </View>
  );
};

/* ================= MENU COMPONENT ================= */

const MenuItem = ({
  icon: Icon,
  label,
  danger,
}: {
  icon: any;
  label: string;
  danger?: boolean;
}) => {
  return (
    <TouchableOpacity style={styles.menuItem}>
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

  badge: {
    marginTop: 10,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
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

  menuCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 18,
    borderRadius: 16,
    padding: 12,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 10,
    color: "#111827",
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
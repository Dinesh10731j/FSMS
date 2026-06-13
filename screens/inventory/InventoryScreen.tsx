import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import CurvedHeader from "../../components/ui/CurvedHeader";
import AddStockModal from "./AddStockModal";
import { assignSerial, getAssignmentsByCategory } from "../../utils/snAssignments";

import {
  Wifi,
  Tv,
  Cable,
  Radio,
  Search,
  Plus,
  X,
} from "lucide-react-native";

/* ================= TYPES ================= */

type InventoryItem = {
  name: string;
  total: number;
  used: number;
  color: string;
  icon: any;
  category: "Router" | "IPTV" | "Wire" | "OST";
};

/* ================= SCREEN ================= */

export const InventoryScreen = () => {
  const [selected, setSelected] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [assignCategory, setAssignCategory] = useState<"Router" | "IPTV" | "Wire">("Router");
  const [assignModel, setAssignModel] = useState("Single Band");
  const [assignSerialValue, setAssignSerialValue] = useState("");
  const [assignTech, setAssignTech] = useState("Ram");
  const [assignMessage, setAssignMessage] = useState("");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      name: "WiFi Router",
      total: 120,
      used: 85,
      color: "#2563EB",
      icon: Wifi,
      category: "Router",
    },
    {
      name: "IPTV Box",
      total: 80,
      used: 30,
      color: "#10B981",
      icon: Tv,
      category: "IPTV",
    },
    {
      name: "Fiber Wire (50m)",
      total: 500,
      used: 320,
      color: "#F59E0B",
      icon: Cable,
      category: "Wire",
    },
    {
      name: "OST Tickets",
      total: 60,
      used: 55,
      color: "#EF4444",
      icon: Radio,
      category: "OST",
    },
  ]);

  const categories = ["All", "Router", "IPTV", "Wire", "OST"];

  const getStatusColor = (used: number, total: number) => {
    const ratio = used / total;
    if (ratio > 0.85) return "#EF4444";
    if (ratio > 0.6) return "#F59E0B";
    return "#10B981";
  };

  const handleAddStock = (item: any) => {
    const newItem: InventoryItem = {
      name: item.name,
      total: item.storeIn,
      used: 0,
      color: item.color,
      icon: Wifi,
      category: "Router",
    };

    setInventory((prev) => [newItem, ...prev]);
  };

  const handleAssignSerial = () => {
    if (!assignSerialValue.trim()) {
      setAssignMessage("Serial number is required.");
      return;
    }

    const success = assignSerial(
      assignSerialValue,
      assignTech,
      assignCategory,
      assignModel
    );

    if (!success) {
      setAssignMessage(
        `Serial ${assignSerialValue.trim().toUpperCase()} is already assigned to another technician.`
      );
      return;
    }

    setAssignMessage("Serial assigned successfully.");
    setAssignSerialValue("");
  };

  const filtered =
    selected === "All"
      ? inventory
      : inventory.filter((i) => i.category === selected);

  return (
    <View style={styles.container}>
      <CurvedHeader title="Inventory Control Center" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= SEARCH ================= */}
        <View style={styles.searchBox}>
          <Search color="#94A3B8" size={18} />
          <TextInput
            placeholder="Search inventory..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
        </View>

        {/* ================= FILTER ================= */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {categories.map((item) => {
            const active = selected === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setSelected(item)}
                style={[
                  styles.filterChip,
                  active && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && { color: "#fff" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ================= CARDS ================= */}
        {filtered.map((item, index) => {
          const Icon = item.icon;
          const percent = (item.used / item.total) * 100;
          const statusColor = getStatusColor(item.used, item.total);
          const assignedCount = getAssignmentsByCategory(item.category).length;

          return (
            <View key={index} style={styles.card}>
              {/* HEADER */}
              <View style={styles.headerRow}>
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: item.color + "20" },
                  ]}
                >
                  <Icon size={20} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.sub}>
                    Stock Overview & Consumption
                  </Text>
                </View>

                <Text
                  style={[
                    styles.percent,
                    { color: statusColor },
                  ]}
                >
                  {percent.toFixed(0)}%
                </Text>
              </View>

              {/* METRICS */}
              <View style={styles.metrics}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Total</Text>
                  <Text style={styles.metricValue}>
                    {item.total}
                  </Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>Used</Text>
                  <Text style={styles.metricValue}>
                    {item.used}
                  </Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>
                    Assigned SNs
                  </Text>
                  <Text style={styles.metricValue}>
                    {assignedCount}
                  </Text>
                </View>
              </View>

              {/* PROGRESS */}
              <View style={styles.progressBg}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percent}%`,
                      backgroundColor: statusColor,
                    },
                  ]}
                />
              </View>

              <TouchableOpacity
                style={styles.assignButton}
                onPress={() => {
                  setAssignCategory(item.category as any);
                  setAssignModel(item.category === "Wire" ? "50" : item.name.split(" ")[1] || "Single Band");
                  setAssignModalVisible(true);
                  setAssignMessage("");
                }}
              >
                <Text style={styles.assignButtonText}>Assign SN</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ================= FAB ================= */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Plus color="#fff" size={22} />
      </TouchableOpacity>

      {/* ================= MODAL ================= */}
      <AddStockModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddStock}
      />

      <Modal visible={assignModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.assignModal}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setAssignModalVisible(false)}
            >
              <X size={20} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Assign Serial Number</Text>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.modalValue}>{assignCategory}</Text>

            <Text style={styles.label}>Model / Type</Text>
            <Text style={styles.modalValue}>{assignModel}</Text>

            <Text style={styles.label}>Technician</Text>
            <View style={styles.techRowSelect}>
              {['Ram', 'Sita', 'Kiran'].map((name) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.techChip,
                    assignTech === name && styles.techChipActive,
                  ]}
                  onPress={() => setAssignTech(name)}
                >
                  <Text
                    style={assignTech === name ? styles.techChipTextActive : styles.techChipText}
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Serial Number</Text>
            <TextInput
              placeholder="Enter serial number"
              value={assignSerialValue}
              onChangeText={setAssignSerialValue}
              style={styles.input}
            />

            {assignMessage ? (
              <Text style={styles.assignMessage}>{assignMessage}</Text>
            ) : null}

            <TouchableOpacity style={styles.assignButtonPrimary} onPress={handleAssignSerial}>
              <Text style={styles.assignButtonText}>Save Assignment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
  },

  filterRow: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },

  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E2E8F0",
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 14,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },

  sub: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },

  percent: {
    fontSize: 13,
    fontWeight: "800",
  },

  label: {
    marginTop: 14,
    fontSize: 12,
    color: "#475569",
    fontWeight: "700",
  },

  assignButton: {
    marginTop: 14,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  assignButtonPrimary: {
    marginTop: 14,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  assignButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 20,
  },

  assignModal: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
  },

  modalClose: {
    alignSelf: "flex-end",
    padding: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },

  modalValue: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
    color: "#0F172A",
  },

  techRowSelect: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },

  techChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
  },

  techChipActive: {
    backgroundColor: "#2563EB",
  },

  techChipText: {
    color: "#0F172A",
    fontWeight: "600",
  },

  techChipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  assignMessage: {
    marginTop: 8,
    color: "#DC2626",
    fontSize: 12,
  },

  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  metricBox: {
    flex: 1,
    alignItems: "center",
  },

  metricLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },

  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 4,
  },

  progressBg: {
    height: 7,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
  },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import CurvedHeader from "../../components/ui/CurvedHeader";
import AddStockModal from "./AddStockModal";

import {
  Wifi,
  Tv,
  Cable,
  Radio,
  Search,
  Plus,
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
          const remaining = item.total - item.used;
          const statusColor = getStatusColor(item.used, item.total);

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
                    Remaining
                  </Text>
                  <Text style={styles.metricValue}>
                    {remaining}
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
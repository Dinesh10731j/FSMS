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
  Activity,
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
      name: "Router",
      total: 120,
      used: 85,
      color: "#2563EB",
      icon: Wifi,
      category: "Router",
    },
    {
      name: "IPTV",
      total: 80,
      used: 30,
      color: "#10B981",
      icon: Tv,
      category: "IPTV",
    },
    {
      name: "Wire (50m)",
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

  /* ================= ADD STOCK LOGIC ================= */

  const handleAddStock = (item: any) => {
    const newItem: InventoryItem = {
      name: item.name,
      total: item.storeIn,
      used: 0,
      color: item.color,
      icon: Wifi,
      category: item.name.includes("IPTV")
        ? "IPTV"
        : item.name.includes("Wire")
        ? "Wire"
        : "Router",
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

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Search color="#94A3B8" size={18} />
        <TextInput
          placeholder="Search stock..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
      </View>

      {/* FILTER */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

      {/* LIST */}
      <ScrollView>
        {filtered.map((item, index) => {
          const Icon = item.icon;
          const percent = (item.used / item.total) * 100;
          const remaining = item.total - item.used;
          const statusColor = getStatusColor(item.used, item.total);

          return (
            <View key={index} style={styles.card}>
              <View style={styles.headerRow}>
                <View style={styles.iconWrap}>
                  <Icon size={18} color={item.color} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.sub}>
                    Stock Intelligence Overview
                  </Text>
                </View>

                <Text style={[styles.badgeText, { color: statusColor }]}>
                  {percent.toFixed(0)}%
                </Text>
              </View>

              <View style={styles.metrics}>
                <Text>Total: {item.total}</Text>
                <Text>Used: {item.used}</Text>
                <Text>Remaining: {remaining}</Text>
              </View>

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
      </ScrollView>

      {/* FLOAT BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Plus color="#fff" size={20} />
      </TouchableOpacity>

      {/* MODAL */}
      <AddStockModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddStock}
      />
    </View>
  );
};

/* ================= STYLES ================= */

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
    height: 44,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#0F172A",
  },

  filterRow: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
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
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  sub: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  metricBox: {
    flex: 1,
  },

  metricLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },

  metricValue: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },

  progressBg: {
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
  },

  footerText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 8,
  },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});
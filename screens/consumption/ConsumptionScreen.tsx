import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";

import CurvedHeader from "../../components/ui/CurvedHeader";
import {
  Send,
  ChevronDown,
  Wifi,
  Tv,
  Cable,
  Router,
} from "lucide-react-native";

/* ---------------- DATA ---------------- */

const DATA: Record<string, string[]> = {
  Router: ["Single Band", "Dual Band", "REF"],
  IPTV: ["IPTV", "IPTV REF"],
  Wire: ["50M", "75M", "100M", "175M", "200M", "250M", "300M"],
};

/* icon mapping */
const CATEGORY_ICON: any = {
  Router: Wifi,
  IPTV: Tv,
  Wire: Cable,
};

export const ConsumptionScreen = () => {
  const [category, setCategory] = useState<keyof typeof DATA>("Router");
  const [model, setModel] = useState("Single Band");
  const [quantity, setQuantity] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [openCategory, setOpenCategory] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const models = useMemo(() => DATA[category], [category]);

  const CategoryIcon = CATEGORY_ICON[category];

  const handleSubmit = () => {
    if (!customerId || !quantity) return;

    const payload = {
      category,
      model,
      quantity: Number(quantity),
      customerId,
      message: `${category} ${model} used for customer ${customerId}`,
      time: new Date().toISOString(),
    };

    console.log("CONSUMPTION:", payload);

    setQuantity("");
    setCustomerId("");
  };

  return (
    <View style={styles.container}>
      <CurvedHeader title="Consumption Entry" />

      {/* ================= CATEGORY ================= */}
      <Text style={styles.label}>Category</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpenCategory(true)}
      >
        <View style={styles.leftRow}>
          <CategoryIcon size={18} color="#2563EB" />
          <Text style={styles.dropdownText}>{category}</Text>
        </View>

        <ChevronDown size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* ================= MODEL ================= */}
      <Text style={styles.label}>Model</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpenModel(true)}
      >
        <Text style={styles.dropdownText}>{model}</Text>
        <ChevronDown size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* ================= INPUTS ================= */}
      <Text style={styles.label}>Customer ID</Text>
      <TextInput
        placeholder="Enter customer ID"
        value={customerId}
        onChangeText={setCustomerId}
        style={styles.input}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        placeholder="Enter quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
        style={styles.input}
      />

      {/* ================= BUTTON ================= */}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Send color="#fff" size={18} />
        <Text style={styles.btnText}>Submit Consumption</Text>
      </TouchableOpacity>

      {/* ================= CATEGORY MODAL ================= */}
      <Modal visible={openCategory} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Select Category</Text>

            <FlatList
              data={Object.keys(DATA)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const Icon = CATEGORY_ICON[item];

                return (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setCategory(item as any);
                      setModel(DATA[item][0]);
                      setOpenCategory(false);
                    }}
                  >
                    <Icon size={18} color="#2563EB" />
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>

      {/* ================= MODEL MODAL ================= */}
      <Modal visible={openModel} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Select Model</Text>

            <FlatList
              data={models}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setModel(item);
                    setOpenModel(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
    padding: 16,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 6,
  },

  dropdown: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dropdownText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  btn: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    maxHeight: 320,
  },

  modalTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
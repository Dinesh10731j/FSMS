import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";

import { X, ChevronDown } from "lucide-react-native";

/* ================= TYPES ================= */

type InventoryItem = {
  name: string;
  storeIn: number;
  issued: number;
  ist: number;
  ost: number;
  remaining: number;
  color: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: InventoryItem) => void;
};

/* ================= DROPDOWN COMPONENT ================= */

const Dropdown = ({
  label,
  value,
  options,
  onSelect,
}: any) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.dropdownText}>{value}</Text>
        <ChevronDown size={18} color="#6B7280" />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownBox}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

/* ================= MAIN MODAL ================= */

export default function AddStockModal({
  visible,
  onClose,
  onAdd,
}: Props) {
  const [category, setCategory] = useState("Router");
  const [model, setModel] = useState("Single Band");
  const [wireSize, setWireSize] = useState("50");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (visible) {
      setCategory("Router");
      setModel("Single Band");
      setWireSize("50");
      setQuantity("");
    }
  }, [visible]);

  /* OPTIONS */
  const categories = ["Router", "IPTV", "Wire"];

  const routerModels = ["Single Band", "Dual Band", "REF"];
  const iptvModels = ["IPTV", "IPTV REF"];
  const wireOptions = ["50", "75", "100", "175", "200", "250", "300"];

  const getModels = () => {
    if (category === "Router") return routerModels;
    if (category === "IPTV") return iptvModels;
    return wireOptions;
  };

  const handleAdd = () => {
    if (!quantity) return;

    let name = "";

    if (category === "Wire") {
      name = `Wire ${wireSize}M`;
    } else {
      name = `${category} ${model}`;
    }

    const newItem: InventoryItem = {
      name,
      storeIn: Number(quantity),
      issued: 0,
      ist: 0,
      ost: 0,
      remaining: Number(quantity),
      color:
        category === "Router"
          ? "#2563EB"
          : category === "IPTV"
          ? "#10B981"
          : "#F59E0B",
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.bg}>
        <View style={styles.modal}>
          {/* CLOSE */}
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <X size={20} />
          </TouchableOpacity>

          <Text style={styles.title}>Add Stock</Text>

          {/* CATEGORY DROPDOWN */}
          <Dropdown
            label="Category"
            value={category}
            options={categories}
            onSelect={setCategory}
          />

          {/* MODEL DROPDOWN */}
          <Dropdown
            label="Model / Type"
            value={model}
            options={getModels()}
            onSelect={setModel}
          />

          {/* WIRE ONLY */}
          {category === "Wire" && (
            <Dropdown
              label="Wire Size (M)"
              value={wireSize}
              options={wireOptions}
              onSelect={setWireSize}
            />
          )}

          {/* QUANTITY */}
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            placeholder="Enter quantity"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
          />

          {/* BUTTON */}
          <TouchableOpacity style={styles.btn} onPress={handleAdd}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Add Stock
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    marginBottom: 10,
  },

  dropdownText: {
    fontSize: 14,
    color: "#111827",
  },

  dropdownBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 10,
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  close: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
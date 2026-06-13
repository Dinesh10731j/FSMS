import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
  Alert,
} from "react-native";

import CurvedHeader from "../../components/ui/CurvedHeader";
import { ChevronDown, Send } from "lucide-react-native";

import { CATEGORY_ICON, DATA, CONSUMPTION_TYPES } from "../../utils/itemsInfo";
import { Input } from "../../components/ui/Input";
import { isSerialAssignedToTechnician } from "../../utils/snAssignments";

export const ConsumptionScreen = () => {
  const [category, setCategory] =
    useState<keyof typeof DATA>("Router");

  const [model, setModel] = useState("Single Band");
  const [consumptionType, setConsumptionType] = useState("IST");

  const [quantity, setQuantity] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [technician, setTechnician] = useState("Ram");
  const [validationMessage, setValidationMessage] = useState("");

  const [openCategory, setOpenCategory] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openType, setOpenType] = useState(false);

  const models = useMemo(() => DATA[category], [category]);

  const CategoryIcon = CATEGORY_ICON[category];
  const technicians = ["Ram", "Sita", "Kiran"];

  const handleSubmit = () => {
    if (!customerId || !quantity || !serialNumber.trim()) {
      Alert.alert(
        "Missing information",
        "Customer ID, quantity and serial number are required."
      );
      return;
    }

    if (!isSerialAssignedToTechnician(serialNumber.trim(), technician)) {
      setValidationMessage(
        `Serial number ${serialNumber.trim().toUpperCase()} is not assigned to ${technician}.`
      );
      Alert.alert(
        "SN validation failed",
        `This serial number is not assigned to ${technician}.`
      );
      return;
    }

    setValidationMessage("");

    const payload = {
      category,
      model,
      quantity: Number(quantity),
      customerId,
      ticketId,
      consumptionType,
      remarks,
      serialNumber: serialNumber.trim().toUpperCase(),
      technician,
      message: `${quantity} ${category} (${model}) used for ${consumptionType}`,
      time: new Date().toISOString(),
    };

    console.log("CONSUMPTION:", payload);

    setQuantity("");
    setCustomerId("");
    setTicketId("");
    setRemarks("");
    setSerialNumber("");
  };

  return (
    
      <View style={styles.container}>
        <CurvedHeader title="Consumption Entry" />

        {/* ================= STATS ================= */}
        <ScrollView style={{ flex: 1 }}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>IST</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>OST</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>FIELD</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>WIRE</Text>
          </View>
        </View>
        

        <View style={styles.form}>
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

          {/* ================= TYPE ================= */}
          <Text style={styles.label}>Consumption Type</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setOpenType(true)}
          >
            <Text style={styles.dropdownText}>{consumptionType}</Text>
            <ChevronDown size={18} color="#6B7280" />
          </TouchableOpacity>

          {/* ================= INPUTS ================= */}
          <Text style={styles.label}>Customer ID</Text>
          <Input
            placeholder="Enter customer ID"
            value={customerId}
            onChangeText={setCustomerId}
          />

          <Text style={styles.label}>Ticket ID</Text>
          <Input
            placeholder="TKT-001"
            value={ticketId}
            onChangeText={setTicketId}
          />

          <Text style={styles.label}>Technician</Text>
          <View style={styles.techRow}>
            {technicians.map((name) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.techChip,
                  technician === name && styles.techChipActive,
                ]}
                onPress={() => setTechnician(name)}
              >
                <Text
                  style={
                    technician === name
                      ? styles.techChipTextActive
                      : styles.techChipText
                  }
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Serial Number</Text>
          <Input
            placeholder="Enter serial number"
            value={serialNumber}
            onChangeText={setSerialNumber}
          />
          {validationMessage ? (
            <Text style={styles.validationText}>{validationMessage}</Text>
          ) : null}

          <Text style={styles.label}>Quantity</Text>
          <Input
            placeholder="Enter quantity"
            value={quantity}
            keyboardType="numeric"
            onChangeText={setQuantity}
          />

          <Text style={styles.label}>Remarks</Text>
          <Input
            placeholder="Installation completed"
            value={remarks}
            onChangeText={setRemarks}
          />

          {/* ================= BUTTON ================= */}
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Send color="#fff" size={18} />
            <Text style={styles.btnText}>Submit Consumption</Text>
          </TouchableOpacity>
        </View>
            </ScrollView>

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

        {/* ================= TYPE MODAL ================= */}
        <Modal visible={openType} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>
                Select Consumption Type
              </Text>

              <FlatList
                data={CONSUMPTION_TYPES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      setConsumptionType(item);
                      setOpenType(false);
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  form: {
    padding: 20,
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

  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 8,
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

  validationText: {
    marginTop: 6,
    color: "#DC2626",
    fontSize: 12,
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

  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginTop: -20,
    marginBottom: 10,
  },

  statCard: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    elevation: 3,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2563EB",
  },

  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },
});
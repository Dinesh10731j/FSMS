import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Modal,
  Animated,
} from "react-native";

import { Input } from "../../components/ui/Input";
import { Colors } from "../../theme/colors";

import {
  Ticket,
  Send,
  Search,
  Zap,
  Settings,
  Wrench,
  User,
  Cable,
  X,
} from "lucide-react-native";

/* -------------------- CATEGORY CONFIG -------------------- */

const categories = [
  { label: "IST", icon: <Settings size={18} color="#2563eb" />, priority: "Medium" },
  { label: "OST", icon: <Wrench size={18} color="#16a34a" />, priority: "High" },
  { label: "WIRE", icon: <Cable size={18} color="#f59e0b" />, priority: "Low" },
  { label: "MANAGE", icon: <User size={18} color="#8b5cf6" />, priority: "Medium" },
  { label: "FIELD VISIT", icon: <Zap size={18} color="#ef4444" />, priority: "High" },
];

export const TicketScreen = () => {
  const [ticketId, setTicketId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState<any>(null);
  const [ccns, setCcns] = useState("");

  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [errors, setErrors] = useState<any>({});

  /* ---------------- FILTER SEARCH ---------------- */
  const filteredCategories = useMemo(() => {
    return categories.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* ---------------- AUTO PRIORITY ---------------- */
  const getPriority = (cat: string) => {
    const found = categories.find((c) => c.label === cat);
    return found?.priority || "Low";
  };

  /* ---------------- SUBMIT ---------------- */
  const handleInsertTicket = () => {
    let valid = true;
    let err: any = {};

    if (!ticketId) {
      err.ticketId = "Required";
      valid = false;
    }

    if (!title) {
      err.title = "Required";
      valid = false;
    }

    if (!description) {
      err.description = "Required";
      valid = false;
    }

    if (!category) {
      err.category = "Select category";
      valid = false;
    }

    setErrors(err);

    if (!valid) return;

    const ticketData = {
      ticketId,
      title,
      description,
      category: category.label,
      priority: getPriority(category.label),
      ccns,
      createdAt: new Date().toISOString(),
    };

    Alert.alert(
      "Ticket Created",
      `${ticketData.ticketId} (${ticketData.priority})`
    );

    setTicketId("");
    setTitle("");
    setDescription("");
    setCategory(null);
    setCcns("");
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ticket color="#fff" size={22} />
        <Text style={styles.headerTitle}>Create Ticket</Text>
        <Text style={styles.headerSub}>
          FSM Support System
        </Text>
      </View>

      <ScrollView style={styles.form}>

        <View style={styles.card}>

          {/* Ticket ID */}
          <Input
            label="Ticket ID"
            placeholder="TKT-1024"
            value={ticketId}
            onChangeText={setTicketId}
            error={errors.ticketId}
          />

          {/* TITLE */}
          <Input
            label="Title"
            placeholder="Issue title"
            value={title}
            onChangeText={setTitle}
            error={errors.title}
          />

          {/* CATEGORY BUTTON */}
          <Text style={styles.label}>Category</Text>

          <TouchableOpacity
            style={styles.selector}
            onPress={() => setModalVisible(true)}
          >
            {category ? (
              <View style={styles.row}>
                {category.icon}
                <Text style={styles.selectedText}>
                  {category.label}
                </Text>
              </View>
            ) : (
              <Text style={styles.placeholder}>
                Select Category
              </Text>
            )}
          </TouchableOpacity>

          {errors.category && (
            <Text style={styles.error}>{errors.category}</Text>
          )}

          {/* CCNS */}
          <Input
            label="CCNS"
            placeholder="Enter CCNS"
            value={ccns}
            onChangeText={setCcns}
          />

          {/* DESCRIPTION */}
          <Input
            label="Description"
            placeholder="Describe issue..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.textArea}
            error={errors.description}
          />

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleInsertTicket}
          >
            <Send color="#fff" size={18} />
            <Text style={styles.buttonText}>Submit Ticket</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* ---------------- BOTTOM SHEET MODAL ---------------- */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>

            {/* HEADER */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select Category
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={22} />
              </TouchableOpacity>
            </View>

            {/* SEARCH */}
            <View style={styles.searchBox}>
              <Search size={16} color="#888" />
              <TextInput
                placeholder="Search category..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>

            {/* LIST */}
            <ScrollView>
              {filteredCategories.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.item}
                  onPress={() => {
                    setCategory(item);
                    setModalVisible(false);
                  }}
                >
                  {item.icon}
                  <Text style={styles.itemText}>
                    {item.label}
                  </Text>

                  <Text style={styles.priority}>
                    {item.priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

          </View>
        </View>
      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 6,
  },

  headerSub: {
    color: "#E5E7EB",
    fontSize: 12,
  },

  form: {
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 3,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    color: "#111827",
  },

  selector: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  placeholder: {
    color: "#9CA3AF",
  },

  selectedText: {
    marginLeft: 8,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
    gap: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: "60%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
    justifyContent: "space-between",
  },

  itemText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
  },

  priority: {
    fontSize: 12,
    color: "#6B7280",
  },
});
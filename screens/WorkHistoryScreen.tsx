import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowLeft, Clock, ArrowRight, CheckCircle2 } from "lucide-react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

const workHistoryData = [
  {
    date: "12 June 2026",
    checkIn: "09:05 AM",
    checkOut: "05:12 PM",
    hours: 8.1,
    status: "Working",
  },
  {
    date: "11 June 2026",
    checkIn: "08:50 AM",
    checkOut: "04:45 PM",
    hours: 7.9,
    status: "Completed",
  },
  {
    date: "10 June 2026",
    checkIn: "09:20 AM",
    checkOut: "04:30 PM",
    hours: 7.2,
    status: "Completed",
  },
  {
    date: "09 June 2026",
    checkIn: "09:10 AM",
    checkOut: "04:50 PM",
    hours: 7.7,
    status: "Completed",
  },
];

export default function WorkHistoryScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState(workHistoryData[0].date);

  const selectedRecord = workHistoryData.find((item) => item.date === selectedDate)!;

  const filterButtons = workHistoryData.map((item) => item.date);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={20} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Work History</Text>
      </View>

      <View style={styles.filterRow}>
        {filterButtons.map((date) => (
          <TouchableOpacity
            key={date}
            style={[styles.filterButton, selectedDate === date && styles.filterButtonActive]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.filterText, selectedDate === date && styles.filterTextActive]}>
              {date.split(" ")[0]} {date.split(" ")[1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Clock size={20} color="#2563EB" />
          <Text style={styles.summaryTitle}>Check-in</Text>
          <Text style={styles.summaryValue}>{selectedRecord.checkIn}</Text>
        </View>
        <View style={styles.summaryRow}>
          <ArrowRight size={20} color="#0EA5E9" />
          <Text style={styles.summaryTitle}>Check-out</Text>
          <Text style={styles.summaryValue}>{selectedRecord.checkOut}</Text>
        </View>
        <View style={styles.summaryRow}> 
          <CheckCircle2 size={20} color="#10B981" />
          <Text style={styles.summaryTitle}>Total hours</Text>
          <Text style={styles.summaryValue}>{selectedRecord.hours.toFixed(1)}h</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>{selectedRecord.date}</Text>
        <Text style={styles.detailsSubtitle}>{selectedRecord.status} • Work session details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Check-in</Text>
          <Text style={styles.detailValue}>{selectedRecord.checkIn}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Check-out</Text>
          <Text style={styles.detailValue}>{selectedRecord.checkOut}</Text>
        </View>
        <View style={styles.detailRow}> 
          <Text style={styles.detailLabel}>Total working hours</Text>
          <Text style={styles.detailValue}>{selectedRecord.hours.toFixed(1)}h</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 18,
    paddingBottom: 36,
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
  screenTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 18,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  filterText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 13,
    color: "#475569",
    flex: 1,
    marginLeft: 10,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  detailsSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  detailLabel: {
    color: "#475569",
    fontSize: 13,
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
});

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import AppCard from "../../components/cards/Cards";
import UsageBarChart from "../../components/charts/LineChart";
import CurvedHeader from "../../components/ui/CurvedHeader";

import {
  Wifi,
  Tv,
  Cable,
  Activity,
  Radio,
} from "lucide-react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CurvedHeader title="SITAPAILA FSMS" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* ===== INVENTORY GRID ===== */}
        <Text style={styles.sectionTitle}>Inventory Overview</Text>

        <View style={styles.grid}>
          
          {/* ROUTER */}
          <AppCard style={styles.card}>
            <Wifi color="#2563EB" size={22} />
            <Text style={styles.cardTitle}>Router</Text>

            <Text style={styles.bigNumber}>45</Text>
            <Text style={styles.subText}>Used: 12</Text>
            <Text style={styles.meta}>Available Stock</Text>
          </AppCard>

          {/* IPTV */}
          <AppCard style={styles.card}>
            <Tv color="#10B981" size={22} />
            <Text style={styles.cardTitle}>IPTV</Text>

            <Text style={styles.bigNumber}>30</Text>
            <Text style={styles.subText}>Used: 8</Text>
            <Text style={styles.meta}>Active Devices</Text>
          </AppCard>

          {/* OST */}
          <AppCard style={styles.card}>
            <Radio color="#F59E0B" size={22} />
            <Text style={styles.cardTitle}>OST</Text>

            <Text style={styles.bigNumber}>18</Text>
            <Text style={styles.subText}>Active: 12</Text>
            <Text style={styles.meta}>Ongoing Service Tickets</Text>
          </AppCard>

          {/* IST */}
          <AppCard style={styles.card}>
            <Activity color="#8B5CF6" size={22} />
            <Text style={styles.cardTitle}>IST</Text>

            <Text style={styles.bigNumber}>25</Text>
            <Text style={styles.subText}>Completed: 14</Text>
            <Text style={styles.meta}>Installation Tasks</Text>
          </AppCard>

        </View>

        {/* ===== WIRE STOCK MODERN ===== */}
        <Text style={styles.sectionTitle}>Wire Stock</Text>

        <AppCard>
          <Cable color={Colors.primary} size={22} />

          <View style={styles.wireRow}>
            <Text style={styles.wireText}>50m</Text>
            <Text style={styles.wireUsage}>120 → 40 used</Text>
          </View>

          <View style={styles.wireRow}>
            <Text style={styles.wireText}>100m</Text>
            <Text style={styles.wireUsage}>70 → 25 used</Text>
          </View>

          <View style={styles.wireRow}>
            <Text style={styles.wireText}>300m</Text>
            <Text style={styles.wireUsage}>30 → 8 used</Text>
          </View>
        </AppCard>

        {/* ===== ACTIVITY ===== */}
        <Text style={styles.sectionTitle}>Today Activity</Text>

        <AppCard>
          <Activity color={Colors.primary} size={22} />

          <Text style={styles.text}>
            • Ram installed router at 10:30 AM
          </Text>
          <Text style={styles.text}>
            • Sita used 50m cable at 11:10 AM
          </Text>
        </AppCard>


      
        {/* ===== ANALYTICS ===== */}
        <Text style={styles.sectionTitle}>Analytics</Text>

        <AppCard>
          <UsageBarChart
            title="Router Usage"
            data={[
              { label: "Today", value: 12 },
              { label: "Week", value: 55 },
              { label: "Month", value: 180 },
            ]}
          />

          <UsageBarChart
            title="IPTV Usage"
            data={[
              { label: "Today", value: 8 },
              { label: "Week", value: 30 },
              { label: "Month", value: 120 },
            ]}
          />


 <UsageBarChart
            title="Wire Usage"
            data={[
              { label: "Today", value: 8 },
              { label: "Week", value: 30 },
              { label: "Month", value: 120 },
            ]}
          />

        </AppCard>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
  },

  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 18,
    marginBottom: 10,
    color: "#111827",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  card: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },

  bigNumber: {
    fontSize: 22,
    fontWeight: "900",
    marginTop: 6,
  },

  subText: {
    fontSize: 12,
    color: "#6B7280",
  },

  meta: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 4,
  },

  text: {
    fontSize: 13,
    marginTop: 6,
    color: "#374151",
  },

  alert: {
    color: Colors.danger,
    fontWeight: "600",
    marginTop: 6,
  },

  wireRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  wireText: {
    fontWeight: "700",
  },

  wireUsage: {
    color: "#6B7280",
  },
});
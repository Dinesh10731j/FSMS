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
  Box,
  Wifi,
  Tv,
  Cable,
  Activity,
  AlertTriangle,
  BarChart3,
} from "lucide-react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <CurvedHeader title="SITAPAILA FMS" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* INVENTORY OVERVIEW */}
        <Text style={styles.sectionTitle}>
          Inventory Overview
        </Text>

        <View style={styles.row}>
          <AppCard title="Routers">
            <Box color={Colors.primary} size={20} />
            <Text style={styles.text}>Available: 45</Text>
            <Text style={styles.text}>Used: 12</Text>
          </AppCard>

          <AppCard title="IPTV">
            <Tv color={Colors.primary} size={20} />
            <Text style={styles.text}>Available: 30</Text>
            <Text style={styles.text}>Used: 8</Text>
          </AppCard>
        </View>

        {/* WIRE STOCK */}
        <Text style={styles.sectionTitle}>
          Wire Stock
        </Text>

        <AppCard title="Cable Inventory">
          <Cable color={Colors.primary} size={20} />

          <Text style={styles.text}>50m → 120 / 40 used</Text>
          <Text style={styles.text}>100m → 70 / 25 used</Text>
          <Text style={styles.text}>300m → 30 / 8 used</Text>
        </AppCard>

        {/* ACTIVITY */}
        <Text style={styles.sectionTitle}>
          Today Activity
        </Text>

        <AppCard title="Live Operations">
          <Activity color={Colors.primary} size={20} />

          <Text style={styles.text}>
            Ram installed router at 10:30 AM
          </Text>
          <Text style={styles.text}>
            Sita used 50m cable at 11:10 AM
          </Text>
        </AppCard>

        {/* ALERTS */}
        <Text style={styles.sectionTitle}>
          Alerts
        </Text>

        <AppCard>
          <AlertTriangle color={Colors.danger} size={20} />
          <Text style={styles.alert}>
            Wire 300m stock is running low
          </Text>
        </AppCard>

        {/* ANALYTICS */}
        <Text style={styles.sectionTitle}>
          Analytics
        </Text>

        <AppCard title="Usage Analytics">

          <BarChart3 color={Colors.primary} size={20} />

          <UsageBarChart
            title="Router"
            data={[
              { label: "Today", value: 12 },
              { label: "Week", value: 55 },
              { label: "Month", value: 180 },
            ]}
          />

          <UsageBarChart
            title="IPTV"
            data={[
              { label: "Today", value: 8 },
              { label: "Week", value: 30 },
              { label: "Month", value: 120 },
            ]}
          />

          <UsageBarChart
            title="Wire"
            data={[
              { label: "Today", value: 120 },
              { label: "Week", value: 600 },
              { label: "Month", value: 2400 },
            ]}
          />
        </AppCard>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC", // softer SaaS background
  },

  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.text,
    marginTop: 18,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  text: {
    fontSize: 13,
    color: Colors.text,
    marginTop: 4,
  },

  alert: {
    color: Colors.danger,
    fontWeight: "600",
    marginTop: 6,
  },
});

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import AppCard from "../../components/cards/Cards";
import { Colors } from "../../theme/colors";

import UsageBarChart from "../../components/charts/LineChart";

export default function HomeScreen() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <View style={styles.container}>
      {/* CURVED HEADER */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {greeting}, Technician 👋
        </Text>

        <Text style={styles.sub}>
          Dish Home FSM Dashboard
        </Text>

        {/* QUICK STATS */}
        <View style={styles.statsRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              5 Tickets
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Low Stock: 2
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Today Active
            </Text>
          </View>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* STOCK OVERVIEW */}
        <Text style={styles.sectionTitle}>
          Inventory Overview
        </Text>

        <AppCard
          title="Router Stock"
          subtitle="Available vs Used"
          variant="elevated"
        >
          <Text style={styles.text}>
            Available: 45
          </Text>
          <Text style={styles.text}>
            Used: 12
          </Text>
        </AppCard>

        <AppCard
          title="IPTV Boxes"
          variant="outlined"
        >
          <Text style={styles.text}>
            Available: 30
          </Text>
          <Text style={styles.text}>
            Used: 8
          </Text>
        </AppCard>

        {/* WIRE STOCK */}
        <Text style={styles.sectionTitle}>
          Wire Stock (Meters)
        </Text>

        <AppCard title="50m - 100m Range">
          <Text style={styles.text}>
            50m → 120 available / 40 used
          </Text>
          <Text style={styles.text}>
            75m → 90 available / 30 used
          </Text>
          <Text style={styles.text}>
            100m → 70 available / 25 used
          </Text>
        </AppCard>

        <AppCard title="150m - 300m Range">
          <Text style={styles.text}>
            150m → 60 available / 20 used
          </Text>
          <Text style={styles.text}>
            200m → 50 available / 15 used
          </Text>
          <Text style={styles.text}>
            250m → 40 available / 10 used
          </Text>
          <Text style={styles.text}>
            300m → 30 available / 8 used
          </Text>
        </AppCard>

        {/* LIVE ACTIVITY */}
        <Text style={styles.sectionTitle}>
          Today Activity
        </Text>

        <AppCard
          title="Consumption Timeline"
          variant="elevated"
        >
          <Text style={styles.text}>
            🔵 Ram used 50m wire at 10:30 AM
          </Text>
          <Text style={styles.text}>
            🔵 Sita installed Router at 11:10 AM
          </Text>
          <Text style={styles.text}>
            🔵 Hari installed IPTV at 12:05 PM
          </Text>
        </AppCard>

        {/* ALERT */}
        <Text style={styles.sectionTitle}>
          Alerts
        </Text>

        <AppCard variant="outlined">
          <Text style={styles.alert}>
            ⚠ Wire 300m stock is running low
          </Text>
        </AppCard>

        {/* CHART PLACEHOLDER */}
        <Text style={styles.sectionTitle}>
          Analytics
        </Text>

        <AppCard variant="elevated">
        
        <AppCard variant="elevated">
  <Text style={styles.sectionTitle}>
    📊 Device Usage Analytics
  </Text>

  {/* Router Usage */}
  <UsageBarChart
    title="📡 Router Usage"
    data={[
      { label: "Today", value: 12 },
      { label: "Week", value: 55 },
      { label: "Month", value: 180 },
    ]}
  />

  {/* IPTV Usage */}
  <UsageBarChart
    title="📺 IPTV Usage"
    data={[
      { label: "Today", value: 8 },
      { label: "Week", value: 30 },
      { label: "Month", value: 120 },
    ]}
  />

  {/* Wire Usage */}
  <UsageBarChart
    title="🔌 Wire Usage"
    data={[
      { label: "Today", value: 120 },
      { label: "Week", value: 600 },
      { label: "Month", value: 2400 },
    ]}
  />
</AppCard>
            
        </AppCard>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 16,

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  sub: {
    fontSize: 13,
    color: "#E5E7EB",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 18,
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 4,
  },

  alert: {
    color: Colors.danger,
    fontWeight: "600",
  },
});
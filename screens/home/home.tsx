
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Colors } from "../../theme/colors";
import AppCard from "../../components/cards/Cards";
import UsageLineChart from "../../components/charts/LineChart";
import CurvedHeader from "../../components/ui/CurvedHeader";

import {
  Wifi,
  Tv,
  Cable,
  Activity,
  AlertTriangle,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Plus,
} from "lucide-react-native";

const screenWidth = Dimensions.get("window").width;

const overviewMetrics = [
  {
    id: "ost",
    label: "OST Filed",
    value: "42",
    delta: "+8%",
    color: Colors.primaryDark,
    icon: Activity,
  },
  {
    id: "ist",
    label: "IST Filed",
    value: "37",
    delta: "+5%",
    color: Colors.primary,
    icon: Tv,
  },
  {
    id: "visits",
    label: "Field Visits",
    value: "68",
    delta: "+12%",
    color: Colors.success,
    icon: MapPin,
  },
  {
    id: "routers",
    label: "Routers Used",
    value: "54",
    delta: "-2%",
    color: Colors.danger,
    icon: Wifi,
  },
];

const activityFeed = [
  {
    id: "1",
    type: "Fraud Alert",
    title: "Stock count mismatch at Baneshwor hub",
    detail: "Router dispatch exceeds manifest by 18 units.",
    severity: "high",
    time: "2m ago",
    location: "Baneshwor",
  },
  {
    id: "2",
    type: "Consumption",
    title: "Technician Sushil used 30m cable",
    detail: "Consumption event logged for Naya Baneshwor.",
    severity: "normal",
    time: "12m ago",
    location: "New Road",
  },
  {
    id: "3",
    type: "Mismatch",
    title: "IPTV set count inconsistency detected",
    detail: "Service report not matching installed inventory.",
    severity: "warning",
    time: "28m ago",
    location: "Dhapakhel",
  },
];

const technicians = [
  {
    id: "t1",
    name: "Ram",
    status: "Online",
    output: "5 jobs",
    score: "89",
    risk: "Low",
    ost: "6",
    ist: "4",
    visits: "12",
    routers: "9",
    color: Colors.success,
  },
  {
    id: "t2",
    name: "Sita",
    status: "Idle",
    output: "3 jobs",
    score: "76",
    risk: "Watch",
    ost: "3",
    ist: "5",
    visits: "8",
    routers: "6",
    color: "#F59E0B",
  },
  {
    id: "t3",
    name: "Kiran",
    status: "Online",
    output: "7 jobs",
    score: "94",
    risk: "Low",
    ost: "8",
    ist: "2",
    visits: "14",
    routers: "10",
    color: Colors.success,
  },
];

const inventoryMetrics = [
  {
    id: "inv1",
    label: "Router",
    value: "128",
    usage: 76,
    warning: "Stock below target",
    color: Colors.primary,
  },
  {
    id: "inv2",
    label: "IPTV",
    value: "92",
    usage: 58,
    warning: "Stable",
    color: Colors.success,
  },
  {
    id: "inv3",
    label: "Wire",
    value: "360m",
    usage: 64,
    warning: "Watch burn rate",
    color: "#0EA5E9",
  },
];

const alerts = [
  {
    id: "a1",
    title: "Fraud detection alert",
    subtitle: "High-risk inventory movement in Lalitpur",
    severity: "High",
  },
  {
    id: "a2",
    title: "Stock mismatch alert",
    subtitle: "Router balance variance on route 4",
    severity: "Medium",
  },
  {
    id: "a3",
    title: "Area anomaly detection",
    subtitle: "Unexpected consumption spike in Thamel",
    severity: "Low",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CurvedHeader title="DishHome FSMS" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>System Overview</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.overviewStrip}>
          {overviewMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <AppCard key={metric.id} style={styles.overviewCard}>
                <View style={styles.overviewIcon}>
                  <Icon color={metric.color} size={20} />
                </View>
                <Text style={styles.overviewLabel}>{metric.label}</Text>
                <Text style={styles.overviewValue}>{metric.value}</Text>
                <Text style={styles.overviewDelta}>{metric.delta}</Text>
              </AppCard>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Live Activity Feed</Text>

        {activityFeed.map((item) => (
          <AppCard key={item.id} variant="elevated" onPress={() => {}} style={styles.feedCard}>
            <View style={styles.feedHeader}>
              <View style={styles.feedTypeRow}>
                <AlertTriangle color={item.severity === "high" ? Colors.danger : item.severity === "warning" ? "#F59E0B" : Colors.primary} size={18} />
                <Text style={styles.feedType}>{item.type}</Text>
              </View>
              <Text style={[styles.feedSeverity, item.severity === "high" && styles.severityHigh]}>{item.severity.toUpperCase()}</Text>
            </View>
            <Text style={styles.feedTitle}>{item.title}</Text>
            <Text style={styles.feedDetail}>{item.detail}</Text>
            <View style={styles.feedMetaRow}>
              <View style={styles.feedMetaItem}>
                <MapPin color={Colors.textSecondary} size={14} />
                <Text style={styles.feedMetaText}>{item.location}</Text>
              </View>
              <View style={styles.feedMetaItem}>
                <Text style={styles.feedMetaText}>{item.time}</Text>
              </View>
            </View>
          </AppCard>
        ))}

        <Text style={styles.sectionTitle}>Technician Intelligence</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.techStrip}>
          {technicians.map((tech) => (
            <AppCard key={tech.id} style={[styles.techCard, { borderLeftColor: tech.color, borderLeftWidth: 4 }]}>
              <Text style={styles.techName}>{tech.name}</Text>
              <Text style={styles.techStatus}>{tech.status}</Text>
              <View style={styles.techRow}>
                <View>
                  <Text style={styles.techMetricLabel}>OST</Text>
                  <Text style={styles.techMetric}>{tech.ost}</Text>
                </View>
                <View>
                  <Text style={styles.techMetricLabel}>IST</Text>
                  <Text style={styles.techMetric}>{tech.ist}</Text>
                </View>
              </View>
              <View style={styles.techRow}>
                <View>
                  <Text style={styles.techMetricLabel}>Visits</Text>
                  <Text style={styles.techMetric}>{tech.visits}</Text>
                </View>
                <View>
                  <Text style={styles.techMetricLabel}>Routers</Text>
                  <Text style={styles.techMetric}>{tech.routers}</Text>
                </View>
              </View>
              <View style={styles.riskPill}>
                <ShieldCheck color={tech.color} size={14} />
                <Text style={[styles.riskText, { color: tech.color }]}>{tech.risk}</Text>
              </View>
            </AppCard>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Inventory Intelligence</Text>
        <View style={styles.inventoryGrid}>
          {inventoryMetrics.map((item) => (
            <AppCard key={item.id} style={styles.inventoryCard}>
              <View style={styles.inventoryHeader}>
                <Text style={styles.inventoryLabel}>{item.label}</Text>
                <TrendingUp color={item.color} size={18} />
              </View>
              <Text style={styles.inventoryValue}>{item.value}</Text>
              <View style={styles.usageTrack}>
                <View style={[styles.usageFill, { width: `${item.usage}%`, backgroundColor: item.color }]} />
              </View>
              <Text style={styles.inventoryWarning}>{item.warning}</Text>
            </AppCard>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Analytics</Text>
        <AppCard>
          <UsageLineChart
            title="Weekly Loss Trend"
            data={[
              { label: "Mon", value: 6 },
              { label: "Tue", value: 8 },
              { label: "Wed", value: 5 },
              { label: "Thu", value: 10 },
              { label: "Fri", value: 7 },
              { label: "Sat", value: 4 },
              { label: "Sun", value: 3 },
            ]}
          />
          <UsageLineChart
            title="Technician Output"
            data={[
              { label: "Mon", value: 5 },
              { label: "Tue", value: 8 },
              { label: "Wed", value: 6 },
              { label: "Thu", value: 9 },
              { label: "Fri", value: 7 },
              { label: "Sat", value: 4 },
              { label: "Sun", value: 3 },
            ]}
          />
        </AppCard>

        <Text style={styles.sectionTitle}>Alert Center</Text>
        {alerts.map((alert) => (
          <AppCard key={alert.id} style={styles.alertCard}>
            <View style={styles.alertRow}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={[styles.alertTag, alert.severity === "High" ? styles.alertTagHigh : alert.severity === "Medium" ? styles.alertTagMedium : styles.alertTagLow]}>{alert.severity}</Text>
            </View>
            <Text style={styles.alertSubtitle}>{alert.subtitle}</Text>
          </AppCard>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Plus color="#fff" size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 18,
    marginBottom: 10,
    color: Colors.text,
  },

  overviewStrip: {
    marginBottom: 10,
  },

  overviewCard: {
    width: screenWidth * 0.6,
    minHeight: 120,
    marginRight: 12,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  overviewIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(37, 99, 235, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  overviewLabel: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textSecondary,
  },

  overviewValue: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: "900",
    color: Colors.text,
  },

  overviewDelta: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.success,
    fontWeight: "600",
  },

  feedCard: {
    borderRadius: 18,
    padding: 18,
  },

  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  feedTypeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  feedType: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },

  feedSeverity: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.success,
  },

  severityHigh: {
    color: Colors.danger,
  },

  feedTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 6,
  },

  feedDetail: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },

  feedMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  feedMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  feedMetaText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },

  techStrip: {
    marginBottom: 8,
  },

  techCard: {
    width: screenWidth * 0.72,
    marginRight: 12,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  techName: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.text,
  },

  techStatus: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.primaryDark,
  },

  techRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  techMetricLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },

  techMetric: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
  },

  riskPill: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignSelf: "flex-start",
  },

  riskText: {
    fontSize: 13,
    fontWeight: "700",
  },

  inventoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  inventoryCard: {
    width: "48%",
    borderRadius: 18,
    padding: 16,
  },

  inventoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  inventoryLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },

  inventoryValue: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.text,
    marginBottom: 12,
  },

  usageTrack: {
    width: "100%",
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10,
  },

  usageFill: {
    height: "100%",
    backgroundColor: Colors.primary,
  },

  inventoryWarning: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  alertCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 10,
  },

  alertRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  alertTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.text,
    flex: 1,
  },

  alertSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },

  alertTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },

  alertTagHigh: {
    backgroundColor: Colors.danger,
  },

  alertTagMedium: {
    backgroundColor: "#F59E0B",
  },

  alertTagLow: {
    backgroundColor: Colors.success,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 26,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});

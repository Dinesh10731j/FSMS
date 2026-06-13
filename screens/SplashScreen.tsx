import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Images } from "../constants/images";
import { RootStackParamList } from "../types/navigation";

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("Login"), 1800);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircleBlue} />
      <View style={styles.backgroundCircleGreen} />

      <View style={styles.card}>
        <View style={styles.logoWrapper}>
          <Image source={Images.logo} style={styles.logo} />
        </View>

        <Text style={styles.brand}>FSMS</Text>
        <Text style={styles.subtitle}>Field Service Management System</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Modern field services</Text>
        </View>

        <View style={styles.loaderRow}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.loaderText}>Preparing your dashboard...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  backgroundCircleBlue: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(37,99,235,0.12)",
    top: -80,
    left: -80,
  },
  backgroundCircleGreen: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(16,185,129,0.14)",
    bottom: -60,
    right: -60,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 32,
    padding: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 12,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 42,
    backgroundColor: "rgba(37,99,235,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  brand: {
    fontSize: 36,
    color: "#0F172A",
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    color: "#475569",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  badge: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginBottom: 24,
  },
  badgeText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 13,
  },
  loaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loaderText: {
    color: "#475569",
    marginLeft: 10,
    fontSize: 14,
  },
});

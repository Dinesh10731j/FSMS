import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

type Props = {
  title?: string;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function CurvedHeader({
  title = "SITAPAILA FSMS",
}: Props) {
  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.container}>

        <Text style={styles.greeting}>
          {getGreeting() },Dinesh Tamang
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          Field Service Management Dashboard
        </Text>

      </View>

      {/* CURVE */}
      <View style={styles.curve} />

    </View>
  );
}



const styles = StyleSheet.create({
  wrapper: {
    width: width,
    backgroundColor: "transparent",
  },

  container: {
    zIndex: 1,
    height: 170,
    backgroundColor: Colors.primary,

    paddingHorizontal: 20,
    paddingTop: 50,

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    // modern shadow (important for depth)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  greeting: {
    color: "#E0F2FE",
    fontSize: 14,
    fontWeight: "500",
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
    letterSpacing: 1,
  },

  subtitle: {
    color: "#E5E7EB",
    fontSize: 12,
    marginTop: 4,
  },

  curve: {
    position: "absolute",
    bottom: -20,
    width: width,
    height: 40,
    backgroundColor: "#F3F4F6",

    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
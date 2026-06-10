
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "../../theme/colors";

type Props = {
  title: string;
  data: {
    label: string;
    value: number;
  }[];
};

export default function UsageBarChart({ title, data }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <BarChart
        data={data}
        barWidth={22}
        spacing={24}
        roundedTop
        hideRules
        yAxisThickness={0}
        xAxisThickness={0}
        frontColor={Colors.primary}
 
        animationDuration={800}

        isAnimated
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";

type CardVariant = "default" | "outlined" | "elevated";

interface AppCardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  rightAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppCard: React.FC<AppCardProps> = ({
  title,
  subtitle,
  children,
  variant = "default",
  onPress,
  rightAction,
  style,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        styles[variant],
        style,
      ]}
    >
      {(title || rightAction) && (
        <View style={styles.header}>
          <View>
            {title && (
              <Text style={styles.title}>
                {title}
              </Text>
            )}

            {subtitle && (
              <Text style={styles.subtitle}>
                {subtitle}
              </Text>
            )}
          </View>

          {rightAction && (
            <View>{rightAction}</View>
          )}
        </View>
      )}

      {children && (
        <View style={styles.body}>
          {children}
        </View>
      )}
    </Container>
  );
};

export default AppCard;


const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
  },

  /* Default soft card */
  default: {
    backgroundColor: "#FFFFFF",
  },

  /* Outlined clean enterprise style */
  outlined: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  /* Elevated (dashboard style) */
  elevated: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  body: {
    marginTop: 6,
  },
});
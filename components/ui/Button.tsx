import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";

import { AppButtonProps } from "../../types/button.types";

const Button: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  leftIcon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          {leftIcon && (
            <View style={styles.iconContainer}>
              {leftIcon}
            </View>
          )}

          <Text style={styles.text}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  primary: {
    backgroundColor: "#2563EB",
  },

  secondary: {
    backgroundColor: "#64748B",
  },

  danger: {
    backgroundColor: "#DC2626",
  },

  disabled: {
    opacity: 0.6,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    marginRight: 8,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
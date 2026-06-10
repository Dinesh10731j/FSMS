import { useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Image } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Images } from "../../constants/images";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react-native";



type LoginScreenNavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "Login"
  >;
export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);



  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={Images.logo}
          style={styles.logo}

        />

        <Text style={styles.title}>
          Sitapaila FSM
        </Text>

        <Text style={styles.subtitle}>
          Track Inventory & Field Service
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Mail
          size={20}
          color="#64748B"
        />

        <TextInput
          placeholder="Email Address"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Lock
          size={20}
          color="#64748B"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() =>
            setPasswordVisible(
              !passwordVisible
            )
          }
        >
          {passwordVisible ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <Button
        title="Login"
        onPress={() => navigation.navigate("MainTabs")}
      />

      <Text style={styles.version}>
        Version 1.0.0
      </Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 16,
  },

  subtitle: {
    color: "#64748B",
    marginTop: 6,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 56,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  forgot: {
    alignSelf: "flex-end",
    color: "#2563EB",
    marginBottom: 24,
  },

  button: {
    height: 56,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },

  btnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  version: {
    textAlign: "center",
    marginTop: 30,
    color: "#94A3B8",
  },


  logo: {
    width: 110,
    height: 110,
    borderRadius:100,
    resizeMode: "contain",
    marginBottom: 10,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
});
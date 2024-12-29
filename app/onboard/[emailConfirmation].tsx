import { useLocalSearchParams, useRouter } from "expo-router";
import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const ConfirmEmailScreen = () => {
  const { emailConfirmation } = useLocalSearchParams<{
    emailConfirmation: string;
  }>();
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleConfirm = async () => {
    if (!emailConfirmation || !confirmationCode) {
      Alert.alert("Error", "Please fill out all fields.");
    } else {
      try {
        // Confirm the sign-up process using the code sent to the user's email
        await Auth.confirmSignUp(emailConfirmation, confirmationCode);
        Alert.alert("Success", "Your email has been confirmed!");
        // After successful confirmation, you can navigate the user to the next screen
        router.push("/(authed)/(tabs)/(feed)");
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    }
  };

  const handleResendCode = async () => {
    if (!emailConfirmation) {
      Alert.alert("Error", "Please enter your email to resend the code.");
      return;
    }

    try {
      // Resend the confirmation code
      await Auth.resendSignUp(emailConfirmation);
      Alert.alert(
        "Success",
        "A new confirmation code has been sent to your email."
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Confirmation Code from email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the confirmation code"
        placeholderTextColor="#aaa"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007BFF" }]}
        onPress={handleResendCode}
      >
        <Text style={styles.buttonText}>Resend Verification Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007BFF" }]}
        onPress={handleConfirm}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28A745",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ConfirmEmailScreen;

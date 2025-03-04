import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, vs } from "react-native-size-matters";
import { Timer } from "../utils/storage";
import { useTheme } from "../utils/ThemeProvider";
import Header from "../components/Header";

export default function AddTimerScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const { colors } = useTheme();

  const saveTimer = async () => {
    if (!name || !duration || !category) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      category,
      remainingTime: parseInt(duration),
      status: "Paused",
    };

    try {
      const storedTimers = await AsyncStorage.getItem("timers");
      const timers: Timer[] = storedTimers ? JSON.parse(storedTimers) : [];
      timers.push(newTimer);
      await AsyncStorage.setItem("timers", JSON.stringify(timers));
      Alert.alert("Success", "Timer saved!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving timer:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Add New Timer" onBackPress={() => navigation.goBack()} />
      <TextInput
        placeholder="Timer Name"
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: colors.cardBackground,
            color: colors.textPrimary,
            borderColor: colors.border,
          },
        ]}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Duration (seconds)"
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: colors.cardBackground,
            color: colors.textPrimary,
            borderColor: colors.border,
          },
        ]}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        placeholder="Category (e.g., Workout, Study, Break)"
        placeholderTextColor={colors.textSecondary}
        style={[
          styles.input,
          {
            backgroundColor: colors.cardBackground,
            color: colors.textPrimary,
            borderColor: colors.border,
          },
        ]}
        value={category}
        onChangeText={setCategory}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={saveTimer}
      >
        <Text style={[styles.buttonText, { color: colors.textPrimary }]}>
          Save Timer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
  },
  title: {
    fontSize: s(24),
    fontWeight: "bold",
    marginBottom: vs(20),
    textAlign: "center",
  },
  input: {
    height: vs(50),
    borderWidth: 1,
    marginBottom: vs(15),
    padding: s(10),
    borderRadius: s(5),
  },
  button: {
    padding: s(8),
    borderRadius: s(15),
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: s(14),
  },
});

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, vs } from "react-native-size-matters"; // Import s and vs
import TimerCard from "../components/TimerCard";
import { useTheme } from "../utils/ThemeProvider"; // Adjust the import path
import Header from "../components/Header";
interface Timer {
  id: string;
  name: string;
  duration: number;
  category: string;
  remainingTime: number;
  status: "Running" | "Paused" | "Completed";
}

export default function Home({ navigation }: any) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    loadTimers();
  }, []);
  console.log(isDarkMode);

  const loadTimers = async () => {
    const storedTimers = await AsyncStorage.getItem("timers");
    if (storedTimers) {
      setTimers(JSON.parse(storedTimers));
    }
  };

  const saveTimers: any = async (updatedTimers: Timer[]) => {
    setTimers(updatedTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  const onUpdateTimer = (id: string, updatedTime: number, status: string) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, remainingTime: updatedTime, status } : timer
    );
    saveTimers(updatedTimers);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupedTimers = timers.reduce(
    (acc: { [key: string]: Timer[] }, timer) => {
      if (!acc[timer.category]) acc[timer.category] = [];
      acc[timer.category].push(timer);
      return acc;
    },
    {}
  );

  return (
    <View>
      <Header title="Timers"  />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {Object.keys(groupedTimers).map((category) => (
          <View key={category}>
            <TouchableOpacity
              onPress={() => toggleCategory(category)}
              style={[
                styles.categoryHeader,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Text
                style={[styles.categoryText, { color: colors.textPrimary }]}
              >
                {category} ({groupedTimers[category].length})
              </Text>
            </TouchableOpacity>
            {expandedCategories[category] &&
              groupedTimers[category].map((timer) => (
                <TimerCard key={timer.id} {...timer} onUpdate={onUpdateTimer} />
              ))}
          </View>
        ))}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("AddTimer")}
        >
          <Text style={[styles.addButtonText, { color: colors.textPrimary }]}>
            + Add Timer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={[styles.addButtonText, { color: colors.textPrimary }]}>
            History
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: s(20),
  },
  title: {
    fontSize: s(24),
    fontWeight: "bold",
    marginBottom: vs(20),
  },
  categoryHeader: {
    padding: s(10),
    marginBottom: vs(5),
    borderRadius: s(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    fontSize: s(18),
    fontWeight: "bold",
  },
  addButton: {
    marginTop: vs(20),
    padding: s(5),
    borderRadius: s(15),
    alignItems: "center",
  },
  addButtonText: {
    fontWeight: "bold",
    fontSize: s(14),
  },
});

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../utils/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";

interface CompletedTimer {
  id: string;
  name: string;
  completionTime: string;
}

export default function History({ navigation }: any) {
  const [history, setHistory] = useState<CompletedTimer[]>([]);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const storedHistory = await AsyncStorage.getItem("history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  };

  const exportHistory = async () => {
    try {
      const jsonString = JSON.stringify(history, null, 2);
      const fileName = `timer-history-${
        new Date().toISOString().split("T")[0]
      }.json`;

      await Share.share({
        title: "Export Timer History",
        message: `Here is your timer history as a JSON file:\n\n${jsonString}`,
      });
    } catch (error) {
      console.error("Error exporting history:", error);
      Alert.alert("Error", "Failed to export timer history.");
    }
  };

  const rightComponent = (
    <TouchableOpacity onPress={exportHistory}>
      <MaterialIcons name="file-download" size={s(24)} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="History"
        onBackPress={() => navigation.goBack()}
        rightComponent={rightComponent}
      />

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.historyCard,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <MaterialIcons
              name="timer"
              size={s(20)}
              color={colors.primary}
              style={styles.timerIcon}
            />
            <View style={styles.timerDetails}>
              <Text style={[styles.timerText, { color: colors.textPrimary }]}>
                {item.name}
              </Text>
              <Text style={{ color: colors.textSecondary }}>
                Completed at: {item.completionTime}
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: s(15),
    marginBottom: vs(10),
    borderRadius: s(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timerIcon: {
    marginRight: s(10),
  },
  timerDetails: {
    flex: 1,
  },
  timerText: {
    fontSize: s(18),
    fontWeight: "bold",
    marginBottom: vs(5),
  },
  flatListContent: {
    padding: s(20),
    paddingBottom: vs(20),
  },
});

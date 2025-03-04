import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import ProgressBar from "./ProgressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../utils/ThemeProvider";

interface TimerCardProps {
  id: string;
  name: string;
  remainingTime: number;
  duration: number;
  status: "Running" | "Paused" | "Completed";
  onUpdate: (id: string, updatedTime: number, status: string) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({
  id,
  name,
  remainingTime,
  duration,
  status,
  onUpdate,
}) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const [isRunning, setIsRunning] = useState(status === "Running");
  const [showModal, setShowModal] = useState(false);
  const [halfwayAlertEnabled, setHalfwayAlertEnabled] = useState(false);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            onUpdate(id, 0, "Completed");
            saveToHistory(name);
            setShowModal(true);
            return 0;
          }

          if (halfwayAlertEnabled && prev === Math.floor(duration / 2)) {
            Alert.alert(
              "⏰ Halfway Alert",
              `You're halfway through "${name}"!`
            );
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning, timeLeft, halfwayAlertEnabled]);

  const saveToHistory = async (timerName: string) => {
    const completedTimer = {
      id,
      name: timerName,
      completionTime: new Date().toLocaleString(),
    };
    const storedHistory = await AsyncStorage.getItem("history");
    const history = storedHistory ? JSON.parse(storedHistory) : [];
    history.push(completedTimer);
    await AsyncStorage.setItem("history", JSON.stringify(history));
  };

  const toggleHalfwayAlert = () => {
    setHalfwayAlertEnabled((prev) => !prev);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.timerName, { color: colors.textPrimary }]}>
        {name}
      </Text>
      <ProgressBar progress={1 - timeLeft / duration} />
      <Text style={{ color: colors.textSecondary }}>
        Status:{" "}
        {timeLeft === 0 ? "Completed" : isRunning ? "Running" : "Paused"}
      </Text>
      <Text style={{ color: colors.textSecondary }}>
        Remaining: {timeLeft}s
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {
            setIsRunning(true);
            onUpdate(id, timeLeft, "Running");
          }}
        >
          <Text style={{ color: colors.textPrimary }}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {
            setIsRunning(false);
            onUpdate(id, timeLeft, "Paused");
          }}
        >
          <Text style={{ color: colors.textPrimary }}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => {
            setIsRunning(false);
            setTimeLeft(duration);
            onUpdate(id, duration, "Paused");
          }}
        >
          <Text style={{ color: colors.textPrimary }}>Reset</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.alertButton,
          {
            backgroundColor: halfwayAlertEnabled
              ? colors.primary
              : colors.border,
          },
        ]}
        onPress={toggleHalfwayAlert}
      >
        <Text
          style={{
            color: halfwayAlertEnabled
              ? colors.textPrimary
              : colors.textSecondary,
          }}
        >
          {halfwayAlertEnabled
            ? "Disable Halfway Alert"
            : "Enable Halfway Alert"}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              🎉 Timer Completed!
            </Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>
              {name} is finished.
            </Text>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={[styles.closeButtonText, { color: colors.textPrimary }]}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: s(15),
    marginBottom: vs(10),
    borderRadius: s(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timerName: {
    fontSize: s(18),
    fontWeight: "bold",
    marginBottom: vs(5),
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: vs(10),
  },
  button: {
    padding: s(10),
    marginRight: s(10),
    borderRadius: s(5),
    alignItems: "center",
  },
  alertButton: {
    padding: s(10),
    marginTop: vs(10),
    borderRadius: s(5),
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: s(300),
    padding: s(20),
    borderRadius: s(10),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: s(20),
    fontWeight: "bold",
    marginBottom: vs(10),
  },
  modalText: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  closeButton: {
    padding: s(10),
    borderRadius: s(5),
  },
  closeButtonText: {
    fontSize: s(16),
  },
});

export default TimerCard;

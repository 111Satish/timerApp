import AsyncStorage from "@react-native-async-storage/async-storage";

const TIMERS_KEY = "timers";
const HISTORY_KEY = "history";

export interface Timer {
  id: string;
  name: string;
  duration: number;
  category: string;
  remainingTime: number;
  status: "Running" | "Paused" | "Completed";
}

export interface CompletedTimer {
  id: string;
  name: string;
  completionTime: string;
}

// 🚀 **Save a Timer**
export const saveTimer = async (timer: Timer) => {
  try {
    const storedTimers = await AsyncStorage.getItem(TIMERS_KEY);
    const timers: Timer[] = storedTimers ? JSON.parse(storedTimers) : [];
    timers.push(timer);
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error("Error saving timer:", error);
  }
};

// 📥 **Load All Timers**
export const loadTimers = async (): Promise<Timer[]> => {
  try {
    const storedTimers = await AsyncStorage.getItem(TIMERS_KEY);
    return storedTimers ? JSON.parse(storedTimers) : [];
  } catch (error) {
    console.error("Error loading timers:", error);
    return [];
  }
};

// ❌ **Delete a Timer**
export const deleteTimer = async (id: string) => {
  try {
    const storedTimers = await AsyncStorage.getItem(TIMERS_KEY);
    let timers: Timer[] = storedTimers ? JSON.parse(storedTimers) : [];
    timers = timers.filter((timer) => timer.id !== id);
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error("Error deleting timer:", error);
  }
};

// 📌 **Save Completed Timer to History**
export const saveToHistory = async (completedTimer: CompletedTimer) => {
  try {
    const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
    const history: CompletedTimer[] = storedHistory ? JSON.parse(storedHistory) : [];
    history.push(completedTimer);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Error saving to history:", error);
  }
};

// 📜 **Load History**
export const loadHistory = async (): Promise<CompletedTimer[]> => {
  try {
    const storedHistory = await AsyncStorage.getItem(HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error("Error loading history:", error);
    return [];
  }
};

// 🔄 **Clear All Timers**
export const clearTimers = async () => {
  try {
    await AsyncStorage.removeItem(TIMERS_KEY);
  } catch (error) {
    console.error("Error clearing timers:", error);
  }
};

// 🔄 **Clear History**
export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error("Error clearing history:", error);
  }
};

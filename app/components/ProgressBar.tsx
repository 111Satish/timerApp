import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../utils/ThemeProvider";

interface ProgressBarProps {
  progress: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const { colors} = useTheme();

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}>
      <Animated.View
        style={[
          styles.progress,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: colors.primary, 
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: vs(10), 
    borderRadius: s(5),
    overflow: "hidden",
    marginBottom: vs(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // For Android
  },
  progress: {
    height: "100%",
    borderRadius: s(5), 
  },
});

export default ProgressBar;
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { s, vs } from "react-native-size-matters";
import { useTheme } from "../utils/ThemeProvider"; 

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, rightComponent }) => {
  const { colors } = useTheme(); 

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={s(24)} color={colors.textPrimary} />
        </TouchableOpacity>
      )}

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      </View>

      <View style={styles.rightComponentContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: s(20),
    paddingVertical: vs(10),
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: s(10),
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: s(16),
    fontWeight: "bold",
    textAlign: "left",
  },
  rightComponentContainer: {
    marginLeft: s(10),
  },
});

export default Header;
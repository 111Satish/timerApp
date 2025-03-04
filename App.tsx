import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/Home";
import HistoryScreen from "./app/screens/History";
import AddTimerScreen from "./app/screens/AddTimer";
import { ThemeProvider } from "./app/utils/ThemeProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddTimer" component={AddTimerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

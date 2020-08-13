import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Home from "../Screens/Home";
import Folders from "../Screens/Folders";

const Stack = createStackNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Folders" component={Folders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

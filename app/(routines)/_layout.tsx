import TabIcon from "@/components/TabIcon";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          marginTop: 10,
        },
        tabBarStyle: {
          backgroundColor: "#1C2129",
          borderColor: "#1C2129",
          height: 120,
        },
      }}
    >
      <Tabs.Screen
        name="functional"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Funcional"
                icon={icons.functionalIcon}
                iconFocused={icons.functionalIconFocused}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="bodyBuilding"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Musculacion"
                icon={icons.bodyBuildingIcon}
                iconFocused={icons.bodyBuildingIconFocused}
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});

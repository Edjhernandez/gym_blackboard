import TabIcon from "@/components/TabIcon";
import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

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
          height: 120,
        },
        tabBarBackground: () => (
          <View className="flex-1 bg-background-primary border-t-[0.5px] border-background-secondary"></View>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Inicio"
                icon={icons.homeIcon}
                iconFocused={icons.homeIconFocused}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Rutinas"
                icon={icons.routineIcon}
                iconFocused={icons.routineIconFocused}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="blackboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Pizarra"
                icon={icons.tvIcon}
                iconFocused={icons.tvIconFocused}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title="Clientes"
                icon={icons.personIcon}
                iconFocused={icons.personIconFocused}
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

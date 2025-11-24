import TabIcon from "@/components/TabIcon";
import { useI18n } from "@/lib/hooks/useI18n";
import { Tabs } from "expo-router";
import { View } from "react-native";
import {
  TvIcon as BlackboardIconOutline,
  HomeIcon as HomeIconOutline,
  ClipboardDocumentListIcon as RoutineIconOutline,
  Cog6ToothIcon as SettingsIconOutline,
} from "react-native-heroicons/outline";
import {
  TvIcon as BlackboardIconSolid,
  HomeIcon as HomeIconSolid,
  ClipboardDocumentListIcon as RoutineIconSolid,
  Cog6ToothIcon as SettingsIconSolid,
} from "react-native-heroicons/solid";

const _layout = () => {
  const { t } = useI18n();
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
                title={t("navigation.home")}
                IconOutline={HomeIconOutline}
                IconSolid={HomeIconSolid}
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
                title={t("navigation.routines")}
                IconOutline={RoutineIconOutline}
                IconSolid={RoutineIconSolid}
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
                title={t("navigation.blackboard")}
                IconOutline={BlackboardIconOutline}
                IconSolid={BlackboardIconSolid}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon
                focused={focused}
                title={t("navigation.settings")}
                IconOutline={SettingsIconOutline}
                IconSolid={SettingsIconSolid}
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

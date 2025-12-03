/* import { useI18n } from "@/lib/hooks/useI18n";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LiveWaitScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView className="flex-1 bg-background-primary justify-center">
      <View className="flex-1 items-center justify-center px-6">
        <MaterialCommunityIcons
          name="television-off"
          size={120}
          color="#FFFF00"
          accessibilityLabel={t("accessibility.no_transmission_label")}
        />

        <Text className="mt-6 text-2xl font-semibold text-text-primary text-center">
          {t("blackboard_screen.no_transmission_message")}
        </Text>
      </View>
    </SafeAreaView>
  );
} */

import React from "react";
import { Pressable, Text } from "react-native";
import { CastButton, useRemoteMediaClient } from "react-native-google-cast";

function MyComponent() {
  // This will automatically rerender when client is connected to a device
  // (after pressing the button that's rendered below)
  const client = useRemoteMediaClient();
  //console.log(CastContext.getPlayServicesState());
  /*  CastContext.getPlayServicesState().then((state) => {
    if (state && state !== PlayServicesState.SUCCESS)
      CastContext.showPlayServicesErrorDialog(state);
  }); */

  if (client) {
    // Send the media to your Cast device as soon as we connect to a device
    // (though you'll probably want to call this later once user clicks on a video or something)
    client.loadMedia({
      mediaInfo: {
        contentUrl:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
        contentType: "video/mp4",
        metadata: {
          images: [
            {
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg",
            },
          ],
          title: "Big Buck Bunny",
          subtitle:
            "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
          studio: "Blender Foundation",
          type: "movie",
        },
        streamDuration: 596, // seconds
      },
      startTime: 10, // seconds
    });
  }

  // This will render native Cast button.
  // When a user presses it, a Cast dialog will prompt them to select a Cast device to connect to.
  return (
    <>
      <Text className="mt-20">Google Cast Button:</Text>
      <Pressable onPress={() => console.log("Cast button pressed")}>
        <CastButton
          style={{
            width: 24,
            height: 24,
            tintColor: "black",
            marginBottom: 50,
          }}
        />
      </Pressable>
    </>
  );
}

export default MyComponent;

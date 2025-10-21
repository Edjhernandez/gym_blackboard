import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { Button, Image, StyleSheet, View } from "react-native";

const videoSource =
  "https://fra.cloud.appwrite.io/v1/storage/buckets/6876aceb001120b2bee4/files/6876c5bc002be76d3082/view?project=6876a62b00385d880d06&mode=admin";

export default function Prueba() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
      <Image
        style={styles.logo}
        source={{
          uri: "https://ix-marketing.imgix.net/autotagging.png",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

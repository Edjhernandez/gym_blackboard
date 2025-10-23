import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="bg-dark h-full flex justify-center items-center">
      <Image source={images.logo180} />
      <Text className="text-light">bienvenido</Text>
      <TouchableOpacity
        className="bg-light p-2 rounded-xl"
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

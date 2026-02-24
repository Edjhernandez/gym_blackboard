import { useI18n } from "@/lib/hooks/useI18n";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Pressable, Text, View } from "react-native";

type TypeBlockRoundsCardProps = {
  rounds: number;
  setBlockRounds: React.Dispatch<React.SetStateAction<number>>;
};

export default function BlockRoundsCard(props: TypeBlockRoundsCardProps) {
  const { t } = useI18n();
  const { rounds, setBlockRounds } = props;

  const handleIncreaseRounds = () => {
    if (rounds < 10) {
      setBlockRounds((prevRounds) => prevRounds + 1);
    }
  };

  const handleDecreaseRounds = () => {
    if (rounds > 1) {
      setBlockRounds((prevRounds) => prevRounds - 1);
    }
  };

  return (
    <View className="w-full bg-background-secondary rounded-xl mb-3 shadow-sm flex-col justify-center items-center pb-2">
      <Text
        className="font-light text-text-primary text-lg p-2"
        numberOfLines={1}
      >
        {t("routines.settings_routine_screen.block_rounds")}
      </Text>

      <View className="w-2/5 flex-row items-center justify-between gap-4">
        <Pressable
          className="bg-background-primary rounded-full w-11 h-11 flex justify-center items-center"
          onPress={handleDecreaseRounds}
          disabled={rounds <= 1}
        >
          <AntDesign
            name="minus"
            size={24}
            color={rounds <= 1 ? "#595959" : "#E7EBDA"}
          />
        </Pressable>
        <Text className="text-text-primary font-semibold text-4xl">
          {rounds}
        </Text>
        <Pressable
          className="bg-background-primary rounded-full w-11 h-11 flex justify-center items-center"
          onPress={handleIncreaseRounds}
          disabled={rounds >= 10}
        >
          <AntDesign
            name="plus"
            size={30}
            color={rounds >= 10 ? "#595959" : "#E7EBDA"}
          />
        </Pressable>
      </View>
    </View>
  );
}

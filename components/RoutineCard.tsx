import { useI18n } from "@/lib/hooks/useI18n";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { EllipsisVerticalIcon } from "react-native-heroicons/outline";
import RoutineActionPopUp from "./RoutineActionPopUp";

type TypeRoutineCardProps = {
  title: string;
  details: string;
};

const RoutineCard = (props: TypeRoutineCardProps) => {
  const { title, details } = props;
  const { t } = useI18n();
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <View className="w-full bg-background-secondary p-3 rounded-xl overflow-hidden my-2 flex-row justify-between items-center">
        <View className="flex-col justify-start items-start">
          <Text className="text-text-primary font-semibold text-base">
            {title}
          </Text>
          <Text className="text-text-secondary text-xs">{details}</Text>
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <EllipsisVerticalIcon size={30} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <RoutineActionPopUp
        visible={visible}
        routineTitle={title}
        routineDetails={details}
        setVisible={setVisible}
      />
    </>
  );
};

export default RoutineCard;

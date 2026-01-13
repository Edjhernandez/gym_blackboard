import useUserStore from "@/lib/stores/userStore";
import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "./../firebaseConfig";
import { getUserById } from "./../utils/getUserById";

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [isThereUser, setIsThereUser] = useState(false);
  const { setUser } = useUserStore();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setInitializing(false);
        return;
      }

      try {
        const getUserData = await getUserById(firebaseUser.uid);
        if (getUserData) {
          setUser(getUserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setIsThereUser(true);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber;
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isThereUser) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}

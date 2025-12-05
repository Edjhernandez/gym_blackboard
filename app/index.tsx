import { Redirect } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth"; // Importa el listener
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native"; // Para el estado de carga
import { auth } from "./../firebaseConfig"; // Importa 'auth'

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) {
        setInitializing(false);
      }
      return subscriber;
    });
    return subscriber;
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}

/* import { images } from "@/constants/images";
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
} */

import { Redirect } from "expo-router";
//import { useAuth } from '../hooks/useAuth'; // Suponiendo que tienes un hook de autenticación

export default function Index() {
  //const { isAuthenticated, isLoading } = useAuth(); // Obtenemos el estado de autenticación

  // 1. Muestra un Spinner si aún estamos cargando el estado de la sesión
  //if (isLoading) {
  // Componente de carga simple
  //return <LoadingScreen />;
  //}

  // 2. Lógica de Redirección (¡Esta es la clave de la "primera pantalla"!)
  //if (isAuthenticated) {
  // Si está autenticado, redirige a la ruta principal de la aplicación.
  // Expo Router automáticamente busca el archivo 'dashboard.tsx' en la carpeta '(app)'.
  return <Redirect href="/login" />;
  //} else {
  // Si NO está autenticado, redirige a la pantalla de login.
  // Expo Router automáticamente busca el archivo 'login.tsx' en la carpeta '(auth)'.
  //return <Redirect href="/login" />;
  // }
}

// Ejemplo de componente de carga simple:
//const LoadingScreen = () => {
// Puedes usar un ActivityIndicator de React Native aquí
//  return <Text>Cargando aplicación...</Text>;
//}

// Nota: El archivo useAuth.js debe contener el AuthContext y la lógica de Firebase.

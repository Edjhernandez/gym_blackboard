import { Redirect } from "expo-router";

export default function Index() {
  // Aquí puedes implementar la lógica para verificar si el usuario está autenticado.
  return <Redirect href="/login" />;
}

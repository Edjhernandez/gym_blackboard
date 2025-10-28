import { Redirect } from "expo-router";

export default function Index() {
  // logic to determine if user is logged in would go here
  return <Redirect href="/login" />;
}

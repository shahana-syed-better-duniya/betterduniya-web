import {Stack} from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index"/>
      <Stack.Screen name="reset"/>
      <Stack.Screen name="verify"/>
    </Stack>
  )
}

export default Layout;

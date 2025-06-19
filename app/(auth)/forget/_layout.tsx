import {Stack} from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index"/>
      <Stack.Screen name="reset" options={{headerShown: false}}/>
      <Stack.Screen name="verify" options={{headerShown: false}}/>
    </Stack>
  )
}

export default Layout;

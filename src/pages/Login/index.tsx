import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, Text, View } from "react-native";

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => navigation.navigate("Home")}>Login1</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, Text, View } from "react-native";

interface HomeNavigationParams {
  // 例如定义一些可能传递给 Home 组件的参数
  id?: {};
  [x: string]: object | undefined;
}
type ScreenComponentProps<Params extends ParamListBase> =
  NativeStackScreenProps<
    Params,
    "Home" // 替换为你的 StackNavigator 的名字
  >;
type HomeComponentProps = ScreenComponentProps<HomeNavigationParams>;

const Home = (props: HomeComponentProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const onBack = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBack
    );
    return () => backHandler.remove();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => navigation.goBack() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );
  return (
    <SafeAreaView>
      <View>
        <Text onPress={() => navigation.goBack()}>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

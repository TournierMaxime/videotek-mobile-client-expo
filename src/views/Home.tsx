import React from "react"
import useNotification from "@mod/mobile-common/lib/hooks/utils/useNotification"
import Trending from "@mod/mobile-tmdb/views/Movies/Trending"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"

interface HomeProps {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "Trending">
  route: any
}

const Home: React.FC<HomeProps> = ({ i18n, t, navigation, route }) => {
  useNotification()

  return <Trending i18n={i18n} t={t} navigation={navigation} route={route} />
}

export default Home

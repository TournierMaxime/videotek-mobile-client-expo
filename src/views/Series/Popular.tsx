import React from "react"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "../../store"
import { SerieStackParamList } from "../../navigators/SerieStackNavigator"

interface PopularProps {
  i18n?: any
  t: any
  navigation?: NavigationProp<SerieStackParamList, "TrendingTV">
  popular: {
    results: [
      {
        id: number
        poster_path: string
      },
    ]
  }
  arrow: boolean
}

const Popular: React.FC<PopularProps> = ({ arrow, popular, t }) => {
  const navigation = useNavigation<NavigationProp<SerieStackParamList>>()
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, colorIcon } = useDynamicThemeStyles(darkMode)

  const { imagePosterHorizontal, headTitle } = useResponsive()

  return (
    <View style={tw`${background}`}>
      <View style={tw`justify-between items-baseline flex-row mr-4`}>
        <Text style={headTitle(text)}>{t("utils.popular")}</Text>
        {arrow ? (
          <TouchableOpacity onPress={() => navigation.navigate("Popular")}>
            <AntDesign
              name="arrowright"
              size={Utils.moderateScale(25)}
              color={colorIcon}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name="tv-sharp"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        )}
      </View>
      <View style={tw`items-center justify-between`}>
        <FlatList
          data={popular?.results?.slice(0, 8)}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={tw`flex-col justify-between`}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetailsSerie", {
                      id: item.id,
                    })
                  }
                >
                  <Image
                    style={[
                      imagePosterHorizontal(),
                      {
                        resizeMode: "cover",
                        marginRight:
                          index === popular?.results?.slice(0, 8).length - 1
                            ? 15
                            : 0,
                      },
                    ]}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

export default Popular

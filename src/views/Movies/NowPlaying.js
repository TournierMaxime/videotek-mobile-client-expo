import React from "react"
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const NowPlaying = ({ nowPlaying, t, arrow }) => {
  const navigation = useNavigation()
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, colorIcon } = useDynamicThemeStyles(darkMode)

  const { imagePosterHorizontal, headTitle } = useResponsive()

  return (
    <View style={tw`${background}`}>
      <View style={tw`justify-between items-baseline flex-row mr-4`}>
        <Text style={headTitle(text)}>{t("utils.trending")}</Text>
        {arrow ? (
          <TouchableOpacity onPress={() => navigation.navigate("NowPlaying")}>
            <AntDesign
              name="arrowright"
              size={Utils.moderateScale(25)}
              color={colorIcon}
            />
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name="movie"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        )}
      </View>
      <View style={tw`items-center justify-between`}>
        <FlatList
          data={nowPlaying?.results?.slice(0, 8)}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={tw`flex-col justify-between`}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DetailsMovie", {
                      id: item.id,
                      title: item.title,
                    })
                  }
                >
                  <Image
                    style={[
                      imagePosterHorizontal(),
                      {
                        resizeMode: "cover",
                        marginRight:
                          index === nowPlaying?.results?.slice(0, 8).length - 1
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

export default NowPlaying

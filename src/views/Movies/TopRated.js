import React, { Fragment } from "react"
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native"
import { Ionicons, AntDesign } from "@expo/vector-icons"
import tw from "twrnc"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { useNavigation } from "@react-navigation/native"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"

const TopRated = ({ topRated, t, arrow }) => {
  const navigation = useNavigation()
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, colorIcon } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`${background}`}>
      <View style={tw`justify-between items-baseline flex-row mr-4`}>
        <Text style={tw`font-medium text-xl ml-4 mt-4 ${text}`}>
          {t("utils.topRated")}
        </Text>
        {arrow ? (
          <TouchableOpacity onPress={() => navigation.navigate("TopRated")}>
            <AntDesign
              name="arrowright"
              size={Utils.moderateScale(25)}
              color={colorIcon}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name="flame"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        )}
      </View>
      <View style={tw`items-center justify-between ${background}`}>
        <FlatList
          style={tw`${background}`}
          data={topRated?.results?.slice(0, 8)}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Fragment>
                {item.media_type == "movie" ? (
                  <View style={tw`flex-col justify-between`}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MoviesTab", {
                          screen: "DetailsMovie",
                          params: { id: item.id },
                        })
                      }
                    >
                      <Image
                        style={[
                          tw`w-30 h-50 rounded-md mt-4 ml-4 mb-4`,
                          {
                            resizeMode: "cover",
                            marginRight:
                              index ===
                              topRated?.results?.slice(0, 8).length - 1
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
                ) : (
                  <View style={tw`flex-col justify-between`}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SeriesTab", {
                          screen: "DetailsSerie",
                          params: { id: item.id },
                        })
                      }
                    >
                      <Image
                        style={[
                          tw`w-30 h-50 rounded-md mt-4 ml-4 mb-4`,
                          {
                            resizeMode: "cover",
                            marginRight:
                              index ===
                              topRated?.results?.slice(0, 8).length - 1
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
                )}
              </Fragment>
            )
          }}
        />
      </View>
    </View>
  )
}

export default TopRated

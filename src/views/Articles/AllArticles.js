import React, { memo, useEffect } from "react"
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from "react-native"
import tw from "twrnc"
import { useSelector, useDispatch } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { searchArticles } from "@mod/mobile-tmdb/redux/actions/articles"
import { useTranslation } from "react-i18next"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const AllArticles = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { articleListTitle } = useResponsive()

  const { i18n } = useTranslation()
  const language = i18n.language

  const data = useSelector((state) => state.searchArticles.data?.articles)
  const isLoading = useSelector((state) => state.searchArticles.loading)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor, colorIcon } =
    useDynamicThemeStyles(darkMode)

  const renderItem = (item, idx) => {
    const { title } = item
    return (
      <TouchableOpacity
        style={tw`flex flex-row items-center justify-around border-b border-slate-200 w-full py-4`}
        key={idx}
        onPress={() =>
          navigation.navigate("OneArticle", { articleId: item.articleId })
        }
      >
        <View style={tw`w-1/12`}>
          <Entypo
            name="news"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        </View>
        <View style={tw`w-8/12`}>
          <Text style={articleListTitle(text, borderColor)}>{title}</Text>
        </View>
        <View style={tw`w-1/12`}>
          <Entypo
            name="chevron-small-right"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    dispatch(searchArticles(language))
  }, [dispatch, language])

  return (
    <FlatList
      style={tw`${background}`}
      keyExtractor={(item, idx) => idx}
      data={data}
      renderItem={({ item, idx }) => renderItem(item, idx)}
      ListEmptyComponent={
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
    />
  )
}

export default memo(AllArticles)

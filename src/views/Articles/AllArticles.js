import React, { memo, useEffect } from "react"
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native"
import tw from "twrnc"
import { useSelector, useDispatch } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { Entypo } from "react-native-vector-icons"
import { useNavigation } from "@react-navigation/native"
import { searchArticles } from "@mod/mobile-tmdb/redux/actions/articles"
import { useTranslation } from "react-i18next"

const AllArticles = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { i18n } = useTranslation()
  const language = i18n.language

  const data = useSelector((state) => state.searchArticles.data?.articles)
  const isLoading = useSelector((state) => state.searchArticles.loading)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, tag, tagText, borderColor, colorIcon } =
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
        <Entypo name="news" size={Utils.moderateScale(25)} color={colorIcon} />
        <Text
          style={tw`${text} font-normal text-base text-justify w-70 ${borderColor}`}
        >
          {title}
        </Text>
        <Entypo
          name="chevron-small-right"
          size={Utils.moderateScale(25)}
          color={colorIcon}
        />
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

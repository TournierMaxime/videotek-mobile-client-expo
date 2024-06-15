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
import { NavigationProp } from "@react-navigation/native"
import { searchArticles } from "@mod/mobile-tmdb/redux/actions/articles"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState, AppDispatch } from "../../redux/store"
import { ArticleStackParamList } from "../../navigators/ArticleStackNavigator"

interface Article {
  articleId: string
  title: string
}

interface AllArticlesProps {
  i18n: any
  t: any
  navigation: NavigationProp<ArticleStackParamList, "AllArticles">
}

const AllArticles: React.FC<AllArticlesProps> = ({ i18n, t, navigation }) => {
  const dispatch: AppDispatch = useDispatch()

  const { articleListTitle } = useResponsive()

  const language = i18n.language

  const data = useSelector(
    (state: RootState) => state.searchArticles.data?.articles,
  )
  const isLoading = useSelector(
    (state: RootState) => state.searchArticles.loading,
  )

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, borderColor, colorIcon } =
    useDynamicThemeStyles(darkMode)

  const renderItem = ({ item, index }: { item: Article; index: number }) => {
    const { title } = item
    return (
      <TouchableOpacity
        style={tw`flex flex-row items-center justify-around border-b border-slate-200 w-full py-4`}
        key={index}
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
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
    />
  )
}

export default memo(AllArticles)

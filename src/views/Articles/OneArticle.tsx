import React, { useEffect, memo } from "react"
import { ScrollView, View, Text, Image, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import tw from "twrnc"
import moment from "moment"
import WebView from "react-native-webview"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { getOneArticle } from "@mod/mobile-tmdb/redux/actions/articles"
import { RootState, AppDispatch } from "../../redux/store"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RouteProp } from "@react-navigation/native"
import { ArticleStackParamList } from "../../navigators/ArticleStackNavigator"

interface OneArticleProps {
  i18n: any
  t: any
  navigation: NativeStackNavigationProp<ArticleStackParamList, "OneArticle">
  route: RouteProp<ArticleStackParamList, "OneArticle">
}

const OneArticle: React.FC<OneArticleProps> = ({ route }) => {
  const { articleId } = route.params
  const dispatch: AppDispatch = useDispatch()

  const {
    articleTitle,
    articleIntro,
    articleParagraph,
    articleUpdate,
    imageArticle,
  } = useResponsive()

  const oneArticle = useSelector(
    (state: RootState) => state.oneArticle.data.article,
  )
  const isLoading = useSelector((state: RootState) => state.oneArticle.loading)

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  const paragraphs = oneArticle?.paragraphs
  const medias = oneArticle?.medias

  const mediaType = (media: any, index: number) => {
    let tweetUrl: string | undefined
    let youtubeUrl: string | undefined

    if (media.type === "post") {
      tweetUrl = media.url
    }

    if (media.type === "video") {
      youtubeUrl = media.url
    }

    const tweetId = tweetUrl ? Utils.extractTweetId(tweetUrl) : null
    const youtubeId = youtubeUrl
      ? Utils.extractYoutubeVideoId(youtubeUrl)
      : null

    switch (media.type) {
      case "image":
        return (
          <Image
            key={index}
            alt={media.mediaId}
            source={{ uri: media.url }}
            style={imageArticle()}
          />
        )
      case "video":
        return (
          <WebView
            key={index}
            source={{
              uri: `https://www.youtube.com/embed/${youtubeId}?controls=1`,
            }}
            style={{
              width: "100%",
              height: Utils.moderateScale(256),
              marginTop: Utils.moderateScale(20),
            }}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator size="large" />}
            useWebKit={true}
          />
        )
      case "post":
        return tweetId ? (
          <View key={index} style={tw`rounded-md border-slate-200 border-2`}>
            <WebView
              source={{ uri: `${tweetUrl}` }}
              style={{ width: "100%", height: Utils.moderateScale(1000) }}
              startInLoadingState={true}
              renderLoading={() => <ActivityIndicator size="large" />}
              useWebKit={true}
            />
          </View>
        ) : null
      default:
        return null
    }
  }

  const introImage = oneArticle?.medias?.find(
    (media: any) => media.type === "image",
  )

  useEffect(() => {
    dispatch(getOneArticle(articleId))
  }, [dispatch, articleId])

  return (
    <ScrollView style={tw`${background}`}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={tw`w-full p-4`}>
          <Text style={articleTitle(text)}>{oneArticle?.title}</Text>
          <Text style={articleIntro(text)}>{oneArticle?.intro}</Text>
          {introImage ? introImage && mediaType(introImage, 0) : null}
          {paragraphs?.map((paragraph: any) => {
            return (
              <Text key={paragraph.position} style={articleParagraph(text)}>
                {paragraph.text}
              </Text>
            )
          })}
          {medias?.map((media: any, index: number) => {
            if (media !== introImage) {
              return mediaType(media, index)
            }
            return null
          })}
          <Text style={articleUpdate(text)}>
            {moment(oneArticle?.createdAt).format("YYYY-MM-DD - HH:mm")}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

export default memo(OneArticle)

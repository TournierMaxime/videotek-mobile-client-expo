import { getOneArticle } from "@mod/mobile-tmdb/redux/actions/articles"
import { useEffect, memo } from "react"
import { ScrollView, View, Text, Image, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import tw from "twrnc"
import moment from "moment"
import WebView from "react-native-webview"
import Utils from "@mod/mobile-common/lib/class/Utils"

const OneArticle = ({ route }) => {
  const { articleId } = route.params
  const dispatch = useDispatch()

  const oneArticle = useSelector((state) => state.oneArticle.data.article)
  const isLoading = useSelector((state) => state.oneArticle.loading)

  const paragraphs = oneArticle?.paragraphs
  const medias = oneArticle?.medias

  const mediaType = (media, index) => {
    let tweetUrl
    let youtubeUrl

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
            className="rounded-md object-cover"
            alt={media.mediaId}
            source={{ uri: media.url }}
            style={tw`w-90 h-50 mt-4`}
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
          />
        )
      case "post":
        return tweetId ? (
          <View key={index} style={tw`rounded-md border-slate-200 border-2`}>
            <WebView
              source={{ uri: `${tweetUrl}` }}
              style={{ width: "100%", height: Utils.moderateScale(1000) }}
            />
          </View>
        ) : null
      default:
        return null
    }
  }

  const introImage = oneArticle?.medias?.find((media) => media.type === "image")

  useEffect(() => {
    dispatch(getOneArticle(articleId))
  }, [dispatch, articleId])

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={tw`w-90 mr-auto ml-auto my-4`}>
          <Text style={tw`font-medium text-lg text-justify`}>
            {oneArticle?.title}
          </Text>
          <Text style={tw`font-normal text-lg mt-4 text-justify`}>
            {oneArticle?.intro}
          </Text>
          {introImage ? introImage && mediaType(introImage, 0) : null}
          {paragraphs?.map((paragraph) => {
            return (
              <Text
                key={paragraph.position}
                style={tw`font-normal text-lg mt-4 text-justify`}
              >
                {paragraph.text}
              </Text>
            )
          })}
          {medias?.map((media, index) => {
            if (media !== introImage) {
              return mediaType(media, index)
            }
            return null
          })}
          <Text style={tw`font-normal text-lg mt-4`}>
            {moment(oneArticle?.createdAt).format("YYYY-MM-DD - HH:mm")}
          </Text>
        </View>
      )}
    </ScrollView>
  )
}

export default memo(OneArticle)

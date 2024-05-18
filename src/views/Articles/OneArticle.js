import { getOneArticle } from "@mod/mobile-tmdb/redux/actions/articles"
import { useEffect, memo } from "react"
import { ScrollView, View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import tw from "twrnc"
import moment from "moment"

const OneArticle = ({ route }) => {
  const { articleId } = route.params
  const dispatch = useDispatch()

  const oneArticle = useSelector((state) => state.oneArticle.data.article)
  const paragraphs = oneArticle?.paragraphs

  useEffect(() => {
    dispatch(getOneArticle(articleId))
  }, [dispatch, articleId])

  return (
    <ScrollView>
      <View style={tw`w-90 mr-auto ml-auto my-4`}>
        <Text style={tw`font-medium text-lg text-justify`}>
          {oneArticle?.title}
        </Text>
        <Text style={tw`font-normal text-lg mt-4 text-justify`}>
          {oneArticle?.intro}
        </Text>
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
        <Text style={tw`font-normal text-lg mt-4`}>
          {moment(oneArticle?.createdAt).format("YYYY-MM-DD - HH:mm")}
        </Text>
      </View>
    </ScrollView>
  )
}

export default memo(OneArticle)

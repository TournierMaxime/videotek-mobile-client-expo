import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header"
import OneArticle from "../views/Articles/OneArticle"
import AllArticles from "../views/Articles/AllArticles"

export type ArticleStackParamList = {
  AllArticles: undefined
  OneArticle: { articleId: string }
}

const ArticleStack = createNativeStackNavigator<ArticleStackParamList>()

interface Props {
  isAuthenticated: boolean
  i18n: any
  t: any
}

const ArticleStackNavigator: React.FC<Props> = ({
  isAuthenticated,
  i18n,
  t,
}) => {
  return (
    <ArticleStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <ArticleStack.Screen
        name="AllArticles"
        options={{
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={false}
              title={""}
              type={""}
            />
          ),
        }}
      >
        {(props) => <AllArticles {...props} i18n={i18n} t={t} />}
      </ArticleStack.Screen>
      <ArticleStack.Screen
        name="OneArticle"
        options={{
          header: () => (
            <Header
              isAuthenticated={isAuthenticated}
              backButton={true}
              title={""}
              type={""}
            />
          ),
        }}
      >
        {(props) => <OneArticle {...props} i18n={i18n} t={t} />}
      </ArticleStack.Screen>
    </ArticleStack.Navigator>
  )
}

export default ArticleStackNavigator

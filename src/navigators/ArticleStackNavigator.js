import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "@mod/mobile-common/lib/components/layout/Header.js"
import OneArticle from "../views/Articles/OneArticle"
import AllArticles from "../views/Articles/AllArticles"

const ArticleStack = createNativeStackNavigator()

const ArticleStackNavigator = ({ isAuthenticated, i18n, t }) => {
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
            <Header isAuthenticated={isAuthenticated} backButton={false} />
          ),
        }}
      >
        {(props) => <AllArticles {...props} i18n={i18n} t={t} />}
      </ArticleStack.Screen>
      <ArticleStack.Screen
        name="OneArticle"
        options={{
          header: () => (
            <Header isAuthenticated={isAuthenticated} backButton={true} />
          ),
        }}
      >
        {(props) => <OneArticle {...props} i18n={i18n} t={t} />}
      </ArticleStack.Screen>
    </ArticleStack.Navigator>
  )
}

export default ArticleStackNavigator

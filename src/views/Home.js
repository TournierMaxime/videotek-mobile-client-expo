import React, { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"
import useNotification from "@mod/mobile-common/lib/hooks/utils/useNotification.js"
import { useDispatch } from "react-redux"
import Trending from "@mod/mobile-tmdb/views/Movies/Trending"

const Home = () => {
  const { i18n } = useTranslation()
  const language = i18n.language

  useNotification()

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [language])

  return <Trending />
}

export default Home

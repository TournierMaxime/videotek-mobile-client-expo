import React, { useEffect, Fragment } from "react"
import { ActivityIndicator } from "react-native"
import { useTranslation } from "react-i18next"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"
import useNotification from "@mod/mobile-common/lib/hooks/utils/useNotification.js"
import Feeds from "./Feeds"
import { useSelector, useDispatch } from "react-redux"
import { searchFeeds } from "@mod/mobile-tmdb/redux/actions/feeds"

const Home = () => {
  const { i18n } = useTranslation()
  const language = i18n.language

  const dispatch = useDispatch()

  const data = useSelector((state) => state.searchFeeds.data?.feeds)
  const isLoading = useSelector((state) => state.searchFeeds.loading)

  useNotification()

  useEffect(() => {
    registerForPushNotificationsAsync()
  }, [language])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(searchFeeds())
    }
    fetchData()
  }, [dispatch])

  return (
    <Fragment>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Feeds data={data} />
      )}
    </Fragment>
  )
}

export default Home

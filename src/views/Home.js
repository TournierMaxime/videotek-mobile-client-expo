import React from "react"
import useNotification from "@mod/mobile-common/lib/hooks/utils/useNotification"
import Trending from "@mod/mobile-tmdb/views/Movies/Trending"

const Home = () => {
  useNotification()

  return <Trending />
}

export default Home

import React, { useEffect } from 'react'
import { movieTrailer } from '../redux/actions/tmdb/movies/trailer'
import { serieTrailer } from '../redux/actions/tmdb/series/trailer'
import { useDispatch, useSelector } from 'react-redux'
import { Linking, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

const extractFirstTrailerResult = (trailer) => {
  if (!trailer.results) {
    return null
  }

  const trailerResult = trailer.results.find((result) => result.type === 'Trailer')

  return trailerResult
}

const Trailer = ({ id, children, movie, serie }) => {
  const dispatch = useDispatch()

    const { i18n } = useTranslation()
    const language = i18n.language

  const mvTrailer = useSelector((state) => state.movieTrailer.data)
  const firstMovieTrailerResult = extractFirstTrailerResult(mvTrailer)
  const videoIdMovie = firstMovieTrailerResult?.key

  const handleLinkToMovieTrailer = () => {
    const url = `https://youtu.be/${videoIdMovie}`
    Linking.openURL(url)
  }

  const srTrailer = useSelector((state) => state.serieTrailer.data)
  const firstSerieTrailerResult = extractFirstTrailerResult(srTrailer)
  const videoIdSerie = firstSerieTrailerResult?.key

  const handleLinkToSerieTrailer = () => {
    const url = `https://youtu.be/${videoIdSerie}`
    Linking.openURL(url)
  }

  useEffect(() => {
    if (movie?.id === id) {
      dispatch(movieTrailer(movie?.id, language))
    } else if (serie?.id === id) {
      dispatch(serieTrailer(serie?.id, language))
    }
  }, [dispatch, id, movie, serie])

  return (
    <TouchableOpacity
      onPress={() => {
        if (id === movie?.id) {
          handleLinkToMovieTrailer()
        } else if (id === serie?.id) {
          handleLinkToSerieTrailer()
        }
      }}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Trailer


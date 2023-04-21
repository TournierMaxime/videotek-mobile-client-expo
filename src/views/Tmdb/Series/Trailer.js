import React, { useEffect } from 'react';
import { serieTrailer } from '../../../redux/actions/tmdb/series/trailer';
import { useDispatch, useSelector } from 'react-redux';
//import YoutubeIframe from '../../../utils/YouTubeIframe';
import { Button, Linking } from 'react-native';

const extractFirstTrailerResult = (trailer) => {
    if (!trailer || !trailer.results || trailer.results.length === 0) {
      return null;
    }
  
    return trailer.results[0];
  }
  
  const Trailer = ({ id }) => {
    const dispatch = useDispatch();
    const trailer = useSelector((state) => state.serieTrailer.data);
    const firstTrailerResult = extractFirstTrailerResult(trailer);
    const videoId = firstTrailerResult?.key;

      const handleLinkTo = () => {
    const url = `https://youtu.be/${videoId}`;
    Linking.openURL(url);
  }
  
    useEffect(() => {
      dispatch(serieTrailer(id))
    }, [dispatch, id])
  
    if (!firstTrailerResult) {
      return null;
    }
  
    return <Button title='Trailer' onPress={handleLinkTo} />
  };


export default Trailer;
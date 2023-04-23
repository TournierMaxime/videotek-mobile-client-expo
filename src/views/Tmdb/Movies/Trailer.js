import React, { useEffect } from 'react';
import { movieTrailer } from '../../../redux/actions/tmdb/movies/trailer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Linking } from 'react-native';

const extractFirstTrailerResult = (trailer) => {
    if (!trailer || !trailer.results || trailer.results.length === 0) {
      return null;
    }
  
    return trailer.results[0];
  }
  
  const Trailer = ({ id }) => {
    const dispatch = useDispatch();
    const trailer = useSelector((state) => state.movieTrailer.data);
    const firstTrailerResult = extractFirstTrailerResult(trailer);
    const videoId = firstTrailerResult?.key;

  const handleLinkTo = () => {
    const url = `https://youtu.be/${videoId}`;
    Linking.openURL(url);
  }
  
    useEffect(() => {
      dispatch(movieTrailer(id))
    }, [dispatch, id])
  
    if (!firstTrailerResult) {
      return null;
    }
  
    return <Button title='Trailer' onPress={handleLinkTo} />
  };


export default Trailer;

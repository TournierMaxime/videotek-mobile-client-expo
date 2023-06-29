import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const RedirectToCritic = ({ serie, movie, children, id }) => {
  const navigation = useNavigation();
  const isLogged = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      {isLogged && serie && serie.id === id && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewCritic', {
              title: serie.original_name,
              id: serie.id,
            });
          }}
        >
          {children}
        </TouchableOpacity>
      )}

      {isLogged && movie && movie.id === id && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewCritic', {
              title: movie.original_title,
              id: movie.id,
            });
          }}
        >
          {children}
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default RedirectToCritic;

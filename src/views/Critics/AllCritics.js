import React, { useEffect, Fragment } from 'react'
import { searchCritic } from '../../redux/actions/critics/searchCritic'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View } from 'react-native'

const AllCritics = ({ id }) => {
  const dispatch = useDispatch()
  const critics = useSelector((state) => state.searchCritic.data.critics)

  useEffect(() => {
    dispatch(searchCritic({ idMovieOrSerie: id }))
  }, [dispatch, id])

/*   const filteredCritics = critics.filter(critic => critic.idMovieOrSerie === id) */

  return (
    <Fragment>
      {critics.map((critic, index) => {
        console.log(critic.idMovieOrSerie)
        return (
          <View key={index}>
            <Text>{critic.idMovieOrSerie}</Text>
          </View>
        )
      })} 
    </Fragment>
  )
}

export default AllCritics

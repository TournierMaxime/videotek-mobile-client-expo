import React, { Fragment } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import Utils from '../lib/class/Utils'
import tw from 'twrnc'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const TrendingTV = ({ t }) => {
  const navigation = useNavigation()
  const trendingTVResults = useSelector(
    (state) => state.trendingTV.data.results
  )
  return (
    <Fragment>
      <View style={tw`justify-between items-baseline flex-row mr-4`}>
        <Text style={tw`font-medium text-xl ml-4 mt-4`}>{t('series')}</Text>
        <Ionicons
          name='tv-sharp'
          size={Utils.moderateScale(25)}
          color='black'
        />
      </View>
      <View style={tw`items-center justify-between mb-6`}>
        <FlatList
          data={trendingTVResults?.slice(0, 8)}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={tw`flex-col justify-between`}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailsSerie', {
                      id: item.id,
                      title: item.name,
                    })
                  }
                >
                  <Image
                    style={[
                      tw`w-30 h-50 rounded-md mt-4 ml-4 mb-4`,
                      {
                        resizeMode: 'cover',
                        marginRight:
                          index === trendingTVResults?.slice(0, 8).length - 1
                            ? 15
                            : 0,
                      },
                    ]}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>
    </Fragment>
  )
}

export default TrendingTV

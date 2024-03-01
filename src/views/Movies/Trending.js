import React, { Fragment } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import tw from 'twrnc'
import Utils from '@mod/mobile-common/lib/class/Utils'
import { useNavigation } from '@react-navigation/native'

const Trending = ({ trending, t, arrow }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      <View style={tw`justify-between items-baseline flex-row mr-4`}>
        <Text style={tw`font-medium text-xl ml-4 mt-4`}>
          {t('utils.trending')}
        </Text>
        {arrow ? (
          <TouchableOpacity onPress={() => navigation.navigate('Trending')}>
            <AntDesign
              name='arrowright'
              size={Utils.moderateScale(25)}
              color='black'
            />
          </TouchableOpacity>
        ) : (
          <Ionicons name='flame' size={Utils.moderateScale(25)} color='black' />
        )}
      </View>
      <View style={tw`items-center justify-between`}>
        <FlatList
          data={trending?.results?.slice(0, 8)}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <Fragment>
                {item.media_type == 'movie' ? (
                  <View style={tw`flex-col justify-between`}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailsMovie', {
                          id: item.id,
                          title: item.title,
                        })
                      }
                    >
                      <Image
                        style={[
                          tw`w-30 h-50 rounded-md mt-4 ml-4 mb-4`,
                          {
                            resizeMode: 'cover',
                            marginRight:
                              index ===
                              trending?.results?.slice(0, 8).length - 1
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
                ) : (
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
                              index ===
                              trending?.results?.slice(0, 8).length - 1
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
                )}
              </Fragment>
            )
          }}
        />
      </View>
    </Fragment>
  )
}

export default Trending

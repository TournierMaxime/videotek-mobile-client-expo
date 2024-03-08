import React, { Fragment } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons } from 'react-native-vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Utils from '@mod/mobile-common/lib/class/Utils'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'

const NowPlaying = ({ nowPlaying, t, arrow }) => {
  const navigation = useNavigation()
  return (
    <Fragment>
      <View style={tw`justify-between items-baseline flex-row mr-4`}>
        <Text style={tw`font-medium text-xl ml-4 mt-4`}>
          {t('utils.films')}
        </Text>
        {arrow ? (
          <TouchableOpacity onPress={() => navigation.navigate('NowPlaying')}>
            <AntDesign
              name='arrowright'
              size={Utils.moderateScale(25)}
              color='black'
            />
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name='movie'
            size={Utils.moderateScale(25)}
            color='black'
          />
        )}
      </View>
      <View style={tw`items-center justify-between`}>
        <FlatList
          data={nowPlaying?.results?.slice(0, 8)}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
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
                          index === nowPlaying?.results?.slice(0, 8).length - 1
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

export default NowPlaying
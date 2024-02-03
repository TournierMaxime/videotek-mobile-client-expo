import React, { memo } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import tw from 'twrnc'

const CastPeople = () => {
  const navigation = useNavigation()
  const career = useSelector((state) => state.peopleCareer.data)

  const { i18n } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const sortedCareer = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  const renderItem = (item, idx) => {
    return item.original_title ? (
      <TouchableOpacity
        key={idx}
        onPress={() =>
          navigation.navigate('DetailsMovie', {
            id: item.id,
            title: item.title,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white p-4`}>
          {item.poster_path ? (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={require('../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>
              {item.title} | {moment(item.release_date).format('YYYY')}{' '}
            </Text>
            <Text style={tw`font-medium text-base px-4 text-justify leading-7`}>
              {item.character}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        key={idx}
        onPress={() =>
          navigation.navigate('DetailsSerie', {
            id: item.id,
            title: item.name,
          })
        }
      >
        <View style={tw`flex flex-row justify-start bg-white p-4`}>
          {item.poster_path ? (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
              }}
            />
          ) : (
            <Image
              style={[
                tw`w-20 h-30 rounded-md ml-4 mb-2`,
                { resizeMode: 'cover' },
              ]}
              source={require('../../assets/images/No_Image_Available.jpg')}
            />
          )}
          <View style={tw`flex-1 w-full`}>
            <Text style={tw`font-medium text-lg ml-4`}>{item.name}</Text>
            <Text style={tw`font-medium text-base px-4 text-justify leading-7`}>
              {item.character}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={[tw`flex-1 flex flex-col border-slate-100`, { borderTopWidth: 2 }]}
    >
      {sortedCareer?.map((item, idx) => renderItem(item, idx))}
    </View>
  )
}

export default memo(CastPeople)

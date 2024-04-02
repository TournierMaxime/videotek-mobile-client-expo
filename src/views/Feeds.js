/* import React, { memo } from "react"
import {
  FlatList,
  Linking,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native"
import tw from "twrnc"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const Feeds = ({ data }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, tag, tagText, borderColor } =
    useDynamicThemeStyles(darkMode)

  const renderItem = (item, idx) => {
    const { title, media, image, link } = item
    return (
      <TouchableOpacity
        style={tw`flex flex-col w-90 ml-auto mr-auto mb-4 shadow-md mt-4`}
        key={idx}
        onPress={() => Linking.openURL(link)}
      >
        <View style={tw`shadow-md`}>
          <Image
            style={tw`w-auto h-35 rounded-t-lg`}
            source={{ uri: image }}
            alt={title}
            resizeMode="cover"
          />
          <Text
            style={[
              tw`absolute ${tagText} font-medium text-base ${tag} px-2 rounded-sm`,
              { bottom: 10, right: 10 },
            ]}
          >
            {media}
          </Text>
        </View>

        <Text
          style={tw`${text} font-normal text-lg text-justify p-2 border-l-2 border-r-2 border-b-2 ${borderColor}`}
        >
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      style={tw`${background}`}
      keyExtractor={(item, idx) => idx}
      data={data}
      renderItem={({ item, idx }) => renderItem(item, idx)}
    />
  )
}

export default memo(Feeds)
 */

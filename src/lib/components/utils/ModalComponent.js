import React from 'react'
import {
  Modal,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import Utils from '../../../lib/class/Utils'
import tw from 'twrnc'

const ModalComponent = ({ visible, setVisible, title, content }) => {
  const handleModalClose = () => {
    setVisible(false)
  }
  return (
    <View style={tw`flex-1 items-end`}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={handleModalClose}
      >
        <View style={tw`flex-1 justify-start items-stretch bg-white`}>
          <View style={tw`flex-row justify-end items-center px-4 pt-4 mt-4 w-full`}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Ionicons style={tw`text-black`} name='close' size={Utils.moderateScale(40)} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={tw`m-4 font-medium text-lg`}>{title}</Text>
            <View>
              {typeof content === 'string' ? (
                <Text style={[tw`m-4 text-justify font-medium text-lg`, { lineHeight: Utils.moderateScale(30) }]}>{content}</Text>
              ) : (
                <View>{content}</View>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

export default ModalComponent

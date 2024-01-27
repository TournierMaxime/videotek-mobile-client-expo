import { Modal, View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import tw from 'twrnc'

const AlertModal = ({ visible, setVisible, action, message, success, t }) => {
  const handleModalClose = () => {
    setVisible(false)
  }

  return (
    <View style={tw`items-center justify-center`}>
      <Modal
        animationType='slide'
        visible={visible}
        onRequestClose={handleModalClose}
        presentationStyle='overFullScreen'
      >
        <View style={[tw`ml-auto mr-auto items-center bg-white absolute h-auto flex flex-col justify-center p-4 rounded-md top-1/4`, { width: '80%', left: '10%' }]}>
          <View>
            <Text style={tw`mb-4 font-medium text-lg`}>{message}</Text>
            <View style={tw`flex flex-row justify-between`}>
              <Pressable style={tw`p-4 w-auto bg-red-500 ml-auto mr-auto`} onPress={() => action()}>
                <Text style={tw`text-white font-medium text-lg`}>{t('delete')}</Text>
              </Pressable>
              <Pressable
                style={[tw`p-4 w-auto mr-auto ml-auto`, { backgroundColor: '#476EFF' }]}
                onPress={() => setVisible(!visible)}
              >
                <Text style={tw`text-white font-medium text-lg`}>{t('cancel')}</Text>
              </Pressable>
            </View>
            {success ? (
              <Text
                style={tw`text-green-500 mt-4 mb-4 font-medium text-lg`}
              >
                {t('yourAccountHasBeenSuccessfullyDeleted')}
              </Text>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AlertModal

import { Modal, View, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import tw from 'twrnc'

const AlertModal = ({ visible, setVisible, action, message, success, t }) => {
  const handleModalClose = () => {
    setVisible(false)
  }

  return (
    <View style={tw`items-center justify-center relative`}>
      <Modal
        animationType='slide'
        visible={visible}
        onRequestClose={handleModalClose}
        presentationStyle='overFullScreen'
        transparent={true}
      >
        <View style={tw`ml-auto mr-auto items-center bg-slate-100 z-5 absolute h-60 flex flex-col justify-center top-150 w-full rounded-t-xl`}>
          <View>
            <Text style={tw`mb-4 font-medium text-lg`}>{message}</Text>
            <View style={tw`flex flex-row justify-between`}>
              <Pressable style={tw`px-4 py-2 w-auto bg-red-500 ml-auto mr-auto rounded-md`} onPress={() => action()}>
                <Text style={tw`text-white font-medium text-lg`}>{t('utils.delete')}</Text>
              </Pressable>
              <Pressable
                style={[tw`px-4 py-2 w-auto mr-auto ml-auto rounded-md`, { backgroundColor: '#476EFF' }]}
                onPress={() => setVisible(!visible)}
              >
                <Text style={tw`text-white font-medium text-lg`}>{t('utils.cancel')}</Text>
              </Pressable>
            </View>
            {success ? (
              <Text
                style={tw`text-green-500 font-medium text-lg`}
              >
                {t('actions.yourAccountHasBeenSuccessfullyDeleted')}
              </Text>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AlertModal

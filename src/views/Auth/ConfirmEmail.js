import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { loginWithUserId, confirmEmail } from '../../redux/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AlertMessage } from '../../lib/components/utils/AlertMessage'
import Message from '../../lib/components/utils/Message'
import tw from 'twrnc'

const ConfirmEmail = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { userId } = route.params
  const [data, setData] = useState({ code: '' })

  const { t } = useTranslation()

  const handleConfirmEmail = async () => {
    try {
      await dispatch(confirmEmail(userId, data))
      AlertMessage(t('yourAccountHasBeenSuccessfullyVerified'))
      await dispatch(loginWithUserId({ userId }))

      navigation.navigate('MainStackNavigator', {
        screen: 'UserProfile',
        userId,
      })
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
    setData({})
  }

  const infoMsg = () => (
    <View style={tw`rounded-md p-4 mb-4 flex-row justify-center items-center`}>
      <Message message={t('anEmailHasBeenSentToYouContainingA6DigitCode')} priority='info' />
    </View>
  )

  return (
    <View style={tw`bg-white p-4 rounded-md h-full`}>
      {infoMsg()}
      <Text style={tw`font-medium text-lg mt-2`}>{t('utils.code')}</Text>
      <TextInput
        style={tw`mt-2 px-3 py-2 text-gray-500 text-lg border border-slate-200 rounded-lg`}
        placeholder={t('utils.code')}
        onChangeText={(text) => setData({ ...data, code: text })}
        value={data.code}
      />
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          onPress={handleConfirmEmail}
        >
          <Text style={tw`px-4 py-2 text-white text-xl font-medium bg-indigo-600 rounded-lg`}>{t('utils.confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ConfirmEmail

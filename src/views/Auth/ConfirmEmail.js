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
    <View style={tw`bg-white p-4 rounded-md m-4`}>
      {infoMsg()}
      <Text style={tw`font-medium text-lg mb-4`}>{t('code')}</Text>
      <TextInput
        style={tw`bg-slate-100 p-4 rounded-md mb-4 font-medium text-lg`}
        placeholder={t('code')}
        onChangeText={(text) => setData({ ...data, code: text })}
        value={data.code}
      />
      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          style={[tw`p-4 rounded-md items-center mr-4 w-auto ml-auto mr-auto`, { backgroundColor: '#00AD4F' }]}
          onPress={handleConfirmEmail}
        >
          <Text style={tw`text-white font-medium text-lg`}>{t('confirm')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ConfirmEmail

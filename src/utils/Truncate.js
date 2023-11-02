import React, { Fragment } from 'react'
import { moderateScale } from './Responsive'
import { TouchableOpacity, Text, View } from 'react-native'

export function truncateTitle(title, maxLength) {
  let length = 0
  let truncatedTitle = ''

  for (const char of title) {
    const code = char.charCodeAt(0)
    length += code < 0x10000 ? 1 : 2
    if (length > maxLength) {
      truncatedTitle += '...'
      break
    }
    truncatedTitle += char
  }

  return truncatedTitle
}

export function truncateOverview(
  title,
  handleModal,
  t,
  textOverview,
  maxLength
) {
  if (typeof title !== 'string') {
    return ''
  }

  let length = 0
  let truncatedOverview = ''

  for (const char of title) {
    const code = char.charCodeAt(0)
    length += code < 0x10000 ? 1 : 2
    if (length > maxLength) {
      truncatedOverview = (
        <Fragment>
          <Text style={textOverview}>
            {truncatedOverview} {'... '}
          </Text>
          <Fragment>
            <TouchableOpacity
              style={{
                position: 'absolute',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#dee2e6',
                width: moderateScale(80),
                height: moderateScale(25),
                borderRadius: moderateScale(3)
              }}
              onPress={() => handleModal()}
            >
              <Text style={{ color: '#495057', fontSize: moderateScale(14) }}>
                {t('more')}
              </Text>
            </TouchableOpacity>
          </Fragment>
        </Fragment>
      )
      break
    }
    truncatedOverview += char
  }

  return (
    <View style={{ flexDirection: 'column' }}>
      <Text style={textOverview}>{truncatedOverview}</Text>
    </View>
  )
}

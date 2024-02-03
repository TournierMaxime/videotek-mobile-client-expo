import { Dimensions, TouchableOpacity, Text, View } from 'react-native'
import React, { Fragment } from 'react'

class Utils {
  static numberWithCommas = (number) => {
    let internationalNumberFormat = new Intl.NumberFormat('en-US')
    return internationalNumberFormat.format(number)
  }

  static horizontalScale = (size) => {
    const { width } = Dimensions.get('window')
    const guidelineBaseWidth = 375

    return (width / guidelineBaseWidth) * size
  }
  static verticalScale = (size) => {
    const { height } = Dimensions.get('window')
    const guidelineBaseHeight = 812

    return (height / guidelineBaseHeight) * size
  }

  static moderateScale = (size, factor = 0.5) => {
    return size + (this.horizontalScale(size) - size) * factor
  }

  static truncateTitle(title, maxLength) {
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

  static truncateOverview(title, handleModal, t, textOverview, maxLength) {
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
                  width: this.moderateScale(80),
                  height: this.moderateScale(25),
                  borderRadius: this.moderateScale(3),
                }}
                onPress={() => handleModal()}
              >
                <Text style={{ color: '#495057', fontSize: this.moderateScale(14) }}>
                  {t('utils.more')}
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
}

export default Utils

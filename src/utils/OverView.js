import React, { Fragment, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { truncateOverview } from './Truncate'
import details from '../styles/pages/details'
import ModalComponent from './ModalComponent'

const OverView = ({ content, isBiography, t }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  if (!content) return null
  return (
    <Fragment>
      <View style={styles.viewOverviewContainer}>
        <Text style={styles.headerTitle}>{ isBiography === true ? t('biography') : t('plot')}</Text>
        <TouchableOpacity onPress={() => handleModal()}>
          <Text style={styles.textOverview}>
            {truncateOverview(content, 300)}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalComponent title={t('plot')} content={content} visible={modalVisible} setVisible={setModalVisible} />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  viewOverviewContainer: details.viewOverviewContainer,
  headerTitle: details.headerTitle,
  textOverview: details.textOverview,
})

export default OverView

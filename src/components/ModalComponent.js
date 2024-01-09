import React from 'react'
import {
  Modal,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import modal from '../styles/components/modal'
import { moderateScale } from '../utils/Responsive'

const ModalComponent = ({ visible, setVisible, title, content }) => {
  const handleModalClose = () => {
    setVisible(false)
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={visible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Ionicons style={styles.closeIcons} name='close' size={moderateScale(40)} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Text style={styles.modalTitle}>{title}</Text>
            <View>
              {typeof content === 'string' ? (
                <Text style={styles.modalText}>{content}</Text>
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

const styles = StyleSheet.create({
  container: modal.container,
  modalView: modal.modalView,
  modalText: modal.modalText,
  closeIcons: modal.closeIcons,
  closeContainer: modal.closeContainer,
  modalTitle: modal.modalTitle,
})

export default ModalComponent

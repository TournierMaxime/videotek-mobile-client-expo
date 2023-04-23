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

const OverViewModal = ({ visible, setVisible, content }) => {
  const handleModalClose = () => {
    setVisible(false)
  }
  return (
    <ScrollView>
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
                <Ionicons style={styles.closeIcons} name='close' size={40} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Synopsis</Text>
            <Text style={styles.modalText}>{content}</Text>
          </View>
        </Modal>
      </View>
    </ScrollView>
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

export default OverViewModal

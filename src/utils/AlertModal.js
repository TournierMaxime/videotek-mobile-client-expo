import { Modal, View, Text, StyleSheet } from 'react-native'
import React from 'react'
import modal from '../styles/components/modal'
import { Pressable } from 'react-native'
import button from '../styles/components/button'

const AlertModal = ({ visible, setVisible, action, message, success, t }) => {
  const handleModalClose = () => {
    setVisible(false)
  }

  return (
    <View style={styles.alertModalContainer}>
      <Modal
        animationType='slide'
        visible={visible}
        onRequestClose={handleModalClose}
        presentationStyle='overFullScreen'
      >
        <View style={styles.alertModalView}>
          <View>
            <Text style={styles.alertModalMessage}>{message}</Text>
            <View style={styles.alertModalActions}>
              <Pressable style={styles.deleteButton} onPress={() => action()}>
                <Text style={styles.buttonText}>{t('delete')}</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setVisible(!visible)}
              >
                <Text style={styles.buttonText}>{t('cancel')}</Text>
              </Pressable>
            </View>
            {success ? (
              <Text
                style={[
                  styles.alertModalMessage,
                  { color: 'green', marginTop: 15 },
                ]}
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

const styles = StyleSheet.create({
  alertModalContainer: modal.alertModalContainer,
  alertModalView: modal.alertModalView,
  alertModalText: modal.alertModalText,
  closeIcons: modal.closeIcons,
  closeContainer: modal.closeContainer,
  modalTitle: modal.modalTitle,
  alertModalActions: modal.alertModalActions,
  deleteButton: button.deleteButton,
  buttonText: button.buttonText,
  cancelButton: button.cancelButton,
  alertModalMessage: modal.alertModalMessage,
})

export default AlertModal

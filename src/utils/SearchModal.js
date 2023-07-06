import React, { useState, useEffect } from 'react'
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
} from 'react-native'
import modal from '../styles/components/modal'
import form from '../styles/components/form'
import { Ionicons } from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { search, resetSearchModal } from '../redux/actions/tmdb/search'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const SearchModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const data = useSelector((state) => state.search.data)
  const searchResults = useSelector((state) => state.search.data.results)
  const [query, setQuery] = useState('')

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const resetSearch = () => {
    setQuery('')
    dispatch({ type: 'SEARCH_RESET_REQUEST' })
  }

  const handleSearch = async () => {
    try {
      await dispatch(search(data.page, query))
    } catch (error) {
      console.log(error)
    }
  }

  const renderItemContent = (item) => {
    if (item.original_title && item.media_type === 'movie') {
      return (
        <TouchableOpacity
          style={{ width: '100%' }}
          onPress={() => {
            navigation.navigate('DetailsMovie', {
              id: item.id,
              title: item.original_title,
            }),
              resetSearch()
            setVisible(false)
          }}
        >
          <Text style={{ width: '100%', fontSize: 16 }}>{`${
            item.original_title
          } (${moment(item.release_date).format('YYYY')}) / ${t(
            'film'
          )}`}</Text>
        </TouchableOpacity>
      )
    } else if (item.name) {
      if (item.media_type === 'tv') {
        return (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => {
              navigation.navigate('DetailsSerie', {
                id: item.id,
                title: item.original_name,
              }),
                resetSearch()
              setVisible(false)
            }}
          >
            <Text style={{ width: '100%', fontSize: 16 }}>{`${
              item.name
            } (${moment(item.first_air_date).format('YYYY')}) / ${t(
              'serie'
            )}`}</Text>
          </TouchableOpacity>
        )
      }
      if (item.media_type === 'person') {
        return (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => {
              navigation.navigate('DetailsPeople', {
                id: item.id,
                name: item.name,
              }),
                resetSearch()
              setVisible(false)
            }}
          >
            <Text style={{ width: '100%', fontSize: 16 }}>{`${item.name} / ${t(
              'celebrity'
            )}`}</Text>
          </TouchableOpacity>
        )
      }
    }
    return null
  }

  const handleModalClose = () => {
    setVisible(false)
    setQuery('')
    resetSearch()
  }

  useEffect(() => {
    if (!visible) {
      resetSearch()
    }
  }, [visible])

  useEffect(() => {
    return () => {
      dispatch(search())
      dispatch(resetSearchModal())
    }
  }, [])

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
              <Ionicons style={styles.closeIcons} name='close' size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.formInput, { fontSize: 16 }]}
              placeholder={t('search')}
              onChangeText={(text) => setQuery(text)}
              value={query}
              onSubmitEditing={handleSearch}
            />
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flexWrap: 'wrap',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '95%',
                    }}
                  >
                    <View
                      style={{
                        marginVertical: 10,
                        padding: 15,
                        backgroundColor: 'white',
                        width: '100%',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      {renderItemContent(item)}
                    </View>
                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: modal.container,
  openButton: modal.openButton,
  textStyle: modal.textStyle,
  modalView: modal.modalView,
  modalText: modal.modalText,
  closeIcons: modal.closeIcons,
  closeContainer: modal.closeContainer,
  formContainer: modal.formContainer,
  formInput: form.formInput,
})

export default SearchModal

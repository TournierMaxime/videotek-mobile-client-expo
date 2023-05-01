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
import { search } from '../redux/actions/tmdb/search'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const SearchModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const data = useSelector((state) => state.search.data)
  const searchResults = useSelector((state) => state.search.data.results)
  const [query, setQuery] = useState('')

  const resetSearch = () => {
    setQuery('');
    dispatch({ type: 'SEARCH_RESET_REQUEST' });
  };

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
          onPress={() => {
            navigation.navigate('DetailsMovie', {
              id: item.id,
              title: item.original_title,
            }),
              resetSearch()
              setVisible(false)
          }}
        >
          <Text>{`${item.original_title} (${moment(item.release_date).format('YYYY')}) / Film`}</Text>
        </TouchableOpacity>
      )
    } else if (item.name) {
      if (item.media_type === 'tv') {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailsSerie', {
                id: item.id,
                title: item.original_name,
              }),
                resetSearch()
                setVisible(false)
            }}
          >
            <Text>{`${item.name} (${moment(item.first_air_date).format('YYYY')}) / Série`}</Text>
          </TouchableOpacity>
        )
      }
      if (item.media_type === 'person') {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DetailsPeople', {
                id: item.id,
                name: item.name,
              }),
                resetSearch()
                setVisible(false)
            }}
          >
            <Text>{`${item.name} / Célébrité`}</Text>
          </TouchableOpacity>
        )
      }
    }
    return null
  }

  const handleModalClose = () => {
    setVisible(false);
    setQuery('');
    resetSearch();
  };

  useEffect(() => {
    if (!visible) {
      resetSearch()
    }
  }, [visible])

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
              style={styles.formInput}
              placeholder='Rechercher'
              onChangeText={(text) => setQuery(text)}
              value={query}
              onSubmitEditing={handleSearch}
            />
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexWrap: 'wrap' }}>
                  <Text style={{ fontSize: 18, marginVertical: 10 }}>
                    {renderItemContent(item)}
                  </Text>
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

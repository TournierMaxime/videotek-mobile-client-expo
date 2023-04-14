import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, TextInput, FlatList, Text } from 'react-native';
import modal from '../styles/components/modal';
import form from '../styles/components/form';
import { Ionicons } from 'react-native-vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../redux/actions/tmdb/search'

const SearchModal = ({ visible, setVisible }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.search.data)
    const searchResults = useSelector((state) => state.search.data.results)
    const [query, setQuery] = useState('')

    const handleSearch = async () => {
        try {
          await dispatch(search(data.page, query));
        } catch(error) {
          console.log(error);
        }
        setQuery('')
      };

      const renderItemContent = (item) => {
        if (item.original_title && item.media_type === 'movie') {
          return `${item.original_title} / Film`;
        } else if (item.name) {
          if (item.media_type === 'tv') {
            return `${item.name} / Série`;
          }
          if (item.media_type === 'person') {
            return `${item.name} / Célébrité`;
          }
        }
        return null;
      };

    return (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
              setVisible(false);
            }}>
            <View style={styles.modalView}>
                <View style={styles.closeContainer}>
                    <TouchableOpacity onPress={() => { setVisible(!visible) }}>
                    <Ionicons style={styles.closeIcons} name="close" size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.formInput}
                        placeholder="Rechercher"
                        onChangeText={text => setQuery(text)}
                        value={query}
                        onSubmitEditing={handleSearch}
                    />
                    <FlatList
                        data={searchResults}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                            return (
                                <Text style={{fontSize: 18, margin: 10}}>{renderItemContent(item)}</Text>
                            )
                        }}
                    />
                </View>
            </View>
          </Modal>
        </View>
      );
  };

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
});
  
 
export default SearchModal
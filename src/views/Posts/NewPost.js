import React, { Fragment, useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from 'react-native'
import form from '../../styles/components/form'
import { ToastSuccess, ToastError } from '../../utils/Toast'
import ToastConfig from '../../utils/ToastConfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { createPost, searchPost } from '../../redux/actions/posts'
import * as ImagePicker from 'expo-image-picker'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { moderateScale } from '../../utils/Responsive'
import button from '../../styles/components/button'
import {
  searchGifs,
  searchCategory,
  resetCategory,
  resetGif,
} from '../../redux/actions/giphy'
import ModalComponent from '../../utils/ModalComponent'
import useLoadMore from '../../utils/LoadMore'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import NoDataFound from '../../utils/NoDataFound'

const NewPost = ({ tmdbId, tmdbTitle, handleModal }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const userId = useSelector((state) => state.auth.data.user.userId)
  const [data, setData] = useState({ image: '' })
  const category = useSelector((state) => state.searchCategory.data.category)
  const gifs = useSelector((state) => state.searchGif.data)
  const gifsResults = useSelector((state) => state.searchGif.data.gifs)
  const [allResults, setAllResults] = useState([])
  const [charCount, setCharCount] = useState(0)
  const [gifModalVisible, setGifModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const { currentPage, loadMore } = useLoadMore(gifs.page, gifs.totalPages)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const pickGif = (gifUrl) => {
    if (data.image) {
      ToastError('error', t('youHaveAlreadySelectedAnImage'), true)
      return
    }
    setData({ ...data, image: gifUrl })
    setGifModalVisible(false)
  }

  const handleCreate = async () => {
    if (!data.content) {
      ToastError('error', t('allFieldsAreMandatory'), true)
      return
    }
    const formData = new FormData()
    formData.append('content', data.content)
    formData.append('tmdbId', tmdbId)
    formData.append('tmdbTitle', tmdbTitle)
    formData.append('userId', userId)

    const imageUri = data.image
    const imageUriParts = imageUri.split('.')
    const fileType = imageUriParts[imageUriParts.length - 1]

    let file = {
      uri: imageUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    }

    formData.append('image', file)

    try {
      const response = await dispatch(createPost(formData))
      if (response) {
        ToastSuccess('success', t('postCreatedSuccessfully'), true)
        setTimeout(() => {
          navigation.navigate('DetailsMovie', { id: tmdbId })
        }, 1000)
        await dispatch(searchPost(tmdbId, { page: 1 }))
        await handleModal()
      } else {
        ToastError('error', t('anErrorOccurredWhileCreatingThePost'), true)
      }
    } catch (error) {
      console.log(error.response.data.errMsg)

      if (error.response && error.response.data && error.response.data.errMsg) {
        ToastError('error', error.response.data.errMsg, true)
      } else {
        ToastError('error', t('anErrorOccurredWhileCreatingThePost'), true)
      }
    }
  }

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName)
    setAllResults([])
    dispatch(searchGifs({ page: 1, nameCategory: categoryName }))
  }

  const pickImage = async () => {
    if (data.image) {
      ToastError('error', t('youHaveAlreadySelectedAnImage'), true)
      return
    }
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert(t('permissionToAccessCameraRollIsRequired'))
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.2,
      allowsMultipleSelection: false,
    })

    if (!result.canceled) {
      setData({
        ...data,
        image: result.assets[0].uri,
      })
    }
  }

  const removeImage = () => {
    setData({ ...data, image: '' })
  }

  const renderItem = (item, index) => (
    <TouchableOpacity key={index} onPress={() => pickGif(item.imagePath)}>
      <Image
        source={{ uri: item.imagePath }}
        style={{
          width: moderateScale(200),
          height: moderateScale(200),
          marginVertical: moderateScale(10),
        }}
      />
    </TouchableOpacity>
  )

  useEffect(() => {
    if (gifsResults?.length > 0) {
      if (currentPage > 1) {
        setAllResults((prevResults) => [...prevResults, ...gifsResults])
      } else {
        setAllResults(gifsResults)
      }
    }
  }, [gifsResults])

  useEffect(() => {
    dispatch(searchCategory())
    if (selectedCategory) {
      dispatch(
        searchGifs({ page: currentPage, nameCategory: selectedCategory })
      )
    }
  }, [dispatch, currentPage, selectedCategory])

  useEffect(() => {
    if (!gifModalVisible) {
      dispatch(resetCategory())
      dispatch(resetGif())
      setAllResults([])
      setSelectedCategory(null)
    }
  }, [gifModalVisible])

  useEffect(() => {
    return () => {
      dispatch(resetCategory())
      dispatch(resetGif())
    }
  }, [])

  return (
    <ScrollView>
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.formLabel}>{t('content')}</Text>
          <TextInput
            editable={true}
            style={styles.formInputContent}
            placeholder={t('content')}
            multiline
            maxLength={300}
            onChangeText={(text) => {
              if (text.length <= 300) {
                setData({ ...data, content: text })
                setCharCount(text.length)
              } else {
                ToastError('error', t('contentCannotExceed300Characters'), true)
              }
            }}
          />
          <Text>{charCount}/300</Text>
        </View>
        <View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              onPress={() => {
                if (data.image === '') {
                  setGifModalVisible(true)
                } else {
                  pickGif()
                }
              }}
              style={styles.blueBtn}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo
                  style={{
                    alignItems: 'center',
                    marginRight: moderateScale(5),
                  }}
                  name='image'
                  size={moderateScale(25)}
                  color='white'
                />
                <Text style={styles.btnTxt}>GIF</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.blueBtn}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo
                  style={{
                    alignItems: 'center',
                    marginRight: moderateScale(5),
                  }}
                  name='image'
                  size={moderateScale(25)}
                  color='white'
                />
                <Text style={styles.btnTxt}>{t('picture')}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {data.image && (
            <Fragment>
              <Image
                source={{ uri: data.image }}
                style={{
                  width: moderateScale(200),
                  height: moderateScale(200),
                  marginTop: moderateScale(10),
                }}
              />
              <TouchableOpacity onPress={() => removeImage()}>
                <AntDesign name='delete' size={moderateScale(24)} color='red' />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
        <View style={{ marginTop: moderateScale(100) }}>
          <TouchableOpacity
            onPress={() => handleCreate()}
            style={styles.blueBtn}
          >
            <Text style={styles.btnTxt}>{t('confirm')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalComponent
        visible={gifModalVisible}
        setVisible={setGifModalVisible}
        title={'Gifs'}
        content={
          <Fragment>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {category?.map((item, index) => {

                const colorsCategoryGif = (item) => {
                  switch(item) {
                    case 'Reaction':
                      return 'orange'
                    case 'Movies':
                      return 'blue'
                    default:
                      return 'grey'
                  }
                }
                
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCategoryClick(item.name)}
                  >
                    <View
                      key={index}
                      style={{
                        borderRadius: moderateScale(5),
                        padding: moderateScale(10),
                        backgroundColor: colorsCategoryGif(item.name),
                        margin: moderateScale(5),
                        width: '95%',
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontSize: moderateScale(20),
                          textAlign: 'center',
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
            {selectedCategory && (
              <View
                style={{
                  marginTop: moderateScale(20),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {allResults.length === 0 ? (
                  <NoDataFound message={t('noGif')} />
                ) : (
                  allResults.map((item, index) => renderItem(item, index))
                )}

                {gifsResults?.length > 0 && currentPage < gifs.totalPages && (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      marginVertical: moderateScale(25),
                    }}
                  >
                    <Button title={t('loadMoreGifs')} onPress={loadMore} />
                  </View>
                )}
              </View>
            )}
          </Fragment>
        }
      />
      <ToastConfig top={moderateScale(0)} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formInputContent: {
    backgroundColor: '#f2f2f2',
    color: '#000',
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
    padding: moderateScale(10),
    height: moderateScale(250),
    textAlignVertical: 'top',
    fontSize: moderateScale(16),
  },
  formInput: form.formInput,
  formLabel: form.formLabel,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
  cardContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    padding: moderateScale(20),
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: '100%',
  },
})

export default NewPost

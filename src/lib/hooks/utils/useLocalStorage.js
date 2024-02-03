import AsyncStorage from "@react-native-async-storage/async-storage"
//import { useDispatch } from "react-redux"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const useLocalStorage = ({ onLoginSuccess }) => {
  //const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData")
      if (userData) {
        const parsedData = JSON.parse(userData)
        onLoginSuccess(parsedData)
      }
    } catch (error) {
      console.log("getUserData error", error)
    }
  }

  const updateLanguage = async () => {
    try {
      const storedLang = await AsyncStorage.getItem("lang")
      if (storedLang) {
        setLang(storedLang)
        i18n.changeLanguage(storedLang)
      }
    } catch (error) {
      console.log("updateLanguage", error)
    }
  }

/*   const favorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites")
      if (storedFavorites) {
        const parse = JSON.parse(storedFavorites)
        await dispatch(allFavorites(parse))
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris", error)
    }
  } */

  return {
    getUserData,
    updateLanguage,
    //favorites,
    lang
  }
}

export default useLocalStorage
import { useDispatch } from "react-redux"
import { loginUser } from "../../../redux/actions/auth"
import { useState } from "react"

const useHandleLogin = ({ navigation }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: "", password: "" })

  const [message, setMessage] = useState({
    success: null,
    error: null,
  })

  const handleLogin = async () => {
    try {
      await dispatch(
        loginUser({ email: data.email, password: data.password })
      )

      navigation.navigate("Home")
    } catch (error) {
      console.log("handleLogin", error.message)
      setMessage({ error: "Data not provided or invalid" })
    }
    setData({ email: "", password: "" })
  }

  return { handleLogin, data, setData, message }
}

export default useHandleLogin

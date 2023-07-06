import { moderateScale } from '../../utils/Responsive'

const containerMessage = {
  borderRadius: moderateScale(5),
  backgroundColor: "#e9e9ff",
  padding: moderateScale(10),
  marginBottom: moderateScale(15),
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

const messageText = {
  textAlign: "center",
  alignItems: "baseline",
  color: "#696cff",
}

export default {
  containerMessage,
  messageText,
}

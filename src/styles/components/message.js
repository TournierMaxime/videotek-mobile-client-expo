import { moderateScale } from '../../utils/Responsive'

const containerMessage = {
  borderRadius: moderateScale(5),
  padding: moderateScale(10),
  marginBottom: moderateScale(15),
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

const messageText = {
  textAlign: "center",
  alignItems: "baseline"
}

export default {
  containerMessage,
  messageText,
}

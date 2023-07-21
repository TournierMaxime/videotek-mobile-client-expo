import { moderateScale } from "../../utils/Responsive"

const container = {
  height: "100%",
}
const tabContainer = {
  flexDirection: "row",
  backgroundColor: "#fff",
  marginBottom: moderateScale(10),
}
const tab = {
  flex: 1,
  padding: moderateScale(10),
  alignItems: "center",
  margin: moderateScale(10),
}
const tabText = {
  color: "black",
  fontSize: moderateScale(16),
}
const selectedTabText = {
  color: "blue",
  fontWeight: "bold",
  textAlign: "center",
  width: moderateScale(100),
  borderBottomColor: "blue",
  borderBottomWidth: moderateScale(2),
  fontSize: moderateScale(16),
}

export default {
  container,
  tabContainer,
  tab,
  tabText,
  selectedTabText,
}

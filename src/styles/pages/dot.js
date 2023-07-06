import { moderateScale } from '../../utils/Responsive'

const container = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 15,
}

const image = {
  width: moderateScale(80),
  height: moderateScale(130),
  resizeMode: 'cover',
  borderRadius: 15,
  marginLeft: 15,
  marginBottom: 5,
}

const renderItemContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  marginVertical: 5,
  padding: 5,
}

const renderItemTitle = {
  fontSize: moderateScale(16),
  marginLeft: 15,
  fontWeight: 'bold',
}

const renderItemOverview = {
  fontSize: moderateScale(16),
  padding: 15,
  textAlign: 'justify',
  lineHeight: moderateScale(30),
}

const renderItemDetails = {
  flex: 1,
  width: '100%',
}

const seasonTitle = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: moderateScale(20),
  marginBottom: 15,
}

const renderItemTags = {
  fontSize: moderateScale(16),
  paddingVertical: 5,
  paddingHorizontal: 20,
  textAlign: 'justify',
  lineHeight: moderateScale(30),
  borderRadius: 8,
  marginLeft: 15,
  marginRight: 'auto',
  marginVertical: 5,
  width: 'auto',
  color: '#495057',
  backgroundColor: '#dee2e6',
}

export default {
  container,
  image,
  renderItemContainer,
  renderItemDetails,
  renderItemOverview,
  renderItemTitle,
  seasonTitle,
  renderItemTags,
}

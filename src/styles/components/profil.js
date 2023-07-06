import { moderateScale } from '../../utils/Responsive'

const profileSectionContainer = {
  backgroundColor: '#fff',
  width: '100%',
  padding: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 1,
}

const icon = {
  marginRight: 15,
}

const textIconContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const profilViewContainer = {
  display: 'flex',
  width: '100%',
}

const formInput = {
  backgroundColor: '#f2f2f2',
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  width: '100%',
}

const formLabel = {
  fontSize: moderateScale(14),
  fontWeight: 'bold',
  marginBottom: 10,
}

const textSize = {
  fontSize: moderateScale(14),
}

export default {
  textSize,
  formInput,
  formLabel,
  profilViewContainer,
  profileSectionContainer,
  icon,
  textIconContainer,
}

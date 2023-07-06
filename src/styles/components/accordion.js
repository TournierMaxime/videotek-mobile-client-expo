import { moderateScale } from '../../utils/Responsive'

const container = {
  flex: 1,
}

const accordContainer = {
  paddingBottom: 4,
}

const accordHeader = {
  padding: 12,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
}

const accordTitle = {
  fontSize: moderateScale(16),
}

const accordBody = {
  padding: 0,
}

const textSmall = {
  fontSize: moderateScale(16),
}

const seperator = {
  height: moderateScale(12),
}

export default {
  container,
  accordContainer,
  accordHeader,
  accordTitle,
  accordBody,
  textSmall,
  seperator,
}

import { moderateScale } from '../../utils/Responsive'

const image = {
    width: moderateScale(80),
    height: moderateScale(130),
    resizeMode: 'contain',
    borderRadius: 15,
    marginLeft: 15,
    marginBottom: 5
}

const castTitle = {
    fontSize: moderateScale(18),
    margin: 5
}

const originalName = {
    textAlign: 'center',
    fontSize: moderateScale(16)
}

const flatListViewContainer = {
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const castViewContainer = {
    marginVertical: 25
}

export default {
    image,
    castTitle,
    originalName,
    flatListViewContainer,
    castViewContainer
}
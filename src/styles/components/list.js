import { moderateScale } from '../../utils/Responsive'

const container = {
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const title = {
    fontSize: moderateScale(24),
    marginLeft: 15,
    marginTop: 15,
    fontWeight: 'bold'
}

const image = {
    width: moderateScale(160),
    height: moderateScale(260),
    resizeMode: 'cover',
    borderRadius: 15,
    margin: 15
}

const flatListViewContainer = {
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const originalTitle = {
    textAlign: 'center',
    fontSize: moderateScale(16)
}

export default { container, title, image, flatListViewContainer, originalTitle }
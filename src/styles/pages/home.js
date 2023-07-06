import { moderateScale } from '../../utils/Responsive'

const categoryViewContainer = {
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
    marginRight: 15
}

const listViewContainer = {
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const originalTitle = {
    textAlign: 'center',
    fontSize: moderateScale(16)
}

const container = {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
}

const title = {
    fontSize: moderateScale(18),
    marginLeft: 15,
    marginTop: 15,
    fontWeight: 'bold'
}

const image = {
    width: moderateScale(133),
    height: moderateScale(216),
    resizeMode: 'cover',
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15
}

export default { 
    container,
    categoryViewContainer,
    listViewContainer,
    originalTitle,
    title,
    image
}
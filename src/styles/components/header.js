import { moderateScale } from '../../utils/Responsive'

const headerContainer = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: moderateScale(100),
    backgroundColor: '#fff'
}

const logo = {
    width: moderateScale(150),
    height: moderateScale(80),
    resizeMode: 'contain'
}

const icon = {
    color: '#000'
}


export default { headerContainer, logo, icon }
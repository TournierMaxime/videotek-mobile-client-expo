import { moderateScale } from '../../utils/Responsive'

const formContainer = {
    backgroundColor: '#fff',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    margin: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

const formInput = {
    backgroundColor: '#f2f2f2',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
    fontSize: moderateScale(16)
}

const formLabel = {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
}

export default { formLabel, formInput, formContainer, }
import { moderateScale } from '../../utils/Responsive'

const container = {
    flex: 1,
    alignItems: 'flex-end'
}

const openButton = {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
}

const textStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
}

const modalView = {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
}

const modalTitle = {
    margin: 15,
    fontSize: moderateScale(20),
}

const modalText = {
    margin: 15,
    textAlign: 'justify',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(30)
}

const closeIcons = {
    color: '#000'
}

const closeContainer = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginTop: moderateScale(40),
    width: '100%',
};

const formContainer = {
    padding: 20,
    margin: 20,
    position: 'relative',
}

const alertModalContainer = {
    alignItems: "center",
    justifyContent: "center",
}

const alertModalView = {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    top: '25%',
    left: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
}

const alertModalText = {

}

const alertModalActions = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

const alertModalMessage = {
    marginBottom: 20,
    fontSize: moderateScale(14)
}

export default {
    formContainer,
    closeContainer,
    container, 
    openButton,
    textStyle,
    modalView,
    modalText,
    closeIcons,
    modalTitle,
    alertModalContainer,
    alertModalView,
    alertModalText,
    alertModalActions,
    alertModalMessage
}
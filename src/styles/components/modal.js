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
    backgroundColor: 'white',
}

const modalTitle = {
    margin: 15,
    fontSize: 20,
}

const modalText = {
    margin: 15,
    textAlign: 'justify',
    fontSize: 18,
    lineHeight: 30
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
    width: '100%',
};

const formContainer = {
    padding: 20,
    margin: 20,
    position: 'relative'
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
    modalTitle
}
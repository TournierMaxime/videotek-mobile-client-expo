const loginButton = {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#00AD4F'
}

const registerButton = {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#476EFF'
}

const forgetPasswordButton = {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 1,
    backgroundColor: '#C90404'
}

const buttonText = {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
}

const buttonContainer = {
    flexDirection: 'row',
    justifyContent: 'space-between'
}

const formContainer = {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative'
}

const formInput = {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
}

const formButton = {
    backgroundColor: '#22C55E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
}

const formButtonRegister = {
    backgroundColor: '#476EFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
}

const formButtonLogin = {
    backgroundColor: '#00AD4F',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
}

const formButtonForgetPassword = {
    backgroundColor: '#C90404',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginRight: 10,
}

const formLabel = {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
}

export default { formButtonForgetPassword, formButtonLogin, formButtonRegister, formLabel, formButton, formInput, formContainer, loginButton, registerButton, forgetPasswordButton, buttonText, buttonContainer }
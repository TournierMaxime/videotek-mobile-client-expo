const cardContainer = {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 10,
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

const cardInfo = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
}

const textInfo = {
    fontSize: 25
}

const cardTitle = {
    fontSize: 25
}

const buttonIncDec = {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'baseline',
    width: '100%',
    marginTop: 20
}

const svgButtonIncDec = {
    fill: '#fff',
    stroke: '#f09f09',
    strokeWidth: 0.4,
    background: 'none',
}

const svgTrashContainer = {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 5
}

const svgTrashButton = {
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    background: 'none',
}

export default { cardContainer, cardTitle, cardInfo, textInfo, buttonIncDec, svgButtonIncDec, svgTrashButton, svgTrashContainer }
const container = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15
}
  
const image = {
    width: 80,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 15,
    marginLeft: 15,
    marginBottom: 5,
}
  
const renderItemContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
  
const renderItemTitle = {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: 'bold',
}
  
const renderItemOverview = {
    fontSize: 16,
    padding: 15,
    textAlign: 'justify',
    lineHeight: 30,
}
  
const renderItemDetails = {
    flex: 1,
    width: '100%',
}

const seasonTitle = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15
}
  
export default {
    container,
    image,
    renderItemContainer,
    renderItemDetails,
    renderItemOverview,
    renderItemTitle,
    seasonTitle
  }
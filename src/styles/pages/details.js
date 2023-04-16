const title = {
    fontSize: 18,
    margin: 5
}

const subTitle = {
    fontSize: 16,
    margin: 15
}

const flatListViewContainer = {
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const image = {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 15,
    marginLeft: 15,
    marginBottom: 5
}

const tags = {
    fontSize: 16,
    borderRadius: 8,
    marginHorizontal: 15,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#495057',
    backgroundColor: '#dee2e6'
}

const scrollView = {
    display: 'flex',
    width: '100%',
    height: '100%'
}

const mainViewContainer = {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: 500
}

const linearGradient = {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex'
}

const imageBackground = {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0 
}

const viewOverviewContainer = {
    width: '90%',
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
    position: 'absolute',
    top: '-10%',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    margin: 15
}

const headerTitle = {
    color: 'white'
}

const textOverview = {
    color: 'white',
    textAlign: 'justify',
    marginTop: 5,
    lineHeight: 20
}

const headerViewContainer = {
    position: 'absolute',
    top: '5%',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex'
}

const posterViewContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const posterPath = {
    width: 200,
    height: 200,
    resizeMode: 'contain'
}

const releaseDate  ={
    color: 'white',
    justifyContent: 'flex-end'
}

const infoViewContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
}

const genresViewContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
}

const genreText = {
    fontSize: 12,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#495057',
    backgroundColor: '#dee2e6'
}

const directorsViewContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
} 

const directorText = {
    fontSize: 12,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#495057',
    backgroundColor: '#dee2e6'
}

const directorTitle = {
    color: 'white',
    marginTop: 15
}

const productionViewContainer = {
    marginVertical: 25
}

export default { 
    title,
    subTitle,
    flatListViewContainer,
    image,
    tags,
    scrollView,
    mainViewContainer,
    linearGradient,
    imageBackground,
    viewOverviewContainer,
    headerTitle,
    textOverview,
    headerViewContainer,
    posterViewContainer,
    posterPath,
    releaseDate,
    infoViewContainer,
    genresViewContainer,
    genreText,
    directorsViewContainer,
    directorText,
    directorTitle,
    productionViewContainer
 }
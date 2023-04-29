import { verticalScale, horizontalScale, moderateScale } from '../../utils/Responsive'

const mainContainer = {
    display: 'flex',
    flexDirection: 'column'
}

const title = {
    fontSize: 18,
    margin: 5
}

const subTitle = {
    fontSize: 16,
    marginHorizontal: 15,
    fontWeight: 'bold'
}

const flatListViewContainer = {
    flexDirection: 'column',
    alignItems: 'flex-start'
}

const image = {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 15,
    marginLeft: 15,
    marginBottom: 5
}

const tags = {
    fontSize: 16,
    borderRadius: 8,
    marginLeft: 15,
    marginVertical: 5,
    width: 'auto',
    padding: 5,
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
    height: horizontalScale(500)
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
    color: 'white',
    marginVertical: 5
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
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    display: 'flex'
}

const posterViewContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const posterPath = {
    width: 140,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5
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
    marginTop: 5
}

const productionViewContainer = {
    marginVertical: 25
}

const technicalSheetViewContainer = {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5
}

const imdb = {
    fill: '#fff',
    stroke: '#f09f09',
    strokeWidth: 0.4,
    background: 'none',
}

export default { 
    technicalSheetViewContainer,
    mainContainer,
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
    productionViewContainer,
    imdb
 }
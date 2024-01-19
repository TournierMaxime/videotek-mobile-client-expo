const initialState = {
  favorites: [],
  loading: false,
  error: null,
}

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {   
    case "ALL_FAVORITES":
      return {
        ...state,
        favorites: action.payload
      }
    
    case "ADD_FAVORITE": {
      const { game } = action.payload
      if (!state.favorites.some((favorite) => favorite.id === game.id)) {
        const newFavorite = {
          id: game?.id,
          name: game?.names?.international,
          image: game?.assets?.["cover-tiny"]?.uri,
        }
        const updatedFavorites = [...state.favorites, newFavorite]
        return { ...state, favorites: updatedFavorites }
      }
      return state
    }

    case "REMOVE_FAVORITE": {
      const { gameId } = action.payload
      const updatedFavorites = state.favorites.filter(
        (game) => game.id !== gameId
      )
      return { ...state, favorites: updatedFavorites }
    }

    case "RESET":
      return initialState

    default:
      return state
  }
}

export { favoritesReducer }
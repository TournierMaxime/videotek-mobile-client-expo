const addFavorite = (game) => ({
  type: "ADD_FAVORITE",
  payload: { game },
})

const removeFavorite = (gameId) => ({
  type: "REMOVE_FAVORITE",
  payload: { gameId },
})

const allFavorites = (data) => ({
  type: 'ALL_FAVORITES',
  payload: data
})

const reset = () => ({
  type: "RESET",
})

export { addFavorite, removeFavorite, allFavorites, reset }
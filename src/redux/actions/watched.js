
const markEpisodeWatched = (serieId, seasonNumber, episodeNumber) => ({
  type: 'MARK_EPISODE_WATCHED',
  payload: { serieId, seasonNumber, episodeNumber},
})

const unmarkEpisodeWatched = (serieId, seasonNumber, episodeNumber, episodeId) => ({
  type: 'UNMARK_EPISODE_WATCHED',
  payload: { serieId, seasonNumber, episodeNumber, episodeId},
})

const resetWatched = () => ({
  type: 'RESET_WATCHED',
})

export {
  markEpisodeWatched,
  unmarkEpisodeWatched,
  resetWatched
}

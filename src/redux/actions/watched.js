const markSeasonWatched = (serieId, seasonNumber) => ({
  type: 'MARK_SEASON_WATCHED',
  payload: { serieId, seasonNumber },
})

const unmarkSeasonWatched = (serieId, seasonNumber) => ({
  type: 'UNMARK_SEASON_WATCHED',
  payload: { serieId, seasonNumber },
})

const markEpisodeWatched = (serieId, seasonNumber, episodeNumber) => ({
  type: 'MARK_EPISODE_WATCHED',
  payload: { serieId, seasonNumber, episodeNumber },
})

const unmarkEpisodeWatched = (serieId, seasonNumber, episodeNumber) => ({
  type: 'UNMARK_EPISODE_WATCHED',
  payload: { serieId, seasonNumber, episodeNumber },
})

export {
  markSeasonWatched,
  unmarkSeasonWatched,
  markEpisodeWatched,
  unmarkEpisodeWatched,
}

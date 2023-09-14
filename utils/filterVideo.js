const filterVideo = (videos) => {
  return videos
    .filter((item) => {
      let isValid = true;
      if (!item.official) {
        isValid = false;
      }
      if (item.site !== "YouTube") {
        isValid = false;
      }
      if (item.type !== "Trailer" && item.type !== "Teaser ") {
        isValid = false;
      }
      return isValid;
    })
    .sort((a, b) => (a.published_at > b.published_at ? -1 : 1));
};

const filterMovie = (movies, filterObj) => {
  const result = movies.filter((item) => {
    let isValid = true;
    const releaseDate = new Date(item.release_date);
    if (filterObj.genreId && !item.genre_ids.includes(filterObj.genreId)) {
      isValid = false;
    }
    if (filterObj.mediaType && item.media_type !== filterObj.mediaType) {
      isValid = false;
    }
    if (filterObj.language && item.original_language !== filterObj.language) {
      isValid = false;
    }
    if (filterObj.year && releaseDate.getFullYear() !== filterObj.year) {
      isValid = false;
    }
    return isValid;
  });
  return result;
};

module.exports = {
  filterVideo,
  filterMovie,
};

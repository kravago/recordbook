"use strict";

// wrapper API to interact with myanimelist api

const axios = require('axios');
const { getSeason } = require('./helpers/season');
const BASE_URL = 'https://api.jikan.moe/v4';

const getAnimeFromId = async (anime_id) => {
  try {
    const res = await axios.get(BASE_URL + `/anime/${anime_id}`);
    return res.data.data;
  } catch (err) {
    return err.message;
  }
}

const getAnimesFromSearch = async (searchStr) => {
  try {
    const config = { params: {q: searchStr} }
    const res = await axios.get(BASE_URL + `/anime`, config);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

const getTopAnime = async () => {
  try {
    const config = { params: { filter: "airing"}}
    const res = await axios.get(BASE_URL + '/top/anime', config);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

const getSeasonalAnime = async () => {
  try {
    const res = await axios.get(BASE_URL + `/seasons/now`);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

const getEpisodes = async (anime_id) => {
  try {
    const res = await axios.get(BASE_URL + `/anime/${anime_id}/episodes`);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

// sample response:
// {
//   "data": {
//       "mal_id": 2,
//       "url": "https://myanimelist.net/anime/20/Naruto/episode/2",
//       "title": "My Name is Konohamaru!",
//       "title_japanese": "木ノ葉丸だ コレ!",
//       "title_romanji": "Konohamaru da Kore!",
//       "duration": 1380,
//       "aired": "2002-10-10T00:00:00+09:00",
//       "filler": false,
//       "recap": false,
//       "synopsis": "Naruto finally graduates from the Ninja Academy and claims to know it all. (Source: Crunchyroll)"
//   }
// }
const getEpisode = async (anime_id, episode_id) => {
  try {
    const res = await axios.get(BASE_URL + `/anime/${anime_id}/episodes/${episode_id}`);
    return res.data;
  } catch (err) {
    console.log("Error in getting episode");
    return err.message;
  }
}

module.exports = {
    BASE_URL,
    getAnimeFromId,
    getAnimesFromSearch,
    getTopAnime,
    getSeasonalAnime,
    getEpisode,
    getEpisodes
}
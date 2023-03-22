"use strict";

// wrapper API to interact with myanimelist api

const axios = require('axios');
const { getSeason } = require('./helpers/season');
const BASE_URL = 'https://api.jikan.moe/v4';
// const BASE_URL = "https://api.myanimelist.net/v2";
// const TOKEN = process.env.TOKEN;
// const headers = { "X-MAL-CLIENT-ID": TOKEN }
// const params = { 
//         fields: "start_date,end_date,synopsis,mean,status,genres,num_episodes,start_season" 
// }

const getAnimeFromId = async (anime_id) => {
  try {
    // const config = { headers: headers, params: params}
    const res = await axios.get(BASE_URL + `/anime/${anime_id}`);
    return res.data.data;
  } catch (err) {
    return err.message;
  }
}

const getAnimesFromSearch = async (searchStr) => {
  try {
    const config = { headers: headers, params: {...params, q: searchStr}}
    const res = await axios.get(BASE_URL + `/anime`, config);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

const getTopAnime = async () => {
  try {
    const config = { headers: headers, params: {...params, ranking_type: "all"}}
    const res = await axios.get(BASE_URL + '/anime/ranking', config);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

const getSeasonalAnime = async () => {
  try {
    const config = { headers: headers, params: params}
    const season = getSeason();
    const res = await axios.get(BASE_URL + `/anime/season/${season.year}/${season.season}`, config);
    return res.data;
  } catch (err) {
    return err.message;
  }
}

module.exports = {
    BASE_URL,
    // TOKEN,
    getAnimeFromId,
    getAnimesFromSearch,
    getTopAnime,
    getSeasonalAnime
}
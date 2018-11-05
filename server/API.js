import axios from 'axios'
import qs from 'qs'
require('dotenv').config()

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/** Instance of axios with custom config */
const instance = axios.create({
  baseURL: 'http://rockets.jayroman.com/api/',
  headers: {
    'X-Api-Username': process.env.API_USER,
    'X-Api-Key': process.env.API_KEY
  }
})

/**
 * Get the games from REST API.
 * @return {array} The list of NBA game objects.
 */
const getGames = async () => {
  try {
    const response = await instance.get('games')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Get the scouting assignemnts for a game from REST API.
 * @param {string} id A unique ID representing a game.
 * @return {Object} An object containing a list of scouting assignments.
 */
const getAssignments = async (id) => {
  try {
    const response = await instance.get(`games/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Add a scout to a game from REST API.
 * @param {string} gameId A unique ID representing a game.
 * @param {string} scoutId A unique ID representing a scout.
 * @return {Object} An object containing a list of scouting assignments and game info.
 */
const addScout = async (gameId, scoutId) => {
  const requestBody = qs.stringify({ gameId: `${gameId}`, scoutId: `${scoutId}` })
  try {
    const response = await instance.post(`assignments`, requestBody)
    return response.data
  } catch (error) {
    const err = error.response.data
    console.error(err)
    return err
  }
}

export {getGames, getAssignments, addScout}

import axios from 'axios'
require('dotenv').config()

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
 * @param {number} id A unique ID representing a game.
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

export {getGames, getAssignments}

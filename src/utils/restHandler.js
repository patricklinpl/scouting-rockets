import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * Get the games from custom end point.
 * @return {array} The list of NBA game objects.
 */
const getGames = async () => {
  try {
    const response = await axios.get('api/games')
    return response.data.games
  } catch (error) {
    console.error(error)
  }
}

/**
 * Get the game assignments from custom end point.
 * @return {object} The list of game assignments from a game.
 */
const getAssignments = async (id) => {
  try {
    const response = await axios.get(`${window.location.origin.toString()}/rockets/api/games/${id}`)
    return response.data.assigns
  } catch (error) {
    console.error(error)
  }
}

/**
 * Assign a scout to a game.
 * @param {string} gameId A unique ID representing a game.
 * @param {string} scoutId A unique ID representing a scout.
 */
const addScouts = async (gameId, scoutId) => {
  const requestBody = qs.stringify({ gameId: `${gameId}`, scoutId: `${scoutId}` })
  try {
    await axios.post(`${window.location.origin.toString()}/rockets/api/assignments`, requestBody)
  } catch (error) {
    console.error(error)
  }
}

export { getGames, getAssignments, addScouts }

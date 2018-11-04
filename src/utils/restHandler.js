import axios from 'axios'

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
    const response = await axios.get(`${window.location.origin.toString()}/api/games/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export { getGames, getAssignments }

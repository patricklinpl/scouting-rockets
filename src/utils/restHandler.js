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

export { getGames }

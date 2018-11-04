import { Router } from 'express'
import {getGames} from './API'

const routes = Router()

/** Endpoint to get a list of NBA games */
routes.get('/api/games', async (req, res) => (
  res.status(200).send({ 'games': await getGames() })
))

export default routes

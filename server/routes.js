import { Router } from 'express'
import {getGames, getAssignments} from './API'

const routes = Router()

/** Endpoint to get a list of NBA games */
routes.get('/api/games', async (req, res) => (
  res.status(200).send({ 'games': await getGames() })
))

/** Endpoint to get an NBA game's assignments */
routes.get('/api/games/:id', async (req, res) => (
  res.status(200).send({ 'data': await getAssignments(1) })
))

export default routes

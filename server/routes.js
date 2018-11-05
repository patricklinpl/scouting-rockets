import { Router } from 'express'
import {getGames, getAssignments, addScout} from './API'

const routes = Router()

/** Endpoint to get a list of NBA games */
routes.get('/api/games', async (req, res) => (
  res.status(200).send({ 'games': await getGames() })
))

/** Endpoint to get an NBA game's assignments */
routes.get('/api/games/:id', async (req, res) => (
  res.status(200).send({ 'assigns': await getAssignments(req.params.id) })
))

/** Endpoint to create assignments */
routes.post('/api/assignments', async (req, res) => {
  const gameId = req.body.gameId
  const scoutId = req.body.scoutId
  const response = await addScout(gameId, scoutId)
  if ('error' in response) {
    res.status(400).send(response)
  } else {
    res.status(200).send(response)
  }
})

export default routes

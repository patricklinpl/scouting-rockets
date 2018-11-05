import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()
app.disable('x-powered-by')

app.use(logger('dev', { skip: () => app.get('env') === 'test' }))

/** Parse JSON Objects */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/** Serve static assets */
app.use('/rockets', express.static(path.resolve(__dirname, '..', 'public/build')))

/** Routes */
app.use('/rockets', routes)

/** Always return the main index.html, so react-router can render the route in the client */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public/build', 'index.html'))
})

export default app

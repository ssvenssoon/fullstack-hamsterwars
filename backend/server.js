// Importera npm-paket och moduler
// Allmänna inställningar
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT || 1178
import hamsters from './routes/hamster.js'

// console.log('Log ' + __dirname);

const staticFolder = path.join(__dirname, '/../backend/dist/')

const staticImages = path.join(__dirname, '/public/img/')

// Middleware
// CORS öppnar vårt projekt så det kan användas från andra domäner
app.use(cors())
app.use(express.json())
// Parse request body
app.use(express.urlencoded({ extended: true }))

// Logger - skriv ut information om inkommande request
app.use((req, res, next) => {
  console.log(`Logger: ${req.method}  ${req.url} `, req.body)
  next()
})

// Serve static files in this folder
app.use(express.static(staticFolder))
app.use('/img', express.static(staticImages))

// Routes
app.use('/hamsters', hamsters)
app.all('*', (req, res) => {
  res.sendFile(staticFolder + 'index.html')
})

// Starta server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})
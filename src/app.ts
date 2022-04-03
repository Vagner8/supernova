import express from 'express'
import users from './routers/users'
import settings from './routers/settings'
// import path from 'path'

const app = express()
const port = process.env.PORT || 5000
// const publicPath = path.join(__dirname, '..', 'client', 'build')

// app.use(express.static(publicPath))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// })

app.use('/users', users)
app.use('/settings', settings)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
})
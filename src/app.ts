import express from 'express'
// import path from 'path'

const app = express()
const port = process.env.PORT || 5000
// const publicPath = path.join(__dirname, '..', 'client', 'build')

// app.use(express.static(publicPath))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// })

app.get('/cool', (req, res) => {
    console.log(123)
    res.json('Hell0')
})

app.listen(port, () => {
    console.log(`Server has been started on port ${port}`)
})
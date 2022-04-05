import express from 'express'
import { usersDB } from '../db/useMongo'

const router = express.Router()

router.get('/', async (req, res) => {
    const cursor = await usersDB.find()
    const users = await cursor.toArray()
    res.json(users)
    await usersDB.close()
})

router.get('/profile', async (req, res) => {
    const {userId} = req.query
    const user = await usersDB.findOne(userId as string)
    res.json(user)
    await usersDB.close()
})

router.post('/post', (req, res) => {
    console.log(req.body)
    res.json('ok')
})

// router.put('/put', (req, res) => {
    
// })

// router.delete('/delete', (req, res) => {
//     console.log(req.body)
// })

export default router
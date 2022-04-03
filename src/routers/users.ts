import express from 'express'
import { usersDB } from '../db/useMongo'

const router = express.Router()

router.get('/', async (req, res) => {
    const cursor = await usersDB.find()
    const users = await cursor.toArray()
    res.json(users)
    await usersDB.close()
})

// router.post('/post', (req, res) => {
    
// })

// router.put('/put', (req, res) => {
    
// })

// router.delete('/delete', (req, res) => {
    
// })

export default router
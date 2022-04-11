import express from 'express'
import { User } from '../db/types'
import { usersDB } from '../db/useMongo'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const cursor = await usersDB.find()
    const users = await cursor.toArray()
    res.json(users)
  } catch (err) {
    console.error(req.query, err.message)
  } finally {
    await usersDB.close()
  }
})

router.get('/profile?:userId', async (req, res) => {
  try {
    const { userId } = req.query
    const user = await usersDB.findOne<User>(userId as string)
    res.json(user)
    await usersDB.close()
  } catch (err) {
    console.error(req.query, err.message)
  } finally {
    await usersDB.close()
  }
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
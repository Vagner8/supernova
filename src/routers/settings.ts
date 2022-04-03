import express from 'express'
import { settingsDB } from '../db/useMongo'

const router = express.Router()

router.get('/', async (req, res) => {
    const settings = await settingsDB.findOne()
    res.json(settings)
    await settingsDB.close()
})

export default router
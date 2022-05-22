import express from 'express'
import { getOwnerController } from './getOwnerController'

const router = express.Router()

router.get('/', getOwnerController)

export default router
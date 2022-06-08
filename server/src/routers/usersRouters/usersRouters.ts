import express from 'express'
import { getUsersController } from './getUsersController'

const router = express.Router()

router.get('/', getUsersController)

export default router
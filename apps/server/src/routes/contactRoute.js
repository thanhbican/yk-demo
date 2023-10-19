import express from 'express'
import { body } from 'express-validator'

import {
  deleteContact,
  getContact,
  getContacts,
  postContact,
  readContact,
} from '../controllers/contactController.js'
import { requireAuth } from '../middlewares/requireAuth.js'

const router = express.Router()

router.get('/admin/contacts', requireAuth, getContacts)
router.get('/admin/contact/:contactId', requireAuth, getContact)
router.delete('/admin/contact/:contactId', requireAuth, deleteContact)
router.patch('/admin/contact/:contactId/read', requireAuth, readContact)

router.post(
  '/contact',
  [
    body('name').notEmpty().withMessage('name must be not empty'),
    body('email').notEmpty().withMessage('email must be not empty'),
    body('phone').notEmpty().withMessage('phone must be not empty'),
    body('message').notEmpty().withMessage('message must be not empty'),
  ],
  postContact
)

export default router

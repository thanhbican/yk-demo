import { NotFoundError } from '../errors/notFoundError.js'
import { sendContactEmail } from '../middlewares/sendEmail.js'
import Contact from '../models/Contact.js'

const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })

  res.status(200).send(contacts)
}

const getContact = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    throw new NotFoundError('Contact not found')
  }

  res.status(200).send(contact)
}

const postContact = async (req, res) => {
  const contact = await Contact.create(req.body)

  sendContactEmail(contact)
  res.status(200).send(contact)
}

const readContact = async (req, res) => {
  const { contactId } = req.params
  const existingContact = await Contact.findById(contactId)
  if (!existingContact) {
    throw new NotFoundError('Contact not found')
  }

  await existingContact.updateOne({ isRead: true })

  res.status(200).send({})
}

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const existingContact = await Contact.findById(contactId)
  if (!existingContact) {
    throw new NotFoundError('Contact not found')
  }

  await existingContact.deleteOne()
  res.status(200).send({})
}

export { getContacts, getContact, postContact, readContact, deleteContact }

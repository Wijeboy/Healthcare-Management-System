import prisma from '../../config/prisma.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    });
    res.status(201).json({ success: true, message: 'Message sent successfully', data: contactMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: req.params.id }
    });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await prisma.contactMessage.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

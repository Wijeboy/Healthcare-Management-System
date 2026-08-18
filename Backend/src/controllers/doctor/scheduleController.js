import prisma from '../../config/prisma.js';

const VALID_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const VALID_STATUSES = ['Available', 'Booked', 'Blocked'];

// GET /api/doctor/:doctorId/availability
// Returns the doctor's sparse override map: { "Monday-8": "Booked", ... }
// Any slot not listed is implicitly "Available".
export const getAvailability = async (req, res) => {
  try {
    const overrides = await prisma.availability.findMany({
      where: { doctorId: req.params.doctorId },
    });

    const overrideMap = {};
    overrides.forEach((o) => { overrideMap[`${o.day}-${o.hour}`] = o.status; });

    res.json({ overrides: overrideMap });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctor/:doctorId/availability/slots?day=Monday
// Returns just the open ("Available") hours for a given day — used when
// booking a new appointment.
export const getAvailableSlots = async (req, res) => {
  try {
    const { day } = req.query;
    if (!day || !VALID_DAYS.includes(day)) {
      return res.status(400).json({ error: "Query param 'day' is required and must be a valid weekday name." });
    }

    const overrides = await prisma.availability.findMany({
      where: { doctorId: req.params.doctorId, day },
    });
    const takenHours = new Set(overrides.filter((o) => o.status !== 'Available').map((o) => o.hour));

    const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16];
    const availableHours = HOURS.filter((h) => !takenHours.has(h));

    res.json({ day, availableHours });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/doctor/:doctorId/availability   Body: { day, hour, status }
// Creates (or overwrites) the override for one slot.
export const createSchedule = async (req, res) => {
  try {
    const { day, hour, status = 'Blocked' } = req.body;
    const hourNum = Number(hour);

    if (!VALID_DAYS.includes(day)) return res.status(400).json({ error: `Invalid day: ${day}` });
    if (Number.isNaN(hourNum)) return res.status(400).json({ error: `Invalid hour: ${hour}` });
    if (!VALID_STATUSES.includes(status)) return res.status(400).json({ error: `Invalid status: ${status}` });

    const slot = await prisma.availability.upsert({
      where: { doctorId_day_hour: { doctorId: req.params.doctorId, day, hour: hourNum } },
      update: { status },
      create: { doctorId: req.params.doctorId, day, hour: hourNum, status },
    });

    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/doctor/:doctorId/availability/:slotId   Body: { status }
export const updateSchedule = async (req, res) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status: ${status}` });
    }

    const slot = await prisma.availability.findUnique({ where: { id: req.params.slotId } });
    if (!slot || slot.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }

    const updated = await prisma.availability.update({
      where: { id: req.params.slotId },
      data: { status },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/doctor/:doctorId/availability/:slotId
// Removing the override row resets that slot back to the default "Available" state.
export const deleteSchedule = async (req, res) => {
  try {
    const slot = await prisma.availability.findUnique({ where: { id: req.params.slotId } });
    if (!slot || slot.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Availability slot not found' });
    }

    await prisma.availability.delete({ where: { id: req.params.slotId } });
    res.json({ message: 'Slot reset to Available' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

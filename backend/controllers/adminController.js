const TutorAvailability = require('../models/TutorAvailability');
const Slot = require('../models/Slot');
const generateSlots = require('../services/slotService');

// GET /api/admin/availability/pending
exports.getPendingAvailabilities = async (req, res) => {
  try {
    const pending = await TutorAvailability.find({ isApproved: false }).populate('tutorId');
    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching pending availabilities' });
  }
};

// PATCH /api/admin/availability/:availabilityId/approve
exports.approveAvailability = async (req, res) => {
  try {
    const { availabilityId } = req.params;
    const availability = await TutorAvailability.findById(availabilityId);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found' });
    }

    if (availability.isApproved) {
      return res.status(400).json({ message: 'Availability already approved' });
    }

    availability.isApproved = true;
    await availability.save();

    const slots = generateSlots(availability);
    await Slot.insertMany(slots);

    res.status(200).json({ message: 'Availability approved and slots generated', slotsCount: slots.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
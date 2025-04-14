const TutorAvailability = require('../models/TutorAvailability');
const User = require('../models/User');
const Slot = require('../models/Slot');

// POST /api/tutors/:tutorId/availability
// exports.createAvailability = async (req, res) => {
//   try {
//     const { weeklySchedule } = req.body;
//     const tutorId = req.params.tutorId;

//     const existing = await TutorAvailability.findOne({ tutorId });
//     if (existing) return res.status(400).json({ message: 'Availability already exists.' });

//     const newAvailability = new TutorAvailability({ tutorId, weeklySchedule });
//     await newAvailability.save();

//     res.status(201).json(newAvailability);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.createAvailability = async (req, res) => {
  try {
    const { weeklySchedule } = req.body;
    const tutorId = req.params.tutorId;

    console.log("Received tutorId:", tutorId);
    console.log("Received weeklySchedule:", JSON.stringify(weeklySchedule, null, 2));

    const existing = await TutorAvailability.findOne({ tutorId });
    if (existing) {
      return res.status(400).json({ message: 'This tutor already has availability. Please delete it first.' });
    }
    if (existing) {
      console.log("Existing availability found:", existing);
    }

    const newAvailability = new TutorAvailability({ tutorId, weeklySchedule });
    await newAvailability.save();

    res.status(201).json(newAvailability);
  } catch (err) {
    console.error("❌ Server error in createAvailability:", err);
    res.status(500).json({ error: err.message });
  }
};


// DELETE /api/tutors/:tutorId/availability
exports.deleteAvailability = async (req, res) => {
    try {
      const tutorId = req.params.tutorId;
  
      // 1. Delete availability
      const deletedAvailability = await TutorAvailability.findOneAndDelete({ tutorId });
      if (!deletedAvailability) {
        return res.status(404).json({ message: 'Availability not found for this tutor' });
      }
  
      // 2. Delete all slots tied to that tutor
      const deleteResult = await Slot.deleteMany({ tutorId });
  
      res.status(200).json({
        message: 'Availability and related slots deleted successfully',
        deletedSlotsCount: deleteResult.deletedCount
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during deletion' });
    }
};

// GET /api/tutors/:tutorId/availability (can be used for filter)
exports.getAvailabilityByTutor = async (req, res) => {
  try {
    const availability = await TutorAvailability.findOne({ tutorId: req.params.tutorId });
    if (!availability) return res.status(404).json({ message: 'Not found.' });
    res.json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/tutors
exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: 'Tutor' });
    res.json(tutors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tutors' });
  }
};

// GET /api/tutors/:tutorId
exports.getTutorById = async (req, res) => {
  try {
    const tutor = await User.findOne({ _id: req.params.tutorId, role: 'Tutor' });
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json(tutor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tutor' });
  }
};

// PATCH /api/tutors/:tutorId
exports.updateTutor = async (req, res) => {
  try {
    const updates = req.body;
    const tutor = await User.findOneAndUpdate(
      { _id: req.params.tutorId, role: 'Tutor' },
      updates,
      { new: true }
    );

    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json({ message: 'Tutor updated', tutor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating tutor' });
  }
};

// DELETE /api/tutors/:tutorId
exports.deleteTutor = async (req, res) => {
  try {
    const tutor = await User.findOneAndDelete({ _id: req.params.tutorId, role: 'Tutor' });
    if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
    res.json({ message: 'Tutor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting tutor' });
  }
};

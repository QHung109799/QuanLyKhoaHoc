const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// GET /api/grades/my - Điểm của tôi (student)
router.get('/my', authenticate, gradeController.getMyGrades);

// GET /api/grades/assignment/:assignmentId - Điểm theo bài tập (teacher)
router.get('/assignment/:assignmentId', authenticate, authorize('teacher', 'admin'), gradeController.getByAssignment);

// PUT /api/grades/:id - Chấm điểm (teacher)
router.put('/:id', authenticate, authorize('teacher', 'admin'), gradeController.gradeSubmission);

module.exports = router;
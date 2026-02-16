const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, endorseSkill, updateTheme } = require('../controllers/profileController');

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/skills/:skillName/endorse', endorseSkill);
router.put('/theme', updateTheme);

module.exports = router;

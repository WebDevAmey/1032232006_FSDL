const router = require('express').Router();
const c = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
router.post('/', protect, c.place);
router.get('/my', protect, c.getMine);
router.patch('/:id/status', protect, c.updateStatus);
module.exports = router;

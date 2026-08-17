import express from 'express';
import { getSettings, updateSettings, getConfig } from '../../controllers/admin/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.get('/config', getConfig);

export default router;

import express from 'express';
import { addLink } from '../controllers/link/addLinkController.js';

const linkRouters = express.Router();

linkRouters.post('/addLink', addLink);

export default linkRouters;

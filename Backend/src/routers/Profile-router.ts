import express from 'express';
import { updateProfile } from '../controller/Profile/UpdateProfile';
import { getProfile } from '../controller/Profile/GetProfile';
import { createProfile } from '../controller/Profile/CreateProfile';
import { Authorization } from '../MiddleWare/Authorization';

export const profileRouter = express.Router();

profileRouter.post('/', createProfile);
profileRouter.get('/:id', Authorization, getProfile);
profileRouter.put('/', Authorization, updateProfile); 
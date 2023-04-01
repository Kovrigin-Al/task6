import { Request, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import Joi from "joi";
import sanitize from 'validator';


export const userSchema = Joi.object({
  name: Joi.string().required(),
});
export const messageSchema = Joi.object({
  content: {
    title: Joi.string().required(),
    message: Joi.string().required()
  },
  to: Joi.string().required()
});


import Joi from 'joi';

const schema = Joi.object().keys({
  firstname: Joi.string()
    .trim()
    .required()
    .error(new Error('First name is required')),
  lastname: Joi.string()
    .trim()
    .required()
    .error(new Error('Last name is required')),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .error(new Error('Valid email is required')),
  password: Joi.string()
    .min(7)
    .required()
    .error(new Error('Password must be at least 7 characters long')),
  password1: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .error(new Error('Passwords do not match'))
});

export default schema;

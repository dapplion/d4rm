const Joi = require("joi");

const submitSchema = Joi.object({
  id: Joi.string().allow(""),
  to: Joi.string()
    .valid("smartContract")
    .required(),
  network: Joi.string().required(),
  address: Joi.string().required()
});

export default function isSubmitValid(submit) {
  const result = Joi.validate(submit, submitSchema.required());
  return !result.error;
}

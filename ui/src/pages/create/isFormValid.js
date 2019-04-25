const Joi = require("joi");

const formSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string()
    .allow("")
    .required(),
  questions: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        options: Joi.array()
          .items(
            Joi.string()
              .allow("")
              .required()
          )
          .required()
      }).required()
    )
    .required()
});

export default function isFormValid(form) {
  const result = Joi.validate(form, formSchema.required());
  return !result.error;
}

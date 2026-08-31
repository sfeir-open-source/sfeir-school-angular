import { WritableSignal } from '@angular/core';
import { apply, FieldContext, FieldTree, form, minLength, pattern, required, schema, validate } from '@angular/forms/signals';
import { UpsertPersonBody } from '@sfeir/types';

const SFEIR_EMAIL_PATTERN = /^\w+\.\w@sfeir.com$/;

const sfeirEmailValidator = (field: FieldContext<string>) => {
  const value = field.value();
  if (!value) return null;
  return SFEIR_EMAIL_PATTERN.test(value) ? null : { kind: 'sfeirEmail', message: 'Invalid SFEIR email' };
};

const nameSchema = schema<string>(path => {
  required(path, { message: 'Field is required' });
  minLength(path, 2, { message: 'Field must be at least 2 characters long' });
});

export const createPersonForm = (model: WritableSignal<UpsertPersonBody>, callback: (field: FieldTree<UpsertPersonBody>) => void | Promise<void>) => {
  return form(
    model,
    path => {
      apply(path.firstname, nameSchema);
      apply(path.lastname, nameSchema);
      required(path.email, { message: 'Field is required' });
      validate(path.email, sfeirEmailValidator);
      pattern(path.phone, /^\d{10}$/, { message: 'Field must be a 10 digit number' });
      required(path.phone, { message: 'Field is required' });
    },
    {
      submission: {
        action: async field => {
          return callback(field);
        },
      },
    },
  );
};

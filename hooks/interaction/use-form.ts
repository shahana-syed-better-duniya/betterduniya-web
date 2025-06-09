// useForm.ts
import { useState, useEffect } from "react";

type Validator<T> = (values: T) => Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>({
                                                         initialValues,
                                                         validate,
                                                       }: {
  initialValues: T;
  validate: Validator<T>;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  useEffect(() => {
    setErrors(validate(values));
  }, [values, validate]);

  const handleChange = (field: keyof T) => (value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    isValid,
    setValues,
    setErrors,
  };
}

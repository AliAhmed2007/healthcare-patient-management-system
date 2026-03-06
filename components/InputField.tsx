"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { ZodE164 } from "zod";

export enum FieldTypesEnum {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface InputFieldProps {
  formControl: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FieldTypesEnum;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: InputFieldProps;
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch (fieldType) {
    case FieldTypesEnum.INPUT:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <Input
            {...field}
            id={props.name}
            placeholder={props.placeholder}
            className="shad-input border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      );
    case FieldTypesEnum.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="EG"
          placeholder={placeholder}
          international
          countryCallingCodeEditable
          value={field.value}
          onChange={field.onChange}
          className="input-phone"
        />
      );
    default:
      return null;
  }
};

function InputField(props: InputFieldProps) {
  const { formControl, label, name } = props;

  return (
    <Controller
      name={name}
      control={formControl}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex-1">
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <RenderField field={field} props={props} />
          {fieldState.invalid && <FieldError className="text-red-800" errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default InputField;

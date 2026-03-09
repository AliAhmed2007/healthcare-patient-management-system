"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

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
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
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
    case FieldTypesEnum.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          className="shad-textArea"
          disabled={props.disabled}
        />
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
    case FieldTypesEnum.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="Calender"
            className="ml-2"
          />
          <DatePicker
            selected={field.value}
            onChange={(date: any) => field.onChange(date)}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel="Time:"
            wrapperClassName="date-picker"
            placeholderText="MM/DD/YYYY"
          />
        </div>
      );
    case FieldTypesEnum.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="shad-select-trigger">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {props.children}
          </SelectContent>
        </Select>
      );
    case FieldTypesEnum.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <Label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </Label>
        </div>
      );
    case FieldTypesEnum.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    default:
      return null;
  }
};

function InputField(props: InputFieldProps) {
  const { formControl, label, name, fieldType } = props;

  return (
    <Controller
      name={name}
      control={formControl}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex-1">
          {fieldType !== FieldTypesEnum.CHECKBOX && (
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
          )}
          <RenderField field={field} props={props} />
          {fieldState.invalid && (
            <FieldError className="text-red-700" errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}

export default InputField;

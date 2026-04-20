import { ErrorMessage } from "@hookform/error-message";
import {
  Children,
  cloneElement,
  type FC,
  isValidElement,
  memo,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "~/utils/utils";

export type IFormItem = {
  name: string;
  label?: string | ReactNode;
  labelClassName?: string;
  required?: boolean;
  labelTooltip?: ReactNode;
  helpText?: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
  showError?: boolean;
  errorClassName?: string;
};

const FormItem: FC<PropsWithChildren<IFormItem>> = ({
  name,
  label,
  labelClassName,
  required,
  labelTooltip,
  helpText,
  description,
  containerClassName,
  showError = true,
  errorClassName,
  children,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={cn(
        "form-item",
        {
          "has-error": errors?.[name],
        },
        containerClassName
      )}
    >
      {label && (
        <div
          className={cn(
            "mb-3 text-sm font-medium text-gray-700",
            labelClassName
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
          {labelTooltip && <span className="ml-2">{labelTooltip}</span>}
        </div>
      )}

      {description && (
        <div
          className={cn(
            "form-item__description mb-2 text-sm text-gray-500",
            labelClassName
          )}
        >
          {description}
        </div>
      )}

      {Children.map(children, child => {
        if (isValidElement(child)) {
          // Element is HTML
          if (typeof child?.type === "string") return child;

          // Element is React Element
          return (
            <Controller
              name={name}
              control={control}
              render={({ field }) =>
                cloneElement<any>(child, {
                  field,
                  ...props,
                })
              }
            />
          );
        }
        return null;
      })}

      {showError && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className={cn(" mt-1 text-sm text-red-600", errorClassName)}>
              {message}
            </div>
          )}
        />
      )}

      {helpText && <div className="mt-1 text-sm text-gray-500">{helpText}</div>}
    </div>
  );
};

export default memo(FormItem);

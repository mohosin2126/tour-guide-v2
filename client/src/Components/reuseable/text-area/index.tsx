import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ReusableTextareaProps {
  label?: string;
  name: string;
  defaultValue?: string;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  register: UseFormRegister<Record<string, unknown>>;
  required?: boolean;
  errors?: FieldErrors;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function ReusableTextarea({
  label = "",
  name,
  defaultValue = "",
  disabled = false,
  placeholder,
  register,
  required = true,
  errors,
  value,
  onChange,
  className,
}: ReusableTextareaProps) {
  return (
    <div className="w-full">
      <label className="text-base font-normal text-foreground">{label}</label>
      <textarea
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        rows={5}
        className={`mt-2 w-full rounded border-[1px] border-border bg-transparent px-3 py-2 text-base font-normal text-muted-foreground outline-none transition-all duration-500 ease-in-out focus:border-primary focus:shadow-xl focus:ring-[.5px] ${className} ${
          errors && errors[name] ? "border-red-600" : "focus:ring-[1px]"
        }`}
        {...register(name, { required, onChange })}
      />
      <p className="mt-[2px] text-start capitalize text-red-500">
        {errors && errors[name] && (
          <span>{label || name || "This field"} is required</span>
        )}
      </p>
    </div>
  );
}

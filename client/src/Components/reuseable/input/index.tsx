import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface ReusableInputProps {
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  colorClass?: string;
}

export default function ReusableInput({
  label = "",
  name,
  defaultValue = "",
  type = "text",
  disabled = false,
  placeholder,
  register,
  required = true,
  errors,
  value,
  onChange,
  colorClass,
}: ReusableInputProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-start text-base font-normal">{label}</label>
      <input
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        className={`w-full rounded border border-border bg-transparent px-3 py-2 text-base font-normal text-foreground outline-none transition-all duration-500 ease-in-out focus:border-primary focus:shadow-xl focus:ring-[.5px] ${colorClass} ${
          errors && errors[name] ? "border-red-600" : "focus:ring-[1px]"
        }`}
        {...register(name, { required, onChange })}
      />
      <div className="relative mt-1 flex items-center justify-end text-start text-base font-normal capitalize text-red-500">
        {errors && errors[name] && (
          <span>
            {label || name || "this"} is required
            <span>
              <img
                className="absolute -top-8 right-5 h-5 w-5"
                src="https://i.postimg.cc/rwxT9jXz/exclamation-mark.webp"
                alt="error"
              />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

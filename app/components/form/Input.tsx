import { useField } from "remix-validated-form";

interface InputProps {
  name: string;
  label: string;
  type: "text" | "password"
  placeholder?: string
  className?: string
  required?: boolean
};

const Input = ({ name, label, type, placeholder, className, required }: InputProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <div aria-label="form-row" className={className}>
      <label className="mb-1 block" htmlFor={name}>
        {label}
        {required && (
          <span className="text-red-600 pl-1 font-bold">*</span>
        )}
      </label>
      <input
        className={`w-full ${error ? "border-red-600" : ""}`}
        type={type}
        id={name}
        name={name}
        onBlur={validate}
        onChange={clearError}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
      />
      {error && <div aria-label="form-field-error" className="text-red-600 font-medium mt-1">{error}</div>}
    </div>
  );
};

export default Input
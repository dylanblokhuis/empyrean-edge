import { useField } from "remix-validated-form";

interface InputProps {
  name: string;
  label: string;
  type: "text" | "password"
};

const Input = ({ name, label, type }: InputProps) => {
  const { validate, clearError, defaultValue, error } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        onBlur={validate}
        onChange={clearError}
        defaultValue={defaultValue}
      />
      {error && <span className="my-error-class">{error}</span>}
    </div>
  );
};

export default Input
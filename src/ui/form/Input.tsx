

type Props = {
  label: string;
  type: string;
  value: string | null;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const Input = ({ label, type, value, onChange, disabled, error }: Props) => (
  <label className="flex flex-col space-x-4">
    <div className="mb-2">
      <span>{label}</span>
      {error && <span className="text-red-500">{error}</span>}
    </div>
    <input
      className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 text-black"
      type={type}
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    />
  </label>
);

export default Input;

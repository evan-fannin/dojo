
type Base = {
  label: string;
  disabled?: boolean;
  cta?: true;
};

type SubmitButton = {
  submit: true;
} & Base;

type Button = {
  onClick: () => void;
  confirmation?: string;
} & Base;

type Props = SubmitButton | Button;

const Button = ({ label, disabled, cta, ...rest }: Props) => (
  <button
    disabled={disabled}
    type={"submit" in rest ? "submit" : "button"}
    onClick={
      "onClick" in rest
        ? () => {
            if ("confirmation" in rest) {
              if (window.confirm(rest.confirmation)) {
                rest.onClick();
              }
            } else {
              rest.onClick();
            }
          }
        : undefined
    }
    className={`px-4 py-2 rounded-full focus:outline-none ${
      cta ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {label}
  </button>
);

export default Button;

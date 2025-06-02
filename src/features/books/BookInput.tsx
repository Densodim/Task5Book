import type { ChangeEvent, InputHTMLAttributes } from "react";

export default function BookInput({
  onChange,
  value,
  type,
  placeholder,
  className,
  text,
  props,
}: Props) {
  return (
    <>
      <div className="col">
        <div>{text}</div>
        <input
          type={type}
          className={className}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        ></input>
      </div>
    </>
  );
}

type Props = {
  value: number | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: "number" | "text" | "range";
  text: string;
  className: string;
  placeholder?: string;
  props?: Partial<InputHTMLAttributes<HTMLInputElement>>;
};

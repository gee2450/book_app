type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function AuthorInput({
  value,
  placeholder = "책 저자를 입력해 주세요",
  onChange,
  className = "",
}: Props) {
  return (
    <input
      name="author"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={[
        "w-full",
        "text-base",
        "text-[#3B2A1A] placeholder:text-[#3B2A1A]/60",
        "bg-transparent",
        "outline-none",
        "border border-black/40 rounded",
        "py-1 px-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      ].join(" ")}
    />
  );
}

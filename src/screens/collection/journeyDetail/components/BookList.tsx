import type { FC } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const BookList: FC<Props> = ({ children, className }) => {
  return (
    <div className={`w-full px-4 py-2 rounded-t-sm rounded-b-xl border bg-[#F5E1DF90] border-[#9A7F76] shadow-[#9A7F76] shadow-2xs ${className || ''}`} >
      <div className="w-full flex flex-col divide-y divide-dashed divide-[#9A7F76]">
        {children}
      </div>
    </div>
  );
};

export default BookList;

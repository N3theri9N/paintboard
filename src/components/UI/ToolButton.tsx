import { MouseEventHandler } from "react";
import clsx from "clsx";

const ToolButton = ({
  children,
  active = false,
  onClick = () => {},
}: Readonly<{
  children: React.ReactNode;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}>): JSX.Element => {
  return (
    <div
      className={clsx("w-10 h-10 py-2 border-2 shadow-2xl cursor-pointer rounded-lg", {
        "border-black": active,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ToolButton;

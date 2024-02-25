import clsx from "clsx";

const ToolButton = ({
  children,
  active = false,
  onClick = () => {},
}: Readonly<{
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}>): JSX.Element => {
  return (
    <div
      className={clsx(
        "w-10 h-10 py-2 border-2 text-[12px] text-center shadow-2xl leading-[12px] cursor-pointer font-bold toolButton",
        {
          "border-black": active,
        }
      )}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </div>
  );
};

export default ToolButton;

import clsx from "clsx";

const ICON_BTN_SIZES = {
  small: "p-2",
  large: "p-4",
  medium: "p-3",
};

const IconButton = ({ children, size = "medium", ...restProps }) => (
  <div
    {...restProps}
    className={clsx(
      "bg-transparent hover:bg-[rgba(0,0,0,0.05)] rounded-[50%] transition-all duration-[650]",
      ICON_BTN_SIZES[size]
    )}
  >
    {children}
  </div>
);

export default IconButton;

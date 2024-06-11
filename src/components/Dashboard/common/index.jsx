import { RxCheckCircled, RxCircleBackslash, RxShadow } from "react-icons/rx";

const iconProps = {
  size: 20,
  color: "#fff",
};

export const iconMap = {
  ON: <RxCheckCircled {...iconProps} />,
  OFF: <RxCircleBackslash {...iconProps} />,
  UNKNOWN: <RxShadow {...iconProps} className="animate-spin" />,
};

export const avatarColorMap = {
  ON: "bg-[#4CAF50]",
  OFF: "bg-[#f44335]",
  UNKNOWN: "bg-[#FB8C00]",
};

export const textColorMap = {
  ON: "text-[#4CAF50]",
  OFF: "text-[#f44335]",
  UNKNOWN: "text-[#FB8C00]",
};

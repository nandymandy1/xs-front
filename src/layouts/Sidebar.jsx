import { Menu, Typography } from "antd";
import {
  RxChatBubble,
  RxDashboard,
  RxGear,
  RxLaptop,
  RxPieChart,
  RxRocket,
} from "react-icons/rx";
import { GoDatabase } from "react-icons/go";

import { TbInfoCircle } from "react-icons/tb";

import { RiInfinityLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  return (
    <div className="px-3 pt-3 flex flex-col items-center justify-between border-solid border-[3px] border-[#F2F4F4] rounded-lg">
      <TbInfoCircle
        size={34}
        color="#F2F4F4"
        fontWeight="regular"
        className="mb-[-25px]"
      />
      <RiInfinityLine color="#F2F4F4" fontWeight="regular" size={60} />
    </div>
  );
};

const items = [
  {
    key: "dashboard",
    icon: <RxDashboard size={24} />,
    label: <Typography.Text className="text-white">Dashboard</Typography.Text>,
  },
  {
    key: "quick-actions",
    icon: <RxRocket size={24} />,
    label: (
      <Typography.Text className="text-white">Quick Actions</Typography.Text>
    ),
    children: [
      {
        key: "5",
        icon: <RxLaptop size={20} />,
        label: (
          <Typography.Text className="text-white">Action 1</Typography.Text>
        ),
      },
      {
        key: "6",
        label: (
          <Typography.Text className="text-white">Action 2</Typography.Text>
        ),
      },
      {
        key: "7",
        label: (
          <Typography.Text className="text-white">Action 3</Typography.Text>
        ),
      },
      {
        key: "8",
        label: (
          <Typography.Text className="text-white">Action 4</Typography.Text>
        ),
      },
    ],
  },
  {
    key: "devices",
    icon: <RxLaptop size={24} />,
    label: <Typography.Text className="text-white">Devices</Typography.Text>,
  },
  {
    key: "backup",
    icon: <GoDatabase size={24} />,
    label: <Typography.Text className="text-white">Backup</Typography.Text>,
  },
  {
    key: "settings",
    icon: <RxGear size={24} />,
    label: <Typography.Text className="text-white">Settings</Typography.Text>,
  },
  {
    key: "notifications",
    label: (
      <Typography.Text className="text-white">Notifications</Typography.Text>
    ),
    icon: <RxChatBubble size={24} />,
    children: [
      {
        key: "updates",
        label: (
          <Typography.Text className="text-white">Updates</Typography.Text>
        ),
      },
      {
        key: "errors",
        label: (
          <Typography.Text className="text-white">
            Device Panics
          </Typography.Text>
        ),
      },
    ],
  },
];

const RESPONSE_HANDLER = ({ navigate }) => ({
  dashboard: () => navigate("/dashboard"),
});

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSidebarNavigator = ({ key }) =>
    RESPONSE_HANDLER({ navigate })[key]?.();

  return (
    <aside className="h-[100vh]">
      <div className="h-full w-full bg-custom-gradient shadow-md flex flex-col justify-between">
        <div className="w-full">
          <div className="w-full flex flex-col justify-center items-center my-5">
            <Logo />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            defaultOpenKeys={["sub1"]}
            defaultSelectedKeys={["1"]}
            onClick={handleSidebarNavigator}
          />
        </div>
        <div className="w-full"></div>
      </div>
    </aside>
  );
};

export default Sidebar;

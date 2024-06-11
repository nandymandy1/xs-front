import AddDeviceService from "@components/Dashboard/AddDeviceService";
import DeviceServices from "@components/Dashboard/DeviceServices";
import { Typography } from "antd";

const Device = () => {
  return (
    <div className="w-full">
      <Typography.Title level={2}>Device</Typography.Title>
      <div className="w-full bg-white rounded-md p-4 shadow-md">
        <AddDeviceService />
        <DeviceServices />
      </div>
    </div>
  );
};

export default Device;

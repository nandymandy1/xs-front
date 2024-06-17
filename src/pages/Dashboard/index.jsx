import AddDevice from "@components/Dashboard/AddDevice";
import Devices from "@components/Dashboard/Devices";
import DeviceStats from "@components/Dashboard/DeviceStats";
import { Typography } from "antd";

const Dashboard = () => {
  return (
    <section className="flex flex-col gap-5">
      {/* <article className="flex flex-col gap-3">
        <Typography.Title level={2}>Dashboard</Typography.Title>
        <DeviceStats />
      </article> */}
      <article className="flex flex-col gap-3">
        <Typography.Title level={2}>Your Devices</Typography.Title>
        <div className="bg-white w-full rounded-md shadow-md p-5 flex flex-col gap-3">
          <AddDevice />
          <Devices />
        </div>
      </article>
    </section>
  );
};

export default Dashboard;

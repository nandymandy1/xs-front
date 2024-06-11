import { useQuery } from "@apollo/client";
import { GET_ALL_USER_DEVICES } from "@graphql/Device";
import { SplitWords } from "@utils/textFormatter";
import { Avatar, Button, Table, Tag, Tooltip, Typography } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { avatarColorMap, iconMap, textColorMap } from "../common";

const columns = [
  {
    title: "Name",
    key: "deviceName",
    dataIndex: "deviceName",
    render: (value) => (
      <div className="flex items-center gap-3">
        <div>
          <Avatar size="large" className="bg-[#f56a00]">
            {SplitWords(value)}
          </Avatar>
        </div>
        <Typography.Text className="text-[14px] font-bold line-clamp-1">
          {value}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: "IP",
    key: "deviceIp",
    dataIndex: "deviceIp",
    render: (value, { status }) => (
      <Tag
        bordered={false}
        className="font-bold px-2"
        color={{ ON: "success", OFF: "error", UNKNOWN: "warning" }[status]}
      >
        {value}
      </Tag>
    ),
  },
  {
    key: "_id",
    dataIndex: "_id",
    title: "Device Id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (data) => {
      const tooltipMap = {
        UNKNOWN: "Connecting...",
        OFF: "Device is offline",
        ON: "Device is up and running",
      };

      const statusTextMap = {
        ON: "Online",
        OFF: "Offline",
        UNKNOWN: "Connecting...",
      };

      const status = data || "UNKNOWN";

      return (
        <div className="flex items-center gap-3 w-[100px]">
          <Tooltip title={tooltipMap[status]}>
            <div className="flex items-center gap-3">
              <Avatar size="small" className={avatarColorMap[status]}>
                {iconMap[status]}
              </Avatar>
              <Typography.Text
                className={clsx("font-bold", textColorMap[status])}
              >
                {statusTextMap[status]}
              </Typography.Text>
            </div>
          </Tooltip>
        </div>
      );
    },
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action",
    render: (_, { _id, status }) => {
      if (status === "OFF") {
        return <Button disabled>View</Button>;
      }
      return (
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/device/${_id}`}>
            <Button>View</Button>
          </Link>
        </div>
      );
    },
  },
];

const Devices = () => {
  const { loading, error, data } = useQuery(GET_ALL_USER_DEVICES, {
    pollInterval: 10000,
  });

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data?.getAllDevicesOfUser || []}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default Devices;

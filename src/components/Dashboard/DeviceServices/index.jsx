import { useQuery } from "@apollo/client";
import { GET_ALL_SERVICES_OF_DEVICE } from "@graphql/DeviceService";
import { SplitWords } from "@utils/textFormatter";
import { Avatar, Table, Tag, Tooltip, Typography } from "antd";
import clsx from "clsx";
import { useParams } from "react-router-dom";

import { avatarColorMap, iconMap, textColorMap } from "../common";
import DeviceSwitch from "./DeviceSwitch";

const columns = [
  {
    key: "commonName",
    title: "Service Name",
    dataIndex: "commonName",
    render: (value) => (
      <div className="flex items-center gap-3">
        <Avatar size="large" className="bg-[#34495E]">
          {SplitWords(value)}
        </Avatar>
        <Typography.Text className="text-[14px] font-bold">
          {value}
        </Typography.Text>
      </div>
    ),
  },
  {
    key: "service_id",
    title: "Service Id",
    dataIndex: "service_id",
    render: (value, { status }) => (
      <Tag
        bordered={false}
        className="font-bold px-2"
        color={{ ON: "success", OFF: "error", UNKNOWN: "warning" }[status]}
      >
        {value.split("_").join(" ").toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (data) => {
      const tooltipMap = {
        UNKNOWN: "Connecting...",
        OFF: "Device Service is offline",
        ON: "Device Service is up and running",
      };

      const statusTextMap = {
        ON: "On",
        OFF: "Off",
        UNKNOWN: "Unknown",
      };

      const status = data || "UNKNOWN";

      return (
        <div className="flex items-center gap-3 w-[70px]">
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
    key: "switch",
    title: "Switch",
    dataIndex: "switch",
    render: (_, deviceService) => <DeviceSwitch {...deviceService} />,
  },
];

const DeviceServices = () => {
  const { deviceId } = useParams();

  const { loading, error, data } = useQuery(GET_ALL_SERVICES_OF_DEVICE, {
    variables: { deviceId },
    pollInterval: 10000,
  });

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data?.getAllServicesByDeviceId || []}
      pagination={
        data?.getAllServicesByDeviceId.length <= 8 ? false : { pageSize: 8 }
      }
    />
  );
};

export default DeviceServices;

import { useQuery } from "@apollo/client";
import { GET_ALL_SERVICES_OF_DEVICE } from "@graphql/DeviceService";
import { SplitWords } from "@utils/textFormatter";
import { Avatar, Table, Tag, Tooltip, Typography } from "antd";
import clsx from "clsx";
import { useParams } from "react-router-dom";

import { avatarColorMap, iconMap, textColorMap } from "../common";
import DeviceSwitch from "./DeviceSwitch";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import TempratureChart from "../common/TempratuteChart";
import TempChart from "../common/TempratureChart";

const getLast7Entries = (arr = []) => {
  if (arr.length <= 7) return arr;
  return arr.slice(-7);
};

const FixedColumns = [
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
];

const SwitchesColumns = [
  ...FixedColumns,
  {
    key: "switch",
    title: "Switch",
    dataIndex: "switch",
    render: (_, deviceService) => <DeviceSwitch {...deviceService} />,
  },
];

const SensorsColumns = (sensorData) => [
  ...FixedColumns,
  {
    key: "value",
    title: "Value",
    dataIndex: "parsed",
    render: (value) => <div>{value}</div>,
  },
  {
    key: "chart",
    title: "Live Overview",
    dataIndex: "service_id",
    render: (service_id) => <TempChart data={sensorData?.[service_id] || []} />,
  },
];

const DeviceServices = () => {
  const { deviceId } = useParams();
  const [sensorData, setSensorData] = useState({});

  const allDeciveServiceQuery = useQuery(GET_ALL_SERVICES_OF_DEVICE, {
    variables: { deviceId },
    pollInterval: 15000,
  });

  const { loading, data } = allDeciveServiceQuery;

  useEffect(() => {
    if (data?.getAllServicesByDeviceId) {
      setSensorData((prevData) => {
        const newData = { ...prevData };
        data.getAllServicesByDeviceId.forEach((service) => {
          if (service.serviceType === "sensor") {
            if (!newData[service.service_id]) {
              newData[service.service_id] = [];
            }
            newData[service.service_id] = getLast7Entries([
              ...newData[service.service_id],
              {
                time: dayjs(new Date()).format("hh:mm:ss A"),
                value: Number(parseFloat(service.value).toFixed(2)),
              },
            ]);
          }
        });

        return newData;
      });
    }
  }, [data]);

  const switches = useMemo(
    () =>
      data?.getAllServicesByDeviceId.filter(
        (item) => item.serviceType === "switch"
      ) || [],
    [data]
  );

  const sensors = useMemo(
    () =>
      data?.getAllServicesByDeviceId.filter(
        (item) => item.serviceType === "sensor"
      ) || [],
    [data, sensorData]
  );

  return (
    <>
      <Typography.Title level={4}>Switches</Typography.Title>
      <Table
        loading={loading}
        dataSource={switches}
        columns={SwitchesColumns}
        pagination={switches.length <= 8 ? false : { pageSize: 8 }}
      />
      <br />
      <Typography.Title level={4}>Sensors</Typography.Title>
      <Table
        loading={loading}
        dataSource={sensors}
        columns={SensorsColumns(sensorData)}
        pagination={sensors.length <= 8 ? false : { pageSize: 8 }}
      />
    </>
  );
};

export default DeviceServices;

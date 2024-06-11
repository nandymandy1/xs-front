import { useMutation } from "@apollo/client";
import {
  GET_ALL_SERVICES_OF_DEVICE,
  TOGGLE_DEVICE_SERVICE,
} from "@graphql/DeviceService";
import { Switch } from "antd";

const DeviceSwitch = ({ device, service_id, status }) => {
  const [toggleDevice, { loading }] = useMutation(TOGGLE_DEVICE_SERVICE, {
    update: (cache, { data: { relayToggle } }) => {
      if (relayToggle.success) {
        const allDeviceServices = cache.readQuery({
          query: GET_ALL_SERVICES_OF_DEVICE,
          variables: { deviceId: device._id },
        });
        const updatedServices = allDeviceServices.getAllServicesByDeviceId.map(
          (item) => {
            if (item.service_id === service_id) {
              return {
                ...item,
                status: relayToggle.status,
              };
            }
            return item;
          }
        );
        cache.writeQuery({
          query: GET_ALL_SERVICES_OF_DEVICE,
          variables: { deviceId: device._id },
          data: { getAllServicesByDeviceId: [...updatedServices] },
        });
      }
    },
  });

  const updateServiceState = () => {
    toggleDevice({ variables: { deviceId: device?._id, relay: service_id } });
  };

  return (
    <Switch
      disabled={status === "UNKNOWN" || loading}
      loading={loading}
      onChange={updateServiceState}
      value={status === "ON"}
    />
  );
};

export default DeviceSwitch;

import { useMutation } from "@apollo/client";
import {
  ADD_DEVICE_MUTATION,
  GET_ALL_USER_DEVICES,
  TEST_DEVICE_PING,
} from "@graphql/Device";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Switch,
  Typography,
} from "antd";
import { RxPlus } from "react-icons/rx";
import { useToggle } from "usehooks-ts";

const ipRegex =
  /\b((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\b/;

const rules = {
  deviceName: [
    {
      required: true,
      message: "Device Name is required.",
    },
  ],
  deviceIp: [
    {
      required: true,
      message: "Please input device IP address!",
    },
    {
      pattern: ipRegex,
      message: "Please input a valid  device IP (e.g., 192.168.0.102)!",
    },
  ],
  auth: {
    username: [
      {
        required: true,
        message: "Username is required.",
      },
    ],
    password: [
      {
        required: true,
        message: "Password is required.",
      },
    ],
  },
};

const AddDevice = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [isOpen, toggleModal] = useToggle(false);

  const closeModal = () => {
    form.resetFields();
    toggleModal(false);
  };

  const [testMutation, { loading: pingLoading }] = useMutation(
    TEST_DEVICE_PING,
    {
      onCompleted: ({ testDeviceConnection: { message } }) => {
        form.setFieldValue("deviceFound", true);
        notification.success({
          message: (
            <Typography.Text className="text-[#4CAF50]">
              {message}
            </Typography.Text>
          ),
          duration: 2,
          description: "We have found your device.",
        });
      },
      onError: (data) => {
        console.log(data.message);
        notification.error({
          message: (
            <Typography.Text className="text-[#f44335]">
              Device not found
            </Typography.Text>
          ),
          duration: 2,
          description: data?.message || "Unable to find your device.",
        });
        form.setFieldValue("deviceFound", false);
      },
    }
  );

  const [addDevice, { loading: addingDevice }] = useMutation(
    ADD_DEVICE_MUTATION,
    {
      onCompleted: ({ addDevice: { message } }) => {
        form.setFieldValue("deviceFound", true);
        notification.success({
          message: (
            <Typography.Text className="text-[#4CAF50]">
              {message}
            </Typography.Text>
          ),
          duration: 2,
          description: "We have added your device.",
        });
        closeModal();
      },
      onError: (data) => {
        notification.error({
          message: (
            <Typography.Text className="text-[#f44335]">
              Device not added
            </Typography.Text>
          ),
          duration: 2,
          description: data?.message || "Unable to find your device.",
        });
        form.setFieldValue("deviceFound", false);
      },
      update: (cache, { data: { addDevice } }) => {
        if (addDevice.success) {
          const existingDevices = cache.readQuery({
            query: GET_ALL_USER_DEVICES,
          });

          if (existingDevices && addDevice.device) {
            cache.writeQuery({
              query: GET_ALL_USER_DEVICES,
              data: {
                getAllDevicesOfUser: [
                  addDevice.device,
                  ...existingDevices.getAllDevicesOfUser,
                ],
              },
            });
          }
        }
      },
    }
  );

  const handleAddDevice = (values) => {
    addDevice({
      variables: {
        ...values,
        deviceIp: ["http://", values.deviceIp].join(""),
      },
    });
  };

  const pingTest = () => {
    testMutation({
      variables: {
        deviceIp: ["http://", values?.deviceIp].join(""),
        auth: values?.withCredentials ? values?.auth : null,
      },
    });
  };

  return (
    <div className="flex justify-end">
      <Button
        size="large"
        type="primary"
        onClick={toggleModal}
        className="flex gap-2 items-center"
      >
        <RxPlus size={28} fontWeight="bold" />
        Add Device
      </Button>
      <Modal
        centered
        width={580}
        open={isOpen}
        footer={<></>}
        onCancel={closeModal}
        title={<Typography.Title level={3}>Add Device</Typography.Title>}
      >
        <Form
          form={form}
          layout="vertical"
          className="mt-10"
          requiredMark={false}
          disabled={addingDevice}
          onFinish={handleAddDevice}
          initialValues={{ withCredentials: false }}
        >
          <Form.Item
            name="deviceName"
            label="Device Name"
            className="my-10"
            rules={rules.deviceName}
          >
            <Input size="large" placeholder="Device Name" />
          </Form.Item>
          <Form.Item
            name="deviceIp"
            className="my-10"
            label="Device Address"
            rules={rules.deviceIp}
          >
            <Input
              size="large"
              enterButton="Search"
              addonBefore="http://"
              loading={pingLoading}
              placeholder="Device Address"
              // onSearch={pingTest}
            />
          </Form.Item>
          <Form.Item name="deviceFound" hidden valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="withCredentials" valuePropName="checked">
            <Checkbox>Use Credentials</Checkbox>
          </Form.Item>
          {values?.withCredentials && (
            <>
              <Form.Item
                label="Username"
                name={["auth", "username"]}
                rules={rules.auth.username}
              >
                <Input size="large" placeholder="Username" />
              </Form.Item>
              <Form.Item
                label="Password"
                name={["auth", "password"]}
                rules={rules.auth.password}
              >
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>
            </>
          )}
          <Button
            block
            size="large"
            type="primary"
            onClick={pingTest}
            loading={pingLoading}
            disabled={pingLoading || !values?.deviceIp}
          >
            Ping Device
          </Button>
          <Divider />
          <div className="flex flex-col gap-3">
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={addingDevice}
              disabled={!values?.deviceFound}
            >
              Add Device
            </Button>
            <Button block size="large" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDevice;

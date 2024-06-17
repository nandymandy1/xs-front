import {
  Button,
  Form,
  Switch,
  Typography,
  Modal,
  Segmented,
  Input,
  Divider,
  notification,
} from "antd";
import { useToggle } from "usehooks-ts";

import {
  TEST_SERVICE,
  ADD_SERVICE,
  GET_ALL_SERVICES_OF_DEVICE,
} from "@graphql/DeviceService";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const ServiceOpts = [
  { label: "Switch", value: "switch" },
  { label: "Sensor", value: "sensor" },
];

const AddDeviceService = () => {
  const [form] = Form.useForm();
  const { deviceId } = useParams();
  const values = Form.useWatch([], form);
  const [isOpen, toggleModal] = useToggle(false);

  const closeModal = () => {
    form.resetFields();
    toggleModal(false);
  };

  const [testService, { loading: pingLoading }] = useLazyQuery(TEST_SERVICE, {
    onCompleted: (data) => {
      form.setFieldValue("serviceFound", true);
      notification.success({
        message: (
          <Typography.Text className="text-[#4CAF50]">
            Service Found
          </Typography.Text>
        ),
        duration: 2,
        description: data?.testDeviceService?.message || "",
      });
    },
    onError: (data) => {
      notification.error({
        message: (
          <Typography.Text className="text-[#f44335]">
            Service Not Found
          </Typography.Text>
        ),
        duration: 2,
        description: data?.message || "Unable to find service on device.",
      });
      form.setFieldValue("serviceFound", false);
    },
  });

  const [addService, { loading: addingService }] = useMutation(ADD_SERVICE, {
    onCompleted: ({ addDeviceService: { message } }) => {
      form.setFieldValue("serviceFound", true);
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
            Service not added
          </Typography.Text>
        ),
        duration: 2,
        description: data?.message || "Unable to find your service on Device.",
      });
      form.setFieldValue("serviceFound", false);
    },
    update: (cache, { data: { addDeviceService } }) => {
      if (addDeviceService.success) {
        const existingDeviceServices = cache.readQuery({
          query: GET_ALL_SERVICES_OF_DEVICE,
          variables: { deviceId },
        });

        if (existingDeviceServices && addDeviceService.deviceService) {
          cache.writeQuery({
            query: GET_ALL_SERVICES_OF_DEVICE,
            variables: { deviceId },
            data: {
              getAllServicesByDeviceId: [
                addDeviceService.deviceService,
                ...existingDeviceServices.getAllServicesByDeviceId,
              ],
            },
          });
        }
      }
    },
  });

  const pingTest = () => {
    testService({
      variables: {
        deviceId,
        serviceId: values?.serviceId,
        serviceType: values?.serviceType,
      },
    });
  };

  const handleAddDeviceService = (values) => {
    addService({
      variables: {
        ...values,
        deviceId,
      },
    });
  };

  return (
    <>
      <div className="w-full flex items-center justify-end">
        <Button type="primary" size="large" onClick={toggleModal}>
          Add Service
        </Button>
      </div>
      <Modal
        centered
        width={580}
        open={isOpen}
        footer={<></>}
        onCancel={closeModal}
        title={
          <Typography.Title level={4}>Add Device Service</Typography.Title>
        }
      >
        <Form
          form={form}
          layout="vertical"
          disabled={addingService}
          onFinish={handleAddDeviceService}
          initialValues={{ serviceType: "switch" }}
        >
          <Form.Item name="serviceType" className="w-full my-3">
            <Segmented block size="large" options={ServiceOpts} />
          </Form.Item>
          <Form.Item label="Service Id" name="serviceId">
            <Input size="large" placeholder="Service Id" />
          </Form.Item>
          <Form.Item label="Common Name" name="commonName">
            <Input size="large" placeholder="Common Name" />
          </Form.Item>
          <Form.Item name="serviceFound" hidden valuePropName="checked">
            <Switch />
          </Form.Item>
          <Button
            block
            size="large"
            type="primary"
            onClick={pingTest}
            loading={pingLoading}
            disabled={pingLoading && !values?.serviceId}
          >
            Test Service
          </Button>
          <Divider />
          <div className="flex flex-col gap-3">
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={addingService}
              disabled={!values?.serviceFound}
            >
              Add Service
            </Button>
            <Button block size="large" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddDeviceService;

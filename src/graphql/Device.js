import { gql } from "@apollo/client";

export const TEST_DEVICE_PING = gql`
  mutation Mutation($deviceIp: String!, $auth: DeviceAuth) {
    testDeviceConnection(deviceIp: $deviceIp, auth: $auth) {
      success
      message
    }
  }
`;

export const ADD_DEVICE_MUTATION = gql`
  mutation Mutation(
    $deviceIp: String!
    $deviceName: String!
    $withCredentials: Boolean!
    $auth: DeviceAuth
  ) {
    addDevice(
      deviceIp: $deviceIp
      deviceName: $deviceName
      withCredentials: $withCredentials
      auth: $auth
    ) {
      message
      success
      device {
        _id
        user
        status
        isActive
        deviceIp
        deviceName
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_USER_DEVICES = gql`
  query Query {
    getAllDevicesOfUser {
      _id
      user
      isActive
      deviceIp
      deviceName
      createdAt
      updatedAt
      status
    }
  }
`;

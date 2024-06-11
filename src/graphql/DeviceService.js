import { gql } from "@apollo/client";

export const ADD_SERVICE = gql`
  mutation Mutation($serviceId: String!, $commonName: String!, $deviceId: ID!) {
    addDeviceService(
      service_id: $serviceId
      commonName: $commonName
      deviceId: $deviceId
    ) {
      success
      message
      deviceService {
        _id
        commonName
        device {
          _id
        }
        service_id
      }
    }
  }
`;

export const TEST_SERVICE = gql`
  query TestDeviceService($serviceId: String!, $deviceId: ID!) {
    testDeviceService(service_id: $serviceId, deviceId: $deviceId) {
      success
      message
    }
  }
`;

export const GET_ALL_SERVICES_OF_DEVICE = gql`
  query Query($deviceId: ID!) {
    getAllServicesByDeviceId(deviceId: $deviceId) {
      _id
      service_id
      commonName
      createdAt
      status
      device {
        _id
      }
    }
  }
`;

export const TOGGLE_DEVICE_SERVICE = gql`
  mutation Mutation($relay: String!, $deviceId: ID!) {
    relayToggle(relay: $relay, deviceId: $deviceId) {
      status
      deviceId
      success
    }
  }
`;

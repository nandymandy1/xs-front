import { gql } from "@apollo/client";

export const ADD_SERVICE = gql`
  mutation Mutation(
    $serviceId: String!
    $commonName: String!
    $deviceId: ID!
    $serviceType: ServiceType!
  ) {
    addDeviceService(
      service_id: $serviceId
      commonName: $commonName
      deviceId: $deviceId
      serviceType: $serviceType
    ) {
      success
      message
      deviceService {
        _id
        commonName
        service_id
        device {
          _id
        }
      }
    }
  }
`;

export const TEST_SERVICE = gql`
  query TestDeviceService(
    $serviceId: String!
    $deviceId: ID!
    $serviceType: ServiceType!
  ) {
    testDeviceService(
      service_id: $serviceId
      deviceId: $deviceId
      serviceType: $serviceType
    ) {
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
      value
      serviceType
      parsed
      time
      device {
        _id
      }
    }
  }
`;

export const TOGGLE_DEVICE_SERVICE = gql`
  mutation Mutation($relay: String!, $deviceId: ID!) {
    relayToggle(relay: $relay, deviceId: $deviceId) {
      deviceId
      status
      success
    }
  }
`;

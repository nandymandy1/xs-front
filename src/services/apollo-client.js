import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { baseURL } from "@constants/index";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({ uri: `${baseURL}/graphql` });

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : "";
};

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getToken(),
  },
}));

const OperationLink = ({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
};

const createWsLink = (getToken) =>
  new GraphQLWsLink(
    createClient({
      url: "ws://localhost:5003/graphql",
      connectionParams: () => ({
        Authorization: getToken(),
      }),
      lazy: true,
      retryAttempts: Infinity,
    })
  );

const wsLink = createWsLink(getToken);
const splitLink = split(OperationLink, wsLink, authLink.concat(httpLink));

const createApolloClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });

export default createApolloClient;

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@services/apollo-client";
import useAuth from "@store/useAuth";
import { useEffect, useState } from "react";

const Apollo = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const [client, setClient] = useState(createApolloClient());

  useEffect(() => {
    if (loading) return;
    setClient(createApolloClient());
  }, [isLoggedIn, loading]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;

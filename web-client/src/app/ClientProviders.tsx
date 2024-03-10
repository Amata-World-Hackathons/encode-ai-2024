"use client";

import { client } from "@api/graphql";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export const ClientProviders = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

import React, { createContext, useState } from "react";
import { IApp } from "@feature-framework/core";

type AppProviderPropsType = {
  app: IApp;
  children: JSX.Element | JSX.Element[];
};

export const AppContext = createContext<IApp>();

// This context provider is passed to any component requiring the context
export const AppProvider = ({ app, children }: AppProviderPropsType) => {
  const [internalApp] = useState(app);

  return (
    <AppContext.Provider value={internalApp}>{children}</AppContext.Provider>
  );
};

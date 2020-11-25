import { useContext } from "react";
import { IApp, ConfigType } from "@feature-framework/core";
import { AppContext } from "../providers/AppProvider";

export const useApp = <A extends IApp<Record<string, ConfigType>>>(): A => {
  return useContext(AppContext) as A;
};

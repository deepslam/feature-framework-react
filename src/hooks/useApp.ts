import { useContext } from "react";
import { IApp } from "@feature-framework/core";
import { AppContext } from "../providers/AppProvider";

export const useApp = <A extends IApp<any>>(): A => {
  return useContext(AppContext) as A;
};

import React from "react";
import { IApp } from "@feature-framework/core";
declare type AppProviderPropsType = {
    app: IApp;
    children: JSX.Element | JSX.Element[];
};
export declare const AppContext: React.Context<IApp<Record<string, import("@feature-framework/core").ConfigType>>>;
export declare const AppProvider: ({ app, children }: AppProviderPropsType) => JSX.Element;
export {};

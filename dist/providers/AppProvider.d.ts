import React from "react";
import { IApp } from "@feature-framework/core";
declare type AppProviderPropsType = {
    app: IApp<any>;
    children?: JSX.Element | JSX.Element[];
};
export declare const AppContext: React.Context<IApp<any>>;
export declare const AppProvider: ({ app, children }: AppProviderPropsType) => JSX.Element;
export {};

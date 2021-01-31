import React from "react";
import { IApp, AppStandardEventsType } from "@feature-framework/core";
export declare type connectAppEventType = keyof AppStandardEventsType<IApp<any>>;
export declare type connectAppOwnPropsType = Record<string, any>;
export declare function connectApp<P extends Record<string, unknown>, A extends IApp<any>, O extends connectAppOwnPropsType = connectAppOwnPropsType>(callback: (app: A, ownProps?: O) => P, Component: React.ComponentType<P>, events?: connectAppEventType[]): (ownProps: O) => JSX.Element;

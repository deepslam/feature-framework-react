import React from "react";
import { IApp } from "@feature-framework/core";
export declare type withAppProps<A extends IApp> = {
    app: A;
};
export declare type connectAppEventType = "onUpdate" | "onFeatureUpdated";
export declare function connectApp<P extends Record<string, unknown>, A extends IApp>(callback: (app: A) => P, Component: React.ComponentType<P & withAppProps<A>>, events?: connectAppEventType[]): () => JSX.Element;
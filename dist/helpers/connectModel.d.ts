import React from "react";
import { IModel, ModelStandardEventsType } from "@feature-framework/core";
export declare type withModelProps<M extends IModel> = {
    model: M;
};
export declare type connectModelEventType = keyof ModelStandardEventsType<IModel>;
export declare function connectModel<P extends Record<string, unknown>, M extends IModel>(callback: (m: M) => P, Component: React.ComponentType<P>): (model: M) => JSX.Element;

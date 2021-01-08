import React from "react";
import { IModel, ModelStandardEventsType } from "@feature-framework/core";
export declare type withModelProps<M extends IModel> = {
    model: M;
};
export declare type connectModelEventType = keyof ModelStandardEventsType<IModel>;
export declare type connectModelOwnPropsType = Record<string, any>;
export declare function connectModel<P extends Record<string, unknown>, M extends IModel, O extends connectModelOwnPropsType = connectModelOwnPropsType>(callback: (m: M, ownProps?: O) => P & O, Component: React.ComponentType<P & O>, model: M): (ownProps: O) => JSX.Element;

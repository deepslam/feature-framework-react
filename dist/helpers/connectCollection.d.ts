import React from "react";
import { IDataCollection, Model, DataCollectionStandardEventsType } from "@feature-framework/core";
export declare type withCollectionProps<C extends IDataCollection<unknown>> = {
    collection: C;
    onAddItem?: () => void;
};
export declare type connectCollectionEventType = keyof DataCollectionStandardEventsType<IDataCollection<unknown>>;
export declare type connectCollectionOwnPropsType = Record<string, any>;
export declare function connectCollection<P extends Record<string, unknown>, C extends IDataCollection<Model>, O extends connectCollectionOwnPropsType = connectCollectionOwnPropsType>(callback: (c: C, ownProps?: O) => P, Component: React.ComponentType<P>, collection: C): (ownProps: O) => JSX.Element;

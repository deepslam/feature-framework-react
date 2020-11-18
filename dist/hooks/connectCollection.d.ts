import React from "react";
import { IDataCollection, Model, DataCollectionStandardEventsType } from "@feature-framework/core";
export declare type withCollectionProps<C extends IDataCollection<unknown>> = {
    collection: C;
    onAddItem?: () => void;
};
export declare type connectCollectionEventType = keyof DataCollectionStandardEventsType<IDataCollection<unknown>>;
export declare function connectCollection<P extends Record<string, unknown>, C extends IDataCollection<Model>>(callback: (c: C) => P, Component: React.ComponentType<P>): (collection: C) => JSX.Element;

import React from "react";
import { IFeature, FeatureStandardEventsType } from "@feature-framework/core";
export declare type withFeatureProps<F extends IFeature<any, any>> = {
    feature: F;
};
export declare type connectFeatureEventType = keyof FeatureStandardEventsType<IFeature<any, any>>;
export declare function connectFeature<P extends Record<string, unknown>, F extends IFeature<any, any>>(callback: (f: F) => P, Component: React.ComponentType<P>, feature: F): () => JSX.Element;

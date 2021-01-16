import React from "react";
import { IFeature, FeatureStandardEventsType } from "@feature-framework/core";
export declare type withFeatureProps<F extends IFeature<any, any>> = {
    feature: F;
};
export declare type connectFeatureEventType = keyof FeatureStandardEventsType<IFeature<any, any>>;
export declare type connectFeatureOwnPropsType = Record<string, any>;
export declare function connectFeature<P extends Record<string, unknown>, F extends IFeature<any, any>, O extends connectFeatureOwnPropsType = connectFeatureOwnPropsType>(callback: (f: F, ownProps?: O) => P, Component: React.ComponentType<P>, feature: F, events?: connectFeatureEventType[] | string[]): (ownProps: O) => JSX.Element;

import React from "react";
import { IView } from "@feature-framework/core";
export declare type ReactViewType = {
    component: React.ReactElement | React.ReactChild | React.ReactNode;
    props?: unknown;
};
export default class ReactView implements IView<ReactViewType> {
    [key: string]: ReactViewType;
}

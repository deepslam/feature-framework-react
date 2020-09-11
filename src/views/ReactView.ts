import React from "react";
import { View } from "@feature-framework/core";

export type ReactViewType = {
  component: React.ReactElement | React.ReactChild | React.ReactNode;
  props?: unknown;
};

export default class ReactView extends View<ReactViewType> {}

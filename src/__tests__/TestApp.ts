import { Application } from "@feature-framework/core";
import TestFeature from "./TestFeature";

export type TestAppConfigType = {
  title: string;
};

export type TestAppFeaturesType = {
  testFeature: TestFeature;
};

export default class TestApp extends Application<
  TestAppFeaturesType,
  TestAppConfigType
> {}

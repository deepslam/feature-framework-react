import { Application } from "@feature-framework/core";

export type TestAppConfigType = {
  title: string;
};

export type TestAppFeaturesType = {};

export default class TestApp extends Application<
  TestAppFeaturesType,
  TestAppConfigType
  > { }

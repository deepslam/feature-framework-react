import { Application } from "@feature-framework/core";
import TestFeature from "./TestFeature";

export type TestAppType = {
  config: {
    title: string;
  };
  features: {
    testFeature: TestFeature;
  };
};

export default class TestApp extends Application<TestAppType> {}

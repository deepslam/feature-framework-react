import { Feature, IApp } from "@feature-framework/core";

// Feature config type here
type TestFeatureType = {
  config: {
    version: string;
    title?: string;
  };
};

export default class TestFeature extends Feature<TestFeatureType, IApp<any>> {
  name = "TestFeature";

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}

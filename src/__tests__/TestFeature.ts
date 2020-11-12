import { Feature, IFeature, IApp } from "@feature-framework/core";

// Feature config type here
type TestFeatureConfigType = {
  version: string;
};
type TestFeatureFeaturesType = Record<string, IFeature<any, any>>;

export default class TestFeature
  extends Feature<TestFeatureConfigType, IApp, TestFeatureFeaturesType>
  implements IFeature<TestFeatureConfigType, IApp> {
  name = "TestFeature";

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}

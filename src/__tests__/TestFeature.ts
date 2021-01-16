import { Feature, IApp, IEvent, Event } from "@feature-framework/core";

// Feature config type here
type TestFeatureType = {
  config: {
    version: string;
    title?: string;
  };
  events: {
    onCustomUpdate: IEvent<any>;
  };
};

export default class TestFeature extends Feature<TestFeatureType, IApp<any>> {
  name = "TestFeature";

  events = {
    onCustomUpdate: new Event(),
  };

  initFeature() {
    return new Promise((resolve) => resolve(true)) as Promise<boolean>;
  }
}

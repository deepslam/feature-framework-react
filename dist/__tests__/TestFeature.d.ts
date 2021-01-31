import { Feature, IApp, IEvent, Event } from "@feature-framework/core";
declare type TestFeatureType = {
    config: {
        version: string;
        title?: string;
    };
    data: {
        name: string;
    };
    events: {
        onCustomUpdate: IEvent<any>;
    };
};
export default class TestFeature extends Feature<TestFeatureType, IApp<any>> {
    name: string;
    events: {
        onCustomUpdate: Event<unknown>;
    };
    initFeature(): Promise<boolean>;
}
export {};

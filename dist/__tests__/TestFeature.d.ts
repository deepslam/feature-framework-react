import { Feature, IApp } from "@feature-framework/core";
declare type TestFeatureType = {
    config: {
        version: string;
        title?: string;
    };
};
export default class TestFeature extends Feature<TestFeatureType, IApp<any>> {
    name: string;
    initFeature(): Promise<boolean>;
}
export {};

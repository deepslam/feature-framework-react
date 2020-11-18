import { Feature, IFeature, IApp } from "@feature-framework/core";
declare type TestFeatureConfigType = {
    version: string;
};
declare type TestFeatureFeaturesType = Record<string, IFeature<any, any>>;
export default class TestFeature extends Feature<TestFeatureConfigType, IApp, TestFeatureFeaturesType> implements IFeature<TestFeatureConfigType, IApp> {
    name: string;
    initFeature(): Promise<boolean>;
}
export {};

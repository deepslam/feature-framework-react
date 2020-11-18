import { Application } from "@feature-framework/core";
import TestFeature from "./TestFeature";
export declare type TestAppConfigType = {
    title: string;
};
export declare type TestAppFeaturesType = {
    testFeature: TestFeature;
};
export default class TestApp extends Application<TestAppFeaturesType, TestAppConfigType> {
}

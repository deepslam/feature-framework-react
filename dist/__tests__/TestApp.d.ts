import { Application } from "@feature-framework/core";
import TestFeature from "./TestFeature";
export declare type TestAppType = {
    config: {
        title: string;
    };
    data: {
        name: string;
    };
    features: {
        testFeature: TestFeature;
    };
};
export default class TestApp extends Application<TestAppType> {
}

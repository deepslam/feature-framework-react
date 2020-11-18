import { Model } from "@feature-framework/core";
export declare type TestModelFieldsType = {
    id: number;
    name: string;
};
export default class TestModel extends Model<TestModelFieldsType> {
    readonly events: {};
}

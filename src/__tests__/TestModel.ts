import { Model } from "@feature-framework/core";

// Implement model fields type here
export type TestModelFieldsType = {
  id: number;
  name: string;
};

export default class TestModel extends Model<TestModelFieldsType> {
  public readonly events = {};
}

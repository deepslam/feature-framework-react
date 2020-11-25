import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectModel, withModelProps } from "../../helpers/connectModel";
import TestModel from "../TestModel";

type titlePropsType = {
  title: string;
} & withModelProps<TestModel>;

const appToProps = (model: TestModel): titlePropsType => {
  return {
    title: model.fields.name,
    model,
  };
};

function title(props: titlePropsType) {
  return (
    <div data-testid="title-container">
      <p data-testid="title">{props.title}</p>
      <button
        data-testid="btn"
        onClick={() => {
          props.model.setField("id", props.model.fields.id + 1);
          props.model.setField("name", `test_${props.model.fields.id}`);
        }}
      />
    </div>
  );
}

function ConnectedTitle({ model }: { model: TestModel }) {
  return connectModel<titlePropsType, TestModel>(appToProps, title)(model);
}

function App({ model }: { model: TestModel }) {
  return <ConnectedTitle model={model} />;
}

describe("connectModel test", () => {
  test("test creating, changing and deleting elements", async () => {
    const updateModelListener = jest.fn();

    const model = new TestModel({
      id: 1,
      name: "test",
    });

    model.baseEvents.updated.subscribe(updateModelListener);

    const instance = render(<App model={model} />);

    expect(instance.getByTestId("title").textContent).toBe("test");

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateModelListener).toHaveBeenCalledTimes(2);

    expect(instance.getByTestId("title").textContent).toBe("test_2");
  });
});

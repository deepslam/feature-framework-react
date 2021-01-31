import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectModel, withModelProps } from "../../helpers/connectModel";
import TestModel from "../TestModel";

type titlePropsType = {
  title: string;
  loading: boolean;
} & withModelProps<TestModel>;

type titleOwnPropsType = {
  loading: boolean;
};

const modelToProps = (
  model: TestModel,
  ownProps?: titleOwnPropsType
): titlePropsType => {
  expect(ownProps).not.toBeUndefined();
  expect(ownProps).toHaveProperty("loading");
  return {
    title: model.fields.name,
    model,
    loading: (ownProps && ownProps.loading) || false,
  };
};

function title(props: titlePropsType) {
  if (props.loading) {
    return <div data-testid="title">loading</div>;
  }

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

function App({
  model,
  loading = false,
}: {
  model: TestModel;
  loading: boolean;
}) {
  const ConnectedTitle = connectModel<
    titlePropsType,
    TestModel,
    titleOwnPropsType
  >(modelToProps, title, model);
  return <ConnectedTitle loading={loading} />;
}

describe("connectModel test", () => {
  test("test that a model can handle changing correctly", async () => {
    const updateModelListener = jest.fn();

    const model = new TestModel({
      id: 1,
      name: "test",
    });

    model.baseEvents.onUpdate.subscribe(updateModelListener);

    const instance = render(<App model={model} loading={false} />);

    expect(instance.getByTestId("title").textContent).toBe("test");

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateModelListener).toHaveBeenCalledTimes(2);

    expect(instance.getByTestId("title").textContent).toBe("test_2");

    instance.rerender(<App model={model} loading={true} />);

    expect(instance.getByTestId("title").textContent).toBe("loading");
  });
});

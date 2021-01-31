import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectFeature } from "../../helpers/connectFeature";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";

type titlePropsType = {
  title: string;
  name: string;
  feature: TestFeature;
  loading: boolean;
};

type titleOwnPropsType = {
  loading: boolean;
};

const featureToProps = (
  feature: TestFeature,
  ownProps?: titleOwnPropsType
): titlePropsType => {
  expect(ownProps).not.toBeUndefined();
  expect(ownProps).toHaveProperty("loading");
  return {
    title: feature.cfg().title || "not_set",
    name: feature.data.name || "no_name",
    feature,
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
      <p data-testid="name">{props.name}</p>
      <button
        data-testid="btn"
        onClick={() => {
          props.feature.updateConfig({
            title: "test",
          });
        }}
      />
      <button
        data-testid="nameBtn"
        onClick={() => {
          props.feature.updateData({
            name: "newname",
          });
        }}
      />
    </div>
  );
}

function App({
  feature,
  loading = false,
}: {
  feature: TestFeature;
  loading: boolean;
}) {
  const ConnectedTitle = connectFeature<
    titlePropsType,
    TestFeature,
    titleOwnPropsType
  >(featureToProps, title, feature);

  return <ConnectedTitle loading={loading} />;
}

describe("connectFeature test", () => {
  test("test that a feature can handle changing correctly", async () => {
    let loading = false;
    const updateFeatureListener = jest.fn();
    const updateFeatureDataListener = jest.fn();
    const app = new TestApp({ config: { title: "new app" } });
    const feature = new TestFeature({
      config: {
        version: "1.0",
      },
    });

    app.init({
      features: {
        testFeature: feature,
      },
    });

    feature.baseEvents.onUpdate.subscribe(updateFeatureListener);
    feature.baseEvents.onDataUpdate.subscribe(updateFeatureDataListener);

    const instance = render(<App feature={feature} loading={loading} />);

    expect(instance.getByTestId("title").textContent).toBe("not_set");
    expect(instance.getByTestId("name").textContent).toBe("no_name");

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateFeatureListener).toHaveBeenCalledTimes(1);
    expect(updateFeatureDataListener).not.toBeCalled();

    expect(instance.getByTestId("title").textContent).toBe("test");
    expect(instance.getByTestId("name").textContent).toBe("no_name");

    fireEvent.click(instance.getByTestId("nameBtn"));

    expect(instance.getByTestId("title").textContent).toBe("test");
    expect(instance.getByTestId("name").textContent).toBe("newname");

    loading = true;
    instance.rerender(<App feature={feature} loading={loading} />);

    expect(instance.getByTestId("title").textContent).toBe("loading");
  });
});

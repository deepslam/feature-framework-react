import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectFeature } from "../../helpers/connectFeature";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";

type titlePropsType = {
  title: string;
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
      <button
        data-testid="btn"
        onClick={() => {
          props.feature.updateConfig({
            title: "test",
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
    const updateFeatureListener = jest.fn();
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

    const instance = render(<App feature={feature} loading={false} />);

    expect(instance.getByTestId("title").textContent).toBe("not_set");

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateFeatureListener).toHaveBeenCalledTimes(1);

    expect(instance.getByTestId("title").textContent).toBe("test");

    instance.rerender(<App feature={feature} loading={true} />);

    expect(instance.getByTestId("title").textContent).toBe("loading");
  });
});

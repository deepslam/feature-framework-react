import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectFeature } from "../../helpers/connectFeature";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";

type titlePropsType = {
  title: string;
  feature: TestFeature;
};

const appToProps = (feature: TestFeature): titlePropsType => {
  return {
    title: feature.cfg().title || "not_set",
    feature,
  };
};

function title(props: titlePropsType) {
  return (
    <div data-testid="title-container">
      <p data-testid="title">{props.title}</p>
      <button
        data-testid="btn"
        onClick={() => {
          props.feature.extendConfig({
            title: "test",
          });
        }}
      />
    </div>
  );
}

function ConnectedTitle({ feature }: { feature: TestFeature }) {
  return connectFeature<titlePropsType, TestFeature>(
    appToProps,
    title
  )(feature);
}

function App({ feature }: { feature: TestFeature }) {
  return <ConnectedTitle feature={feature} />;
}

describe("connectFeature test", () => {
  test("test that a feature can handle changing correctly", async () => {
    const updateFeatureListener = jest.fn();
    const app = new TestApp({ title: "new app" });
    const feature = new TestFeature(
      {
        version: "1.0",
      },
      {}
    );

    app.init({
      testFeature: feature,
    });

    feature.baseEvents.onUpdate.subscribe(updateFeatureListener);

    const instance = render(<App feature={feature} />);

    expect(instance.getByTestId("title").textContent).toBe("not_set");

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateFeatureListener).toHaveBeenCalledTimes(1);

    expect(instance.getByTestId("title").textContent).toBe("test");
  });
});

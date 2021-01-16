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

const featureToProps = (feature: TestFeature): titlePropsType => {
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
          props.feature.updateConfig({
            title: "test",
          });
        }}
      />
    </div>
  );
}

function App({ feature }: { feature: TestFeature }) {
  const ConnectedTitle = connectFeature<titlePropsType, TestFeature>(
    featureToProps,
    title,
    feature,
    ["onCustomUpdate"]
  );

  return <ConnectedTitle />;
}

describe("connectFeature with custom props", () => {
  test("should react on custom events only", async () => {
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

    feature.events.onCustomUpdate.subscribe(updateFeatureListener);

    const instance = render(<App feature={feature} />);

    expect(instance.getByTestId("title").textContent).toBe("not_set");

    fireEvent.click(instance.getByTestId("btn"));

    expect(instance.getByTestId("title").textContent).toBe("not_set");

    feature.events.onCustomUpdate.fire(null);

    expect(updateFeatureListener).toHaveBeenCalledTimes(1);

    expect(instance.getByTestId("title").textContent).toBe("test");
  });
});

/* eslint-disable react/display-name */
import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";
import { connectFeature } from "../../helpers/connectFeature";
import { Feature } from "@feature-framework/core";

const feature = new TestFeature({
  config: {
    version: "1.0",
  },
});

const app = new TestApp({});

app.init({
  features: {
    testFeature: feature,
  },
});

type componentPropsType = {
  name: string;
};

type titleOwnPropsType = {
  sequence: number;
};

function Component({ name }: componentPropsType) {
  return <div data-testid="component-title">{name}</div>;
}

function ComponentWithFeature({ name }: componentPropsType) {
  return <div data-testid="component-title-with-feature">{name}</div>;
}

function hoc(Comp: typeof Component) {
  return ({ sequence = 0 }: { sequence: number }) => {
    const name = `name_${sequence}`;
    return <Comp name={name} />;
  };
}

const HocComponent = hoc(Component);

const ConnectedTitle = connectFeature<
  componentPropsType,
  typeof feature,
  titleOwnPropsType
>(
  (f: typeof feature, ownProps?: titleOwnPropsType) => ({
    name: `test_${ownProps!.sequence}_${f.cfg().version}`,
  }),
  ComponentWithFeature,
  feature
);

function TestComponent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <HocComponent sequence={count} />
      <ConnectedTitle sequence={count} />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        data-testid="btn"
      >
        Increase count
      </button>
    </>
  );
}

describe("usual hoc test", () => {
  it("should handle with props changes correctly", () => {
    const instance = render(<TestComponent />);

    expect(instance.getByTestId("component-title").textContent).toBe("name_0");
    expect(
      instance.getByTestId("component-title-with-feature").textContent
    ).toBe("test_0_1.0");

    fireEvent.click(instance.getByTestId("btn"));

    expect(instance.getByTestId("component-title").textContent).toBe("name_1");
    expect(
      instance.getByTestId("component-title-with-feature").textContent
    ).toBe("test_1_1.0");

    fireEvent.click(instance.getByTestId("btn"));

    expect(instance.getByTestId("component-title").textContent).toBe("name_2");
    expect(
      instance.getByTestId("component-title-with-feature").textContent
    ).toBe("test_2_1.0");
  });
});

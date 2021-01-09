import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectApp } from "../../helpers/connectApp";
import { AppProvider } from "../../providers/AppProvider";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";

type titlePropsType = {
  version: string;
  app: TestApp;
};

type titleOwnPropsType = {
  loading: boolean;
};

const appToProps = (
  application: TestApp,
  ownProps?: titleOwnPropsType
): titlePropsType & titleOwnPropsType => {
  return {
    version: application.isInitialized()
      ? application.features().testFeature.config.version
      : "",
    app: application,
    loading: (ownProps && ownProps.loading) || false,
  };
};

function title(props: titlePropsType & titleOwnPropsType) {
  if (props.loading) {
    return <p data-testid="title">loading</p>;
  }

  return (
    <div data-testid="title-container">
      <p data-testid="title">{props.version}</p>
      <button
        data-testid="btn"
        onClick={() =>
          props.app.features().testFeature.updateConfig({ version: "1.0.1" })
        }
      />
    </div>
  );
}

function App({ app, loading = false }: { app: TestApp; loading?: boolean }) {
  const ConnectedTitle = connectApp<titlePropsType, TestApp, titleOwnPropsType>(
    appToProps,
    title,
    ["onFeatureUpdated"]
  );

  return (
    <AppProvider app={app}>
      <ConnectedTitle loading={loading} />
    </AppProvider>
  );
}

describe("AppProvider and connectApp test", () => {
  test("test default props", async () => {
    const app = new TestApp({
      config: {
        title: "test",
      },
    });

    await app.init({
      features: {
        testFeature: new TestFeature({ config: { version: "1.0.0" } }),
      },
    });

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("1.0.0");
  });

  test("try to change props on the not initialized app", async () => {
    const app = new TestApp({
      config: {
        title: "test",
      },
    });

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("");
  });

  test("try to change props on initialized app", async () => {
    const app = new TestApp({
      config: {
        title: "test",
      },
    });

    await app.init({
      features: {
        testFeature: new TestFeature({ config: { version: "1.0.0" } }),
      },
    });

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("1.0.0");

    const updateFeatureEventHandler = jest.fn();

    app.baseEvents.onFeatureUpdated.subscribe(updateFeatureEventHandler);

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateFeatureEventHandler).toBeCalled();
    expect(app.features().testFeature.config.version).toBe("1.0.1");

    expect(instance.getByTestId("title").textContent).toBe("1.0.1");

    instance.rerender(<App app={app} loading={true} />);

    expect(instance.getByTestId("title").textContent).toBe("loading");
  });
});

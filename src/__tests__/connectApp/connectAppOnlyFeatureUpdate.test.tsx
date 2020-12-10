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

const appToProps = (application: TestApp): titlePropsType => {
  return {
    version: application.isInitialized()
      ? application.features().testFeature.config.version
      : "",
    app: application,
  };
};

function title(props: titlePropsType) {
  return (
    <div data-testid="title-container">
      <p data-testid="title">{props.version}</p>
      <button
        data-testid="btn"
        onClick={() =>
          props.app.features().testFeature.extendConfig({ version: "1.0.1" })
        }
      />
    </div>
  );
}

function ConnectedTitle() {
  return connectApp(appToProps, title, ["onFeatureUpdated"])();
}

function App({ app }: { app: TestApp }) {
  return (
    <AppProvider app={app}>
      <ConnectedTitle />
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
  });
});

import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectApp } from "../../helpers/connectApp";
import { AppProvider } from "../../providers/AppProvider";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";

type titlePropsType = {
  title: string;
  app: TestApp;
} & titleOwnPropsType;

type titleOwnPropsType = {
  loading: boolean;
};

const appToProps = (
  application: TestApp,
  ownProps?: titleOwnPropsType
): titlePropsType => {
  expect(ownProps).not.toBeUndefined();
  expect(ownProps).toHaveProperty("loading");
  return {
    title: application.config.title,
    app: application,
    loading: (ownProps && ownProps.loading) || false,
  };
};

function title(props: titlePropsType & titleOwnPropsType) {
  if (props.loading) {
    return <div data-testid="title">loading</div>;
  }
  return (
    <div data-testid="title-container">
      <p data-testid="title">{props.title}</p>
      <button
        data-testid="btn"
        onClick={() => props.app.setConfig("title", "newTitle")}
      />
    </div>
  );
}

function App({ app, loading = false }: { app: TestApp; loading?: boolean }) {
  const ConnectedTitle = connectApp<titlePropsType, TestApp, titleOwnPropsType>(
    appToProps,
    title,
    ["onUpdate"]
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
        testFeature: new TestFeature({ config: { version: "1.0.1" } }),
      },
    });

    const instance = render(<App app={app} loading={false} />);

    expect(instance.getByTestId("title").textContent).toBe("test");
  });

  test("try to change props on the not initialized app", async () => {
    const app = new TestApp({
      config: {
        title: "test",
      },
    });

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("test");

    const updateConfigEventHandler = jest.fn();

    app.baseEvents.onUpdate.subscribe(updateConfigEventHandler);

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateConfigEventHandler).toBeCalled();
    expect(app.config.title).toBe("newTitle");

    expect(instance.getByTestId("title").textContent).toBe("test");
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

    expect(instance.getByTestId("title").textContent).toBe("test");

    const updateConfigEventHandler = jest.fn();

    app.baseEvents.onUpdate.subscribe(updateConfigEventHandler);

    fireEvent.click(instance.getByTestId("btn"));

    expect(updateConfigEventHandler).toBeCalled();
    expect(app.config.title).toBe("newTitle");

    expect(instance.getByTestId("title").textContent).toBe("newTitle");

    instance.rerender(<App app={app} loading={true} />);

    expect(instance.getByTestId("title").textContent).toBe("loading");
  });
});

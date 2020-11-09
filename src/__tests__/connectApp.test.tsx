import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { connectApp } from "../hooks/connectApp";
import { AppProvider } from "../providers/AppProvider";
import TestApp from "./TestApp";

type titlePropsType = {
  title: string;
  app: TestApp;
};

const appToProps = (application: TestApp): titlePropsType => {
  return {
    title: application.config.title,
    app: application,
  };
};

function title(props: titlePropsType) {
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

function ConnectedTitle() {
  return connectApp(appToProps, title)();
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
      title: "test",
    });

    await app.init({});

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("test");
  });

  test("try to change props on the not initialized app", async () => {
    const app = new TestApp({
      title: "test",
    });

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("test");

    const updateConfigEventHandler = jest.fn();

    app.baseEvents.onUpdate.subscribe(updateConfigEventHandler);

    fireEvent.click(instance.getByTestId("btn"));

    await instance.rerender(<App app={app} />);

    expect(updateConfigEventHandler).toBeCalled();
    expect(app.config.title).toBe("newTitle");

    expect(instance.getByTestId("title").textContent).toBe("test");
  });

  test("try to change props on initialized app", async () => {
    const app = new TestApp({
      title: "test",
    });

    await app.init({});

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("test");

    const updateConfigEventHandler = jest.fn();

    app.baseEvents.onUpdate.subscribe(updateConfigEventHandler);

    fireEvent.click(instance.getByTestId("btn"));

    await instance.rerender(<App app={app} />);

    expect(updateConfigEventHandler).toBeCalled();
    expect(app.config.title).toBe("newTitle");

    expect(instance.getByTestId("title").textContent).toBe("newTitle");
  });
});

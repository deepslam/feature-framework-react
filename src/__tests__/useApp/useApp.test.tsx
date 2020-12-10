import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import TestApp from "../TestApp";
import TestFeature from "../TestFeature";
import { AppProvider } from "../../providers/AppProvider";
import { useApp } from "../../hooks/useApp";

function Title() {
  const app = useApp<TestApp>();

  return (
    <div data-testid="title-container">
      <div data-testid="title">{app.config.title}</div>;
    </div>
  );
}

function App({ app }: { app: TestApp }) {
  return (
    <AppProvider app={app}>
      <Title data-testid="title" />
    </AppProvider>
  );
}

describe("Check withApp hook", () => {
  test("test that withApp receive the correct app instance", async () => {
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

    const instance = render(<App app={app} />);

    expect(instance.getByTestId("title").textContent).toBe("test");
  });
});

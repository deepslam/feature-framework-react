import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  connectCollection,
  withCollectionProps,
} from "../../helpers/connectCollection";
import TestModelCollection from "../TestModelCollection";
import TestModel from "../TestModel";

type titlePropsType = {
  items: TestModel[];
} & withCollectionProps<TestModelCollection>;

const appToProps = (collection: TestModelCollection): titlePropsType => {
  return {
    items: collection.getAll(),
    collection,
  };
};

function title(props: titlePropsType) {
  return (
    <div data-testid="title-container">
      <p data-testid="title">{props.items.map((item) => item.fields.id)}</p>
      <button
        data-testid="btn"
        onClick={() =>
          props.collection.add(
            new TestModel({
              id: props.collection.length() + 1,
              name: `name_${props.collection.length() + 1}`,
            })
          )
        }
      />
      <button
        data-testid="btn-delete"
        onClick={() => props.collection.remove(props.collection.first()!)}
      />
      <button
        data-testid="btn-clear"
        onClick={() => props.collection.clear()}
      />
    </div>
  );
}

function ConnectedTitle({ collection }: { collection: TestModelCollection }) {
  return connectCollection<titlePropsType, TestModelCollection>(
    appToProps,
    title
  )(collection);
}

function App({ collection }: { collection: TestModelCollection }) {
  return <ConnectedTitle collection={collection} />;
}

describe("connectCollection test", () => {
  test("test creating, changing and deleting elements", async () => {
    const updateCollectionListener = jest.fn();

    const collection = new TestModelCollection();

    collection.events.onItemAdded.subscribe(updateCollectionListener);

    collection.add(new TestModel({ id: 1, name: "test" }));

    expect(updateCollectionListener).toHaveBeenCalledTimes(1);

    const instance = render(<App collection={collection} />);

    expect(instance.getByTestId("title").textContent).toBe("1");

    fireEvent.click(instance.getByTestId("btn"));

    expect(instance.getByTestId("title").textContent).toBe("12");

    fireEvent.click(instance.getByTestId("btn"));
    fireEvent.click(instance.getByTestId("btn"));

    expect(instance.getByTestId("title").textContent).toBe("1234");

    fireEvent.click(instance.getByTestId("btn-delete"));

    expect(instance.getByTestId("title").textContent).toBe("234");

    fireEvent.click(instance.getByTestId("btn-clear"));

    expect(instance.getByTestId("title").textContent).toBe("");
  });
});

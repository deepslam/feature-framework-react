import React, { useEffect, useState } from "react";
import { DataCollection, Model } from "@feature-framework/core";

export type withCollectionProps<C extends DataCollection<unknown>> = {
  collection: C;
  onAddItem: () => void;
};

export type connectAppEventType = "onUpdate" | "onFeatureUpdated";

export function connectCollection<
  P extends Record<string, unknown>,
  C extends DataCollection<typeof Model>
>(callback: (collection: C) => P, Component: React.ComponentType<P>) {
  const Hoc = (collection: C): JSX.Element => {
    const [props, setProps] = useState(callback(collection));
    const val = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(collection) });
    };

    useEffect(() => {
      val.current = props;

      Object.keys(collection.events).forEach((eventName) => {
        collection.events[eventName].subscribe(() => {
          updateProps();
        });
      });

      return () => {
        Object.keys(collection.events).forEach((eventName) => {
          collection.events[eventName].unsubscribe(updateProps);
        });
      };
    });

    useEffect(() => () => {
      Object.keys(collection.events).forEach((eventName) => {
        collection.events[eventName].unsubscribe(updateProps);
      });
    });

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  return Hoc;
}

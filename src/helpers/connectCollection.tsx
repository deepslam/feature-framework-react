import React, { useEffect, useState } from "react";
import {
  IDataCollection,
  Model,
  DataCollectionStandardEventsType,
} from "@feature-framework/core";

export type withCollectionProps<C extends IDataCollection<unknown>> = {
  collection: C;
  onAddItem?: () => void;
};

export type connectCollectionEventType = keyof DataCollectionStandardEventsType<
  IDataCollection<unknown>
>;

export function connectCollection<
  P extends Record<string, unknown>,
  C extends IDataCollection<Model>
>(callback: (c: C) => P, Component: React.ComponentType<P>, collection: C) {
  const Hoc = (): JSX.Element => {
    const [props, setProps] = useState(callback(collection));
    const val = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(collection) });
    };

    useEffect(() => {
      val.current = props;

      Object.keys(collection.events).forEach((eventName) => {
        collection.events[eventName as connectCollectionEventType].subscribe(
          () => {
            updateProps();
          }
        );
      });

      return () => {
        Object.keys(collection.events).forEach((eventName) => {
          collection.events[
            eventName as connectCollectionEventType
          ].unsubscribe(updateProps);
        });
      };
    });

    useEffect(() => () => {
      Object.keys(collection.events).forEach((eventName) => {
        collection.events[eventName as connectCollectionEventType].unsubscribe(
          updateProps
        );
      });
    });

    return (
      <>
        <Component {...props} collection={collection} />
      </>
    );
  };

  return Hoc;
}

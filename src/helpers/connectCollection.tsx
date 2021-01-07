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

export type connectCollectionOwnPropsType = Record<string, any>;

export function connectCollection<
  P extends Record<string, unknown>,
  C extends IDataCollection<Model>,
  O extends connectCollectionOwnPropsType = connectCollectionOwnPropsType
>(
  callback: (c: C, ownProps: O) => P & O,
  Component: React.ComponentType<P & O>,
  collection: C
) {
  const Hoc = (ownProps: O): JSX.Element => {
    const [props, setProps] = useState(callback(collection, ownProps));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(collection, ownProps) });
    };

    useEffect(() => {
      ref.current = props;

      Object.keys(collection.events).forEach((eventName) => {
        collection.events[eventName as connectCollectionEventType].subscribe(
          updateProps
        );
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = false;
        Object.keys(collection.events).forEach((eventName) => {
          collection.events[
            eventName as connectCollectionEventType
          ].unsubscribe(updateProps);
        });
      };
    });

    return <Component {...props} {...ownProps} collection={collection} />;
  };

  return Hoc;
}

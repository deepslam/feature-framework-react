/* eslint-disable react/display-name */
import React, { useEffect, useState, useContext } from "react";
import { IApp, AppStandardEventsType } from "@feature-framework/core";
import { AppContext } from "../providers/AppProvider";

export type connectAppEventType = keyof AppStandardEventsType<IApp<any>>;

export type connectAppOwnPropsType = Record<string, any>;

export function connectApp<
  P extends Record<string, unknown>,
  A extends IApp<any>,
  O extends connectAppOwnPropsType = connectAppOwnPropsType
>(
  callback: (app: A, ownProps?: O) => P,
  Component: React.ComponentType<P>,
  events: connectAppEventType[] = ["onUpdate", "onDataUpdate"]
) {
  const hoc = (ownProps: O): JSX.Element => {
    const app = useContext(AppContext) as A;
    const [props, setProps] = useState(callback(app, ownProps));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      if (app && app.isInitialized()) {
        setProps({ ...callback(app, ownProps) });
      }
    };

    useEffect(() => {
      updateProps();
    }, Object.values(ownProps));

    useEffect(() => {
      ref.current = props;
      events.forEach((event) => {
        app.baseEvents[event].subscribe(updateProps);
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = false;
        events.forEach((event) => {
          app.baseEvents[event].unsubscribe(updateProps);
        });
      };
    });

    return <Component {...props} />;
  };

  return hoc;
}

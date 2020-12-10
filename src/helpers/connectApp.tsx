import React, { useEffect, useState, useContext } from "react";
import { IApp } from "@feature-framework/core";
import { AppContext } from "../providers/AppProvider";

export type withAppProps<A extends IApp<any>> = {
  app: A;
};

export type connectAppEventType = "onUpdate" | "onFeatureUpdated";

export function connectApp<
  P extends Record<string, unknown>,
  A extends IApp<any>
>(
  callback: (app: A) => P,
  Component: React.ComponentType<P & withAppProps<A>>,
  events: connectAppEventType[] = ["onUpdate"]
) {
  const Hoc = (): JSX.Element => {
    const app = useContext(AppContext) as A;
    const [props, setProps] = useState(callback(app));
    const val = React.useRef<P>(props);

    const updateProps = () => {
      if (app && app.isInitialized()) {
        setProps({ ...callback(app) });
      }
    };

    useEffect(() => {
      val.current = props;
      events.forEach((event) => {
        app.baseEvents[event].subscribe(() => {
          updateProps();
        });
      });

      return () => {
        events.forEach((event) => {
          app.baseEvents[event].unsubscribe(updateProps);
        });
      };
    });

    useEffect(() => () => {
      events.forEach((event) => {
        app.baseEvents[event].unsubscribe(updateProps);
      });
    });

    return (
      <>
        <Component {...props} app={app} />
      </>
    );
  };

  return Hoc;
}

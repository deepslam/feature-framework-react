import React, { useEffect, useState, useContext } from "react";
import { IApp } from "@feature-framework/core";
import { AppContext } from "../providers/AppProvider";

export type withAppProps<A extends IApp<any>> = {
  app: A;
};

export type connectAppEventType = "onUpdate" | "onFeatureUpdated";

export type connectAppOwnPropsType = Record<string, any>;

export function connectApp<
  P extends Record<string, unknown>,
  A extends IApp<any>,
  O extends connectAppOwnPropsType = connectAppOwnPropsType
>(
  callback: (app: A, ownProps?: O) => P,
  Component: React.ComponentType<P & withAppProps<A>>,
  events: connectAppEventType[] = ["onUpdate"]
) {
  const Hoc = (ownProps?: O): JSX.Element => {
    const app = useContext(AppContext) as A;
    const [props, setProps] = useState(callback(app));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      if (app && app.isInitialized()) {
        setProps({ ...callback(app) });
      }
    };

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

    return <Component {...props} {...ownProps} app={app} />;
  };

  return Hoc;
}

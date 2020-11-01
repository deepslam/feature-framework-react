import React, { useEffect, useState, useContext } from "react";
import { IApp } from "@feature-framework/core";
import { AppContext } from "../Providers/AppProvider";

export type withAppProps<A extends IApp> = {
  app: A;
};

export function connectApp<P extends Record<string, unknown>, A extends IApp>(
  callback: (app: A) => P,
  Component: React.ComponentType<P & withAppProps<A>>
) {
  const Hoc = (): JSX.Element => {
    const app = useContext(AppContext) as A;
    const [props, setProps] = useState(callback(app));
    const val = React.useRef<P>(props);

    const updateProps = () => {
      if (app && app.isInitialized()) {
        setProps(callback(app));
      }
    };

    useEffect(() => {
      val.current = props;
      app.baseEvents.onUpdate.subscribe(() => {
        updateProps();
      });

      return () => {
        app.baseEvents.onUpdate.unsubscribe(updateProps);
      };
    });

    useEffect(() => () => {
      app.baseEvents.onUpdate.unsubscribe(updateProps);
    });

    return (
      <>
        <Component {...props} app={app} />
      </>
    );
  };

  return Hoc;
}

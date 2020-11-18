import React, { useEffect, useState } from "react";
import { IModel, ModelStandardEventsType } from "@feature-framework/core";

export type withModelProps<M extends IModel> = {
  model: M;
};

export type connectModelEventType = keyof ModelStandardEventsType<IModel>;

export function connectModel<
  P extends Record<string, unknown>,
  M extends IModel
>(callback: (m: M) => P, Component: React.ComponentType<P>) {
  const Hoc = (model: M): JSX.Element => {
    const [props, setProps] = useState(callback(model));
    const val = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(model) });
    };

    useEffect(() => {
      val.current = props;

      Object.keys(model.baseEvents).forEach((eventName) => {
        model.baseEvents[eventName as connectModelEventType].subscribe(() => {
          updateProps();
        });
      });

      return () => {
        Object.keys(model.baseEvents).forEach((eventName) => {
          model.baseEvents[eventName as connectModelEventType].unsubscribe(
            updateProps
          );
        });
      };
    });

    useEffect(() => () => {
      Object.keys(model.baseEvents).forEach((eventName) => {
        model.baseEvents[eventName as connectModelEventType].unsubscribe(
          updateProps
        );
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

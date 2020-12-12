import React, { useEffect, useState } from "react";
import { IModel, ModelStandardEventsType } from "@feature-framework/core";

export type withModelProps<M extends IModel> = {
  model: M;
};

export type connectModelEventType = keyof ModelStandardEventsType<IModel>;

export function connectModel<
  P extends Record<string, unknown>,
  M extends IModel
>(callback: (m: M) => P, Component: React.ComponentType<P>, model: M) {
  const Hoc = (): JSX.Element => {
    const [props, setProps] = useState(callback(model));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(model) });
    };

    useEffect(() => {
      ref.current = props;

      Object.keys(model.baseEvents).forEach((eventName) => {
        model.baseEvents[eventName as connectModelEventType].subscribe(() => {
          updateProps();
        });
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = false;
        Object.keys(model.baseEvents).forEach((eventName) => {
          model.baseEvents[eventName as connectModelEventType].unsubscribe(
            updateProps
          );
        });
      };
    });

    return <Component {...props} model={model} />;
  };

  return Hoc;
}

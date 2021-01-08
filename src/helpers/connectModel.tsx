import React, { useEffect, useState } from "react";
import { IModel, ModelStandardEventsType } from "@feature-framework/core";

export type withModelProps<M extends IModel> = {
  model: M;
};

export type connectModelEventType = keyof ModelStandardEventsType<IModel>;

export type connectModelOwnPropsType = Record<string, any>;

export function connectModel<
  P extends Record<string, unknown>,
  M extends IModel,
  O extends connectModelOwnPropsType = connectModelOwnPropsType
>(
  callback: (m: M, ownProps?: O) => P & O,
  Component: React.ComponentType<P & O>,
  model: M
) {
  const Hoc = (ownProps: O): JSX.Element => {
    const [props, setProps] = useState(callback(model, ownProps));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(model, ownProps) });
    };

    useEffect(() => {
      ref.current = props;

      Object.keys(model.baseEvents).forEach((eventName) => {
        model.baseEvents[eventName as connectModelEventType].subscribe(
          updateProps
        );
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

    return <Component {...props} {...ownProps} />;
  };

  return Hoc;
}

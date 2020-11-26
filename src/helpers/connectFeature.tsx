import React, { useEffect, useState } from "react";
import { IFeature, FeatureStandardEventsType } from "@feature-framework/core";

export type withFeatureProps<F extends IFeature<any, any>> = {
  feature: F;
};

export type connectFeatureEventType = keyof FeatureStandardEventsType<
  IFeature<any, any>
>;

export function connectFeature<
  P extends Record<string, unknown>,
  F extends IFeature<any, any>
>(callback: (f: F) => P, Component: React.ComponentType<P>) {
  const Hoc = (model: F): JSX.Element => {
    const [props, setProps] = useState(callback(model));
    const val = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(model) });
    };

    useEffect(() => {
      val.current = props;

      Object.keys(model.baseEvents).forEach((eventName) => {
        model.baseEvents[eventName as connectFeatureEventType].subscribe(() => {
          updateProps();
        });
      });

      return () => {
        Object.keys(model.baseEvents).forEach((eventName) => {
          model.baseEvents[eventName as connectFeatureEventType].unsubscribe(
            updateProps
          );
        });
      };
    });

    useEffect(() => () => {
      Object.keys(model.baseEvents).forEach((eventName) => {
        model.baseEvents[eventName as connectFeatureEventType].unsubscribe(
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

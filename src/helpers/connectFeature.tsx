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
>(callback: (f: F) => P, Component: React.ComponentType<P>, feature: F) {
  const Hoc = (): JSX.Element => {
    const [props, setProps] = useState(callback(feature));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(feature) });
    };

    useEffect(() => {
      ref.current = props;

      Object.keys(feature.baseEvents).forEach((eventName) => {
        feature.baseEvents[eventName as connectFeatureEventType].subscribe(
          () => {
            updateProps();
          }
        );
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = false;
        Object.keys(feature.baseEvents).forEach((eventName) => {
          feature.baseEvents[eventName as connectFeatureEventType].unsubscribe(
            updateProps
          );
        });
      };
    });

    return <Component {...props} />;
  };

  return Hoc;
}

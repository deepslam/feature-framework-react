import React, { useEffect, useState } from "react";
import { IFeature, FeatureStandardEventsType } from "@feature-framework/core";

export type withFeatureProps<F extends IFeature<any, any>> = {
  feature: F;
};

export type connectFeatureEventType = keyof FeatureStandardEventsType<
  IFeature<any, any>
>;

export type connectFeatureOwnPropsType = Record<string, any>;

export function connectFeature<
  P extends Record<string, unknown>,
  F extends IFeature<any, any>,
  O extends connectFeatureOwnPropsType = connectFeatureOwnPropsType
>(
  callback: (f: F, ownProps?: O) => P,
  Component: React.ComponentType<P>,
  feature: F,
  events: connectFeatureEventType[] | string[] = ["onUpdate", "onDataUpdate"]
) {
  const Hoc = (ownProps: O): JSX.Element => {
    const [props, setProps] = useState(callback(feature, ownProps));
    const ref = React.useRef<P>(props);

    const updateProps = () => {
      setProps({ ...callback(feature, ownProps) });
    };

    useEffect(() => {
      updateProps();
    }, Object.keys(ownProps));

    useEffect(() => {
      ref.current = props;

      events.forEach((event) => {
        if (feature.baseEvents[event as connectFeatureEventType]) {
          feature.baseEvents[event as connectFeatureEventType].subscribe(
            updateProps
          );
        }
        if (feature.events[event as string]) {
          feature.events[event].subscribe(updateProps);
        }
      });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref.current = false;
        events.forEach((event) => {
          if (feature.baseEvents[event as connectFeatureEventType]) {
            feature.baseEvents[event as connectFeatureEventType].unsubscribe(
              updateProps
            );
          }
          if (feature.events[event as string]) {
            feature.events[event].unsubscribe(updateProps);
          }
        });
      };
    });

    return <Component {...props} />;
  };

  return Hoc;
}

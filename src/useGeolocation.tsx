import * as React from "react";

/**
 * Get geolocation and setup a subscription to watch that
 * @param options Position Options, see lib.dom.d.ts
 */
export default function useGeolocation(options: PositionOptions = {}): Position {
  const [state, setState] = React.useState<Position>({
    coords: {
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null
    },
    timestamp: 0
  });

  const listenerID: React.MutableRefObject<number> = React.useRef<number>(null);

  function onEvent(event: Position): void {
    setState(event);
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => onEvent(position),
      err => console.error(err),
      options
    );
    listenerID.current = navigator.geolocation.watchPosition(
      position => onEvent(position),
      err => console.error(err),
      options
    );

    return () => {
      navigator.geolocation.clearWatch(listenerID.current);
    };
  }, []);

  return state;
}

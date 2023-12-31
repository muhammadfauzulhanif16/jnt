import { useEffect, useRef, FC } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface MapProps {
    startingPointAddress: {
        latitude: number;
        longitude: number;
    };
    destinationAddress: {
        latitude: number;
        longitude: number;
        total_distance: string;
        total_time: string;
    };
    setStartingPointAddress: Function;
    setDestinationAddress: Function;
}

export const Map: FC<MapProps> = ({
    startingPointAddress,
    destinationAddress,
    setStartingPointAddress,
    setDestinationAddress,
}: MapProps) => {
    const map = useMap();
    const routingControl = useRef<any>(null);

    console.log(startingPointAddress);
    console.log(destinationAddress);

    useEffect(() => {
        function convertDistance(distance: any) {
            const kilometers = Math.floor(distance / 1000);
            const meters = Math.floor(distance % 1000);

            return `${kilometers} km, ${meters} m`;
        }

        function convertTime(time: any) {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = Math.floor(time % 60);

            return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }

        const indonesiaBounds = L.latLngBounds(
            L.latLng(-11.0086, 95.0129),
            L.latLng(6.0779, 141.0197)
        );
        map.setMaxBounds(indonesiaBounds);

        navigator.geolocation.getCurrentPosition(function (position) {
            map.setView(
                [position.coords.latitude, position.coords.longitude],
                13
            );

            routingControl.current = L.Routing.control({
                waypoints: [
                    L.latLng(
                        startingPointAddress.latitude === 0
                            ? position.coords.latitude
                            : startingPointAddress.latitude,

                        startingPointAddress.longitude === 0
                            ? position.coords.longitude
                            : startingPointAddress.longitude
                    ),
                    L.latLng(
                        destinationAddress.latitude === 0
                            ? position.coords.latitude
                            : destinationAddress.latitude,
                        destinationAddress.longitude === 0
                            ? position.coords.longitude
                            : destinationAddress.longitude
                    ),
                ],
                geocoder: L.Control.Geocoder.nominatim(),
                routeWhileDragging: true,
                draggableWaypoints: true,
                addWaypoints: true,
                fitSelectedRoutes: true,
            })
                .on("routesfound", function (e) {
                    let shortestRoute = e.routes[0];
                    for (let route of e.routes) {
                        if (
                            route.summary.totalDistance <
                            shortestRoute.summary.totalDistance
                        ) {
                            shortestRoute = route;
                        }
                    }

                    const totalDistance = convertDistance(
                        shortestRoute.summary.totalDistance
                    );
                    const totalTime = convertTime(
                        shortestRoute.summary.totalTime
                    );

                    setStartingPointAddress({
                        latitude: e.waypoints[0].latLng.lat,
                        longitude: e.waypoints[0].latLng.lng,
                    });

                    setDestinationAddress({
                        latitude: e.waypoints[1].latLng.lat,
                        longitude: e.waypoints[1].latLng.lng,
                        total_distance: totalDistance,
                        total_time: totalTime,
                    });
                })
                .addTo(map);

            L.popup()
                .setLatLng([
                    startingPointAddress.latitude,
                    startingPointAddress.longitude,
                ])
                .setContent("Starting Point")
                .addTo(map);

            L.popup()
                .setLatLng([
                    destinationAddress.latitude,
                    destinationAddress.longitude,
                ])
                .setContent("Destination")
                .addTo(map);
        });
    }, []);

    return null;
};

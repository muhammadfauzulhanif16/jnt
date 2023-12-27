import React, { useEffect, useRef } from "react";
import H from "@here/maps-api-for-javascript";

// interface HereMapProps {
//     apiKey: string;
//     destinationLocation: { lat: number; lng: number };
// }

export const HereMap = ({ apikey, initialLocation, destinationLocation }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    useEffect(() => {
        if (!map.current) {
            platform.current = new H.service.Platform({ apikey });

            const rasterTileService = platform.current.getRasterTileService({
                queryParams: {
                    style: "explore.day",
                    size: 512,
                },
            });
            const rasterTileProvider = new H.service.rasterTile.Provider(
                rasterTileService
            );
            const rasterTileLayer = new H.map.layer.TileLayer(
                rasterTileProvider
            );
            // const defaultLayers = platform.createDefaultLayers();
            const newMap = new H.Map(
                mapRef.current,
                // defaultLayers.vector.normal.map,
                rasterTileLayer,
                {
                    center: initialLocation, // Default center coordinates (destination)
                    zoom: 12, // Default zoom level
                    pixelRatio: window.devicePixelRatio || 1,
                }
            );

            map.current = newMap;

            const addMarker = (lat, lng) => {
                const marker = new H.map.Marker({ lat, lng });
                newMap.addObject(marker);
            };

            const calculateRoute = () => {
                const params = {
                    mode: "fastest;car",
                    representation: "display",
                    waypoint0: `geo!${initialLocation.lat},${initialLocation.lng}`, // Starting point coordinates
                    waypoint1: `geo!${destinationLocation.lat},${destinationLocation.lng}`, // Destination coordinates
                    routeattributes: "waypoints,summary,shape,legs",
                    maneuverattributes: "direction,action",
                };

                const router = platform.current.getRoutingService();

                router.calculateRoute(
                    params,
                    (result) => {
                        if (result.routes.length) {
                            const routeLineString = new H.geo.LineString();
                            result.routes[0].sections.forEach((section) => {
                                routeLineString.pushPoint(
                                    section.departure.place.originalPosition
                                );
                                section.actions.forEach((action) => {
                                    routeLineString.pushPoint(action.position);
                                });
                            });

                            const routeLine = new H.map.Polyline(
                                routeLineString,
                                {
                                    style: {
                                        strokeColor: "blue",
                                        lineWidth: 3,
                                    },
                                }
                            );

                            map.addObject(routeLine);
                        }
                    },
                    (error) => {
                        console.error("Error calculating route:", error);
                    }
                );
            };

            const getUserLocation = () => {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const userLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            newMap.setCenter(userLocation);
                            addMarker(userLocation.lat, userLocation.lng);
                            calculateRoute();
                        },
                        (error) => {
                            console.error("Error getting location:", error);
                            newMap.setCenter(initialLocation); // Fallback to initial location
                            addMarker(initialLocation.lat, initialLocation.lng);
                            calculateRoute();
                        }
                    );
                } else {
                    console.log("Geolocation is not supported.");
                    newMap.setCenter(initialLocation); // Fallback to initial location
                    addMarker(initialLocation.lat, initialLocation.lng);
                    calculateRoute();
                }
            };

            getUserLocation();

            // const origin = { lat: 56.97, lng: 24.09 };
            // const destination = { lat: 54.7, lng: 25.24 };

            // const routingParameters = {
            //     routingMode: "fast",
            //     transportMode: "car",
            //     // The start point of the route:
            //     origin: `${origin.lat},${origin.lng}`,
            //     // The end point of the route:
            //     destination: `${destination.lat},${destination.lng}`,
            //     // Include the route shape in the response
            //     return: "polyline",
            // };

            // const onResult = function (result) {
            //     // Ensure that at least one route was found
            //     if (result.routes.length) {
            //         const lineStrings = [];
            //         result.routes[0].sections.forEach((section) => {
            //             // Create a linestring to use as a point source for the route line
            //             lineStrings.push(
            //                 H.geo.LineString.fromFlexiblePolyline(
            //                     section.polyline
            //                 )
            //             );
            //         });

            //         // Create an instance of H.geo.MultiLineString
            //         const multiLineString = new H.geo.MultiLineString(
            //             lineStrings
            //         );

            //         // Create a polyline to display the route:
            //         const routeLine = new H.map.Polyline(multiLineString, {
            //             style: {
            //                 strokeColor: "blue",
            //                 lineWidth: 3,
            //             },
            //         });

            //         // Create a marker for the start point:
            //         const startMarker = new H.map.Marker(origin);

            //         // Create a marker for the end point:
            //         const endMarker = new H.map.Marker(destination);

            //         // Create a H.map.Group to hold all the map objects and enable us to obtain
            //         // the bounding box that contains all its objects within
            //         const group = new H.map.Group();
            //         group.addObjects([routeLine, startMarker, endMarker]);
            //         // Add the group to the map
            //         map.addObject(group);

            //         // Set the map viewport to make the entire route visible:
            //         map.getViewModel().setLookAtData({
            //             bounds: group.getBoundingBox(),
            //         });
            //     }
            // };

            // const router = platform.getRasterTileService();

            // router.calculateRoute(
            //     routingParameters,
            //     onResult,
            //     function (error) {
            //         alert(error.message);
            //     }
            // );

            const behavior = new H.mapevents.Behavior(
                new H.mapevents.MapEvents(newMap)
            );
        }
    }, [apikey, initialLocation, destinationLocation]);

    return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

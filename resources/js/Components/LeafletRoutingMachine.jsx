import { set } from 'date-fns';
import L from 'leaflet';
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const LeafletRoutingMachine = (props) => {
    console.log(props.startPosition)
    const map = useMap()

    useEffect(() => {

        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         const { latitude, longitude } = position.coords

        //        


        //     })

        // } else {
        //     alert("Geolocation is not supported by this browser.")
        // }

        // map.on('click', function (e) {

        // })

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords

                var marker1 = L.marker([latitude, longitude]).addTo(map);

                L.marker([latitude, longitude]).addTo(map);

                L.Routing.control({
                    waypoints: [
                        L.latLng(latitude, longitude),
                        L.latLng(props.endPosition.latitude, props.endPosition.longitude)
                    ],
                    routeWhileDragging: false,
                    geocoder: L.Control.Geocoder.nominatim(),
                    addWaypoints: false,
                    draggableWaypoints: false,
                    fitSelectedRoutes: true,
                    showAlternatives: true,
                }).on('routesfound', function (e) {
                    e.routes[0].coordinates.forEach(function (c, i) {
                        setTimeout(() => {
                            marker1.setLatLng([c.lat, c.lng]);
                        }, 100 * i);
                    })
                }).addTo(map);
            })
        }
    }, [])

    return null
}
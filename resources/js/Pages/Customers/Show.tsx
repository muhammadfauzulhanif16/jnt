import { HereMap } from "@/Components/HereMap";
import { Layout } from "@/Layouts/Layout";
import { FC, useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, useMapEvents } from 'react-leaflet'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
// import * as L from 'leaflet';
// import 'leaflet-routing-machine'
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

// import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js'

import { LeafletRoutingMachine } from "@/Components/LeafletRoutingMachine";
import { map } from "leaflet";

// console.log(L)
// const maps = {
//     base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// };

const UpdatePosition = ({ setPosition }: any) => {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                map.flyTo([position.coords.latitude, position.coords.longitude], map.getZoom());
            })
        }
    }, [map]);

    return null;
}

const ShowCustomer: FC<any> = (props: any) => {
    // const map = useMap()
    const [position, setPosition] = useState<any>({ lat: 0, lng: 0 })



    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             // console.log(position)

    //             setPosition({
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             });
    //             // map.flyTo(newPosition, map.getZoom());
    //         })
    //     }
    // }, []);
    // const position = 
    // const [map, setMap] = useState(null);
    // const [routingMachine, setRoutingMachine] = useState(null)
    // const [start, setStart] = useState([38.9072, -77.0369])
    // const [end, setEnd] = useState([37.7749, -122.4194])
    // const RoutingMachineRef = useRef({})

    // useEffect(() => {
    //     // Check For the map instance:
    //     if (!map) return
    //     if (map) {
    //         // Assign Control to React Ref:
    //         RoutingMachineRef.current = L.Routing.control({
    //             position: 'topleft', // Where to position control on map
    //             lineOptions: { // Options for the routing line
    //                 styles: [
    //                     {
    //                         color: '#757de8',
    //                     },
    //                 ],
    //             },
    //             waypoints: [start, end], // Point A - Point B
    //         })
    //         // Save instance to state:
    //         setRoutingMachine(RoutingMachineRef.current)
    //     }
    // }, [map])

    // useEffect(() => {
    //     if (!routingMachine) return
    //     if (routingMachine) {
    //         routingMachine.addTo(map)
    //     }
    // }, [routingMachine])

    // L.Routing.control({
    //     waypoints: [
    //         L.latLng(57.74, 11.94),
    //         L.latLng(57.6792, 11.949)
    //     ],
    //     routeWhileDragging: true,
    //     geocoder: L.Control.Geocoder.nominatim()
    // }).addTo(map);

    // console.log(props.customer)
    // const apikey = "s-zaYHY2QTdLh2sT0ilfQCcFq9oiXf0z0izpqlqWOoQ"; // Ganti dengan kunci API HERE Maps Anda
    // const initialLocation = { lat: -6.2088, lng: 106.8456 }; // Contoh lokasi awal (Jakarta)
    // const destinationLocation = { lat: -6.2297, lng: 106.8163 }; // Contoh lokasi tujuan (Jakarta)
    // const [position, setPosition] = useState(null)
    // const map = useMapEvents({
    //     click() {
    //         map.locate()
    //     },
    //     locationfound(e) {
    //         setPosition(e.latlng)
    //         map.flyTo(e.latlng, map.getZoom())
    //     },
    // })



    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            mainPageHref="customers.index"
        >
            {<MapContainer center={[
                -6.175392,
                106.827153
            ]} zoom={13} scrollWheelZoom className="w-full h-full">

                <UpdatePosition setPosition={setPosition} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[-6.175392, 106.827153]}>
    <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
</Marker> */}


                {/* <LeafletGeocoder /> */}

                <LeafletRoutingMachine startPosition={position} endPosition={props.customer}/>
            </MapContainer>}
        </Layout>
    );
};

export default ShowCustomer;

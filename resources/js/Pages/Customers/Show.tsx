import { HereMap } from "@/Components/HereMap";
import { Layout } from "@/Layouts/Layout";
import { FC, useState, useEffect, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    LayersControl,
    useMapEvents,
} from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Map } from "@/Components/Map";

const ShowCustomer: FC<any> = (props: any) => {
    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            mainPageHref="customers.index"
        >
            {
                <MapContainer
                    center={[-11.0086 + 6.0779 / 2, 95.0129 + 141.0197 / 2]}
                    zoom={16}
                    scrollWheelZoom
                    className="w-full h-full rounded-[20px]"
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Map
                        startingPointAddress={{
                            latitude: props.customer.start_lat,
                            longitude: props.customer.start_long,
                        }}
                        destinationAddress={{
                            latitude: props.customer.dest_lat,
                            longitude: props.customer.dest_long,
                        }}
                        setStartingPointAddress={() => {}}
                        setDestinationAddress={() => {}}
                    />
                </MapContainer>
            }
        </Layout>
    );
};

export default ShowCustomer;

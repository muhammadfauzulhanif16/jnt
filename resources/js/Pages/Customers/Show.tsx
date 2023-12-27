import { HereMap } from "@/Components/HereMap";
import { Layout } from "@/Layouts/Layout";
import { FC, useState, useEffect } from "react";

const ShowCustomer: FC<any> = (props: any) => {
    const apikey = "KMu8u57MuHAETwEykqn5iENZh8mpYVIsjd9UivmY1E8"; // Ganti dengan kunci API HERE Maps Anda
    const initialLocation = { lat: -6.2088, lng: 106.8456 }; // Contoh lokasi awal (Jakarta)
    const destinationLocation = { lat: -6.2297, lng: 106.8163 }; // Contoh lokasi tujuan (Jakarta)

    return (
        <Layout
            title={props.title}
            authenticated={props.auth.user}
            description={props.description}
            mainPageHref="customers.index"
        >
            <HereMap
                apikey={apikey}
                initialLocation={initialLocation}
                destinationLocation={destinationLocation}
            />
        </Layout>
    );
};

export default ShowCustomer;

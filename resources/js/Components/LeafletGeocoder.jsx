import { useEffect } from "react"
// import L from 'leaflet';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css'
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import { useMap } from "react-leaflet";

export const LeafletGeocoder = (props) => {
    const map = useMap()

    useEffect(() => {
        L.Control.geocoder({
            defaultMarkGeocode: false
        })
            .on('markgeocode', function (e) {
                var latlng = e.geocode.center;
                L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
                map.fitBounds(e.geocode.bbox);
                // var bbox = e.geocode.bbox;
                // var poly = L.polygon([
                //     bbox.getSouthEast(),
                //     bbox.getNorthEast(),
                //     bbox.getNorthWest(),
                //     bbox.getSouthWest()
                // ]).addTo(map);
                // map.fitBounds(poly.getBounds());
            })
            .addTo(map);
    }, [])

    return null
}
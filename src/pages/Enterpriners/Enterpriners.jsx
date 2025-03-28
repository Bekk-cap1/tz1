import { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Enterpriners.scss";
import { useNavigate } from "react-router-dom";
import { Context } from "../../assets/Context/Context";


function UpdateMapView() {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
}
const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

function Enterpriners() {
    const { userData, setUserData } = useContext(Context);
    const navigate = useNavigate()

    return (
        <div className="Enterpriners">
            <div className="container">
                <div className="container__inner">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={5}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        {Array.isArray(userData) && userData.map((e) => (
                            <SwiperSlide key={e.id} onClick={() => navigate(`/posts/${e.id}`)}>
                                <li>
                                    <h6>Name: <b>{e.name}</b></h6>
                                    <h6>Username: <b>{e.username}</b></h6>
                                    <h6>Email: <b>{e.email}</b></h6>
                                    <h6>Phone number: <b><a href={`tel:+${e.phone.replace(/ .*/, "")}`} target="_blank">{e.phone.replace(/ .*/, "")}</a></b></h6>
                                    <h6>Website: <b><a href="#" target="_blank">{e.website}</a></b></h6>
                                    <h6>Company: <b>{e.company.name}</b></h6>
                                    <h6>Company phase: <b>{e.company.catchPhrase}</b></h6>
                                    <h6>Address: <b>{e.address.street + ", " + e.address.suite + ", " + e.address.city}</b></h6>
                                    <h6>Zipcode: <b>{e.address.zipcode}</b></h6>
                                </li>
                                <MapContainer
                                    center={[parseFloat(e.address.geo.lat), parseFloat(e.address.geo.lng)]}
                                    zoom={4}
                                    style={{ height: "200px", width: "100%" }}
                                >
                                    <UpdateMapView />
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        position={[parseFloat(e.address.geo.lat), parseFloat(e.address.geo.lng)]}
                                        icon={customIcon}
                                    >
                                        <Popup>
                                            📍 <b>{e.name}</b>'s location <br />
                                            🌍 Lat: {e.address.geo.lat}, Lng: {e.address.geo.lng}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default Enterpriners;

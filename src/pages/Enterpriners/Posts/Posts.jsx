import { useLocation } from "react-router-dom";
import "./Posts.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../assets/Context/Context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

function Posts() {
    const location = useLocation();
    const headUserId = location.pathname.split("/posts/")[1];
    const { userData } = useContext(Context);

    const user = userData.find((e) => e.id.toString() === headUserId);

    const [postData, setPostData] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => {
                // Фильтруем посты только текущего пользователя
                setPostData(data.filter((post) => post.userId.toString() === headUserId));
            })
            .catch((error) => console.error("Ошибка при загрузке постов:", error));
    }, [headUserId]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json())
            .then((data) => setComments(data))
            .catch((error) => console.error("Ошибка при загрузке комментариев:", error));
    }, []);

    if (!user) {
        return <h2>Пользователь не найден</h2>;
    }

    return (
        <div className="Posts">
            <div className="container">
                <ul className="header__ul" key={user.id}>
                    <li>
                        <h6>Name: <b>{user.name}</b></h6>
                        <h6>Username: <b>{user.username}</b></h6>
                        <h6>Email: <b>{user.email}</b></h6>
                        <h6>Phone number: <b>
                            <a href={`tel:${user.phone.replace(/ .*/, "")}`} target="_blank">{user.phone.replace(/ .*/, "")}</a>
                        </b></h6>
                        <h6>Website: <b>
                            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
                        </b></h6>
                        <h6>Company: <b>{user.company.name}</b></h6>
                        <h6>Company phase: <b>{user.company.catchPhrase}</b></h6>
                        <h6>Address: <b>{`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</b></h6>
                        <h6>Zipcode: <b>{user.address.zipcode}</b></h6>
                    </li>

                    {user.address.geo?.lat && user.address.geo?.lng && (
                        <MapContainer
                            center={[parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]}
                            zoom={4}
                            style={{ height: "20rem", width: "60%" }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={[parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]}
                                icon={customIcon}
                            >
                                <Popup>
                                    📍 <b>{user.name}</b>'s location <br />
                                    🌍 Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </ul>
                <hr />
                <h4>Посты</h4>
                <ul className="main__ul">
                    {postData.map((post) => (
                        <li key={post.id}>
                            <h6>Title: {post.title}</h6>
                            <p>Body: {post.body}</p>
                            <hr />
                            <h5>Комментарии:</h5>
                            <ul>
                                {comments
                                    .filter((comment) => comment.postId === post.id)
                                    .map((comment) => (
                                        <li key={comment.id}>
                                            <p><b>Email: {comment.email}</b></p>
                                            <p>Name: {comment.name}</p>
                                            <p>Comment: {comment.body}</p>
                                            <hr />
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Posts;

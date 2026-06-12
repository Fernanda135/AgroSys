import { useEffect, useState } from "react";
import api from "../services/api.ts";

export default function Dashboard() {

    const [user, setUser] = useState<any>(null);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            console.log("TOKEN:", token);

            const response = await api.get("/profile", {
                headers: {
                    Authorization: token
                }
            });

            console.log(response.data);

            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {fetchProfile()}, []);


    return (
        <h1>{user ? user.name : "Carregando..."}</h1>
    );
};

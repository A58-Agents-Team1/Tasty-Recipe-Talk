import { useEffect, useState } from "react";
import { getAllPosts, getAllUsers } from "../services/users.service"
export default function Footer() {

    const [countUser, setCountUser] = useState();
    const [countPosts, setCountPosts] = useState();

    useEffect(() => {
        getAllUsers().then(data => setCountUser(data));
        getAllPosts().then(data => setCountPosts(data));
    }, []);


    return (
        <footer>
            <p>Number of created posts: {countPosts} 📜 | All rights reserved for Tasty Recipe Talk | Number of created accounts: {countUser} 👤</p>
        </footer>
    )
}
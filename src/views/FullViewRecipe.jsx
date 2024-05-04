import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from 'firebase/database';
import { db } from "../config/firebase-config";
import FullPost from "../components/FullPost";

export default function FullViewRecipe() {
    const [ post, setPost ] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        return onValue(ref(db, `posts/${id}`), snapshot => {
            setPost({
                ...snapshot.val(),
                id,
                likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
                createdOn: new Date(snapshot.val().createdOn).toString(),
            });
        });
    }, [id]);

    return (
        <div>
            <h1>FullViewRecipe</h1>
            {post && <FullPost post={post} />}
        </div>
    );
}
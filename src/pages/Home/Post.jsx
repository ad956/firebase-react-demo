import "./post.css";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

// && request.auth.uid == request.resource.data.id;

export const Post = (props) => {
  const { post } = props;

  const likesRef = collection(db, "likes");
  const [user] = useAuthState(auth);

  const addLike = async () => {
    console.log(user?.uid);
    console.log(post?.id);

    try {
      const newDoc = await addDoc(likesRef, {
        postId: post.id,
        id: user.uid,
      });

      setLike((prev) =>
        prev
          ? [...prev, { id: user.uid, likeId: newDoc.id }]
          : [{ id: user.uid, likeId: newDoc.id }]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const removeLikeQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("id", "==", user.uid)
      );

      const removeLikeDoc = await getDocs(removeLikeQuery);

      const likeId = removeLikeDoc.docs[0].id;
      const removeLikeNow = doc(db, "likes", likeId);

      await deleteDoc(removeLikeNow);

      setLike((prev) => prev && prev.filter((like) => like.likeId !== likeId));
    } catch (error) {
      console.log(error);
    }
  };

  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const [currentLike, setLike] = useState(null);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLike(data.docs.map((doc) => ({ id: doc.data().id, likeId: doc.id })));
  };

  const hasLiked = currentLike?.find((like) => like.id === user.uid);
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h2>{post.title}</h2>
      </div>
      <div className="desc">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
      </div>
      <div>
        <button className="btns" onClick={hasLiked ? removeLike : addLike}>
          {hasLiked ? <>&#128078;</> : <>&#x1F44D;</>}
        </button>
        &nbsp; &nbsp;
        {currentLike && <span>Likes : {currentLike.length}</span>}
        {/* <button className="btns"> &#128078; </button> */}
      </div>
    </div>
  );
};

import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export const HomePage = () => {
  const [user] = useAuthState(auth);
  const postsRef = collection(db, "posts");
  const [postList, setPostList] = useState(null);

  const getData = async () => {
    const data = await getDocs(postsRef);
    // console.log(data);

    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p>This is Home Page</p>
      {user && <p>{user.displayName}</p>}

      {postList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

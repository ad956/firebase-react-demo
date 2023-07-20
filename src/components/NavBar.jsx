import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "./navbar.css";

export const NavBar = () => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="nav">
      <Link className="nav-link" to={"/"}>
        Home
      </Link>{" "}
      &nbsp;
      {!user ? (
        <Link className="nav-link" to={"/login"}>
          Login
        </Link>
      ) : (
        <Link className="nav-link" to={"/createpost"}>
          Create Post
        </Link>
      )}
      &nbsp;
      {user && (
        <>
          <img src={user.photoURL} alt="user-profile" height={30} width={30} />{" "}
          &nbsp;
          <button onClick={logout}>Logout</button> &nbsp;
        </>
      )}
    </div>
  );
};

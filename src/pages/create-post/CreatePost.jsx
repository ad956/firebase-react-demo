import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreateForm } from "./CreateForm";

export const CreatePost = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <p>This is Create Post Page</p>
      {user && <p>{user.displayName}</p>}

      <CreateForm />
    </div>
  );
};

import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../../components/navbar.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    desc: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.desc,
      username: user.displayName,
      id: user.uid,
    });
    // console.log(data);

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input
        type={"text"}
        {...register("title")}
        placeholder={"Enter post title"}
      />{" "}
      <br />
      {errors.title?.message && (
        <p style={{ color: "red" }}>{errors.title.message}</p>
      )}
      <br />
      <textarea {...register("desc")} placeholder={"Enter description"} />{" "}
      <br />
      {errors.title?.message && (
        <p style={{ color: "red" }}>{errors.desc.message}</p>
      )}
      <br />
      <input type="submit" className="btn" value="Create Post" />
    </form>
  );
};

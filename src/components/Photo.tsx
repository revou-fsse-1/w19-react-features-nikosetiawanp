import { useState } from "react";
import EditImageForm from "./EditImageForm";
import DeletePhotoForm from "./DeletePhotoForm";
("./DeletePhoto");

export default function Photo(props: {
  imageId: number;
  imageTitle: string;
  imageUrl: string;
  isLiked: boolean;
  isRerender: boolean;
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const isLiked = props.isLiked;
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [editImageForm, setEditImageForm] = useState(false);
  const [deletePhotoForm, setDeletePhotoForm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const toggleEditImageForm = () => {
    setEditImageForm((editImageForm) => !editImageForm);
  };
  const toggleDeletePhotoForm = () => {
    setDeletePhotoForm((deletePhotoForm) => !deletePhotoForm);
  };

  const likePhoto = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLiked(true);

    fetch(
      `https://648b162117f1536d65ea53a5.mockapi.io/images/${props.imageId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: props.imageTitle,
          url: props.imageUrl,
          isLiked: true,
          id: props.imageId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
          console.log("POST SUCCESSFUL");
        }
        {
          throw new Error("Post Failed");
        }
      })
      .then(function (responseBody) {
        props.setIsRerender((prev) => !prev);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  const dislikePhoto = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLiked(false);

    fetch(
      `https://648b162117f1536d65ea53a5.mockapi.io/images/${props.imageId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: props.imageTitle,
          url: props.imageUrl,
          isLiked: false,
          id: props.imageId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
          console.log("POST SUCCESSFUL");
        }
        {
          throw new Error("Post Failed");
        }
      })
      .then(function (responseBody) {
        props.setIsRerender((prev) => !prev);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <>
      {editImageForm ? (
        <EditImageForm
          imageId={props.imageId}
          imageTitle={props.imageTitle}
          imageUrl={props.imageUrl}
          isLiked={props.isLiked}
          setEditImageForm={setEditImageForm}
          isRerender={props.isRerender}
          setIsRerender={props.setIsRerender}
        />
      ) : null}

      {deletePhotoForm ? (
        <DeletePhotoForm
          imageId={props.imageId}
          imageTitle={props.imageTitle}
          setDeletePhotoForm={setDeletePhotoForm}
          setIsDeleted={setIsDeleted}
          isRerender={props.isRerender}
          setIsRerender={props.setIsRerender}
        />
      ) : null}

      {!isDeleted && (
        <div
          key={props.imageId}
          className="relative mb-4 min-h-[100px] overflow-hidden rounded-2xl bg-gray-200 transition-transform hover:scale-105"
        >
          <div className="oveflow-hidden absolute z-10 h-full w-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            {isLiked ? (
              <button
                onClick={dislikePhoto}
                className="absolute right-2 top-2 w-12 rounded-full bg-red-600 px-2 text-xs font-bold text-white"
              >
                Liked
              </button>
            ) : (
              <button
                onClick={likePhoto}
                className="absolute right-2 top-2 w-12 rounded-full bg-white px-2 text-xs font-bold text-black"
              >
                Like
              </button>
            )}
            <button
              onClick={toggleEditImageForm}
              className="absolute right-2 top-8 w-12 rounded-full bg-white px-2 text-xs font-bold text-black"
            >
              Edit
            </button>
            <button
              onClick={toggleDeletePhotoForm}
              className="absolute right-2 top-14 flex w-12 justify-center rounded-full bg-white px-2 text-xs font-bold text-black"
            >
              Delete
            </button>
            <span className="absolute bottom-2 left-3 font-semibold text-white">
              {props.imageTitle}
            </span>
          </div>
          <img
            className="overflow-hidden object-cover"
            src={props.imageUrl}
            alt="img"
          />
        </div>
      )}
    </>
  );
}

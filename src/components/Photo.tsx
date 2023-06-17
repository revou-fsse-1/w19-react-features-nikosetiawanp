import { useState } from "react";
import EditImageForm from "./EditImageForm";

export default function Photo(props: {
  imageId: number;
  imageTitle: string;
  imageUrl: string;
  isLiked: boolean;
}) {
  const isLiked = props.isLiked;
  const [editImageForm, setEditImageForm] = useState(false);
  const toggleEditImageForm = () => {
    setEditImageForm((editImageForm) => !editImageForm);
  };

  const deletePhoto = (e) => {
    e.preventDefault();
    fetch(
      `https://648b162117f1536d65ea53a5.mockapi.io/images/${props.imageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
          console.log("DELETE SUCCESSFUL");
        }
        {
          throw new Error("Delet Failed");
        }
      })
      .then(function (responseBody) {
        alert("Delete successful");
        console.log(responseBody.url);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  const likePhoto = (e) => {
    console.log("handleFormSubmit ran");
    e.preventDefault();

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
        console.log(responseBody.url);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };
  const dislikePhoto = (e) => {
    console.log("handleFormSubmit ran");
    e.preventDefault();

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
        console.log(responseBody.url);
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
        />
      ) : null}
      <div
        key={props.imageId}
        className="bg-gray-200 overflow-hidden rounded-2xl relative mb-4 hover:scale-105 transition-transform"
      >
        <div className="absolute bg-black/50 opacity-0 hover:opacity-100 transition-opacity oveflow-hidden w-full h-full z-10">
          {isLiked ? (
            <button
              onClick={dislikePhoto}
              className="w-12 rounded-full absolute right-2 top-2 bg-red-600 text-white text-xs font-bold px-2"
            >
              Liked
            </button>
          ) : (
            <button
              onClick={likePhoto}
              className="w-12 rounded-full absolute right-2 top-2 bg-white text-black text-xs font-bold px-2"
            >
              Like
            </button>
          )}
          <button
            onClick={toggleEditImageForm}
            className="w-12 rounded-full absolute right-2 top-8 bg-white text-black text-xs font-bold px-2"
          >
            Edit
          </button>
          <button
            onClick={deletePhoto}
            className="w-12 rounded-full absolute flex justify-center right-2 top-14 bg-white text-black text-xs font-bold px-2"
          >
            Delete
          </button>
          <span className="text-white absolute font-semibold bottom-2 left-3">
            {props.imageTitle}
          </span>
        </div>
        <img
          className="overflow-hidden object-cover"
          src={props.imageUrl}
          alt="img"
        />
      </div>
    </>
  );
}

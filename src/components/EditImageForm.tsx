import { useState } from "react";

export default function EditImageForm(props: {
  imageId: number;
  imageTitle: string;
  imageUrl: string;
  isLiked: boolean;
  setEditImageForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState(props.imageTitle);
  const [url, setUrl] = useState(props.imageUrl);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const toggleEditImageForm = () => {
    props.setEditImageForm((editImageForm) => !editImageForm);
  };

  const handleFormSubmit = (e) => {
    console.log("handleFormSubmit ran");
    e.preventDefault();

    fetch(
      `https://648b162117f1536d65ea53a5.mockapi.io/images/${props.imageId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: title || props.imageTitle,
          url: url || props.imageUrl,
          isLiked: props.isLiked,
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
          console.log("SUCCESS");
        }
        {
          throw new Error("Post Failed");
        }
      })
      .then(function (responseBody) {
        toggleEditImageForm();
        console.log(responseBody.url);
        alert("Changes has been saved");
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <div className="z-50 w-full h-full bg-black/50 fixed top-0 left-0 flex items-center justify-center p-4">
      <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-[425px] flex flex-col items-start z-50">
        <h2 className="font-bold text-2xl mb-4">Edit image</h2>
        <form
          onSubmit={handleFormSubmit}
          action="submit"
          className="w-full flex flex-col items-start"
        >
          {/* title */}
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            onChange={handleTitleChange}
            type="text"
            id="title"
            name="title"
            placeholder={title}
            className="bg-gray-200 p-3 rounded-2xl text-sm placeholder:text-sm placeholder:font-semibold w-full outline-none mb-4"
          />
          {/* url */}
          <label className="font-semibold" htmlFor="url">
            Url
          </label>
          <input
            onChange={handleUrlChange}
            type="text"
            id="url"
            name="url"
            placeholder={url}
            className="bg-gray-200 p-3 rounded-2xl text-sm placeholder:text-sm placeholder:font-semibold w-full outline-none mb-4"
          />
          <div className="flex justify-end gap-2 w-full">
            <button
              onClick={toggleEditImageForm}
              className="bg-gray-200 text-gray-500 flex items-center flex-nowrap h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:bg-gray-100 hover:cursor-pointer transition-transform duration-300"
            >
              Cancel
            </button>
            <input
              onClick={handleFormSubmit}
              type="submit"
              value="Submit"
              className="bg-red-600 flex items-center flex-nowrap text-white h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:bg- hover:cursor-pointer transition-transform active:scale-100 duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

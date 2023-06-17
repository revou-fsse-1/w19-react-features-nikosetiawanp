import { useState } from "react";

export default function NewImageForm(props: {
  newImageForm: boolean;
  setNewImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  imagesLength: number;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleFormSubmit = (e) => {
    console.log("handleFormSubmtit ran");

    e.preventDefault();

    fetch("https://648b162117f1536d65ea53a5.mockapi.io/images/", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        url: url,
        isLiked: false,
        id: props.imagesLength + 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
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

  const toggleNewImageForm = () => {
    props.setNewImageForm((newImageForm) => !newImageForm);
  };
  return (
    <div
      className={`z-50 w-full h-full bg-black/50 fixed top-0 left-0 flex items-center justify-center p-4`}
    >
      <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-[425px] flex flex-col items-start">
        <h2 className="font-bold text-2xl mb-4">Add new image</h2>
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
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            className="bg-gray-200 p-3 rounded-2xl text-sm placeholder:text-sm placeholder:font-semibold w-full outline-none mb-4"
            onChange={handleTitleChange}
          />
          {/* url */}
          <label className="font-semibold" htmlFor="url">
            Url
          </label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Image url"
            className="bg-gray-200 p-3 rounded-2xl text-sm placeholder:text-sm placeholder:font-semibold w-full outline-none mb-4"
            onChange={handleUrlChange}
          />
          <div className="flex justify-end gap-2 w-full">
            <button
              onClick={toggleNewImageForm}
              className="bg-gray-200 text-gray-500 flex items-center flex-nowrap h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:bg-gray-100 hover:cursor-pointer transition-transform duration-300"
            >
              Cancel
            </button>
            <input
              onClick={handleFormSubmit}
              type="submit"
              value="Submit"
              className="bg-red-600 flex items-center flex-nowrap text-white h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:bg-red-500 hover:cursor-pointer transition-transform duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

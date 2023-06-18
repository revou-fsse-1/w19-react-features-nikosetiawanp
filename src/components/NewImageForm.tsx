import React, { useState, useCallback } from "react";

export default function NewImageForm(props: {
  newImageForm: boolean;
  setNewImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  imagesLength: number;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const toggleNewImageForm = () => {
    props.setNewImageForm((newImageForm) => !newImageForm);
  };

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );
  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.target.value);
    },
    []
  );

  const handleFormSubmit = useCallback((e: React.ChangeEvent<any>) => {
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
        toggleNewImageForm();
        alert("Photo has been successfully added");
        console.log(responseBody.url);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 p-4`}
    >
      <div className="flex w-full max-w-[425px] flex-col items-start rounded-2xl bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Add new image</h2>
        <form
          onSubmit={handleFormSubmit}
          action="submit"
          className="flex w-full flex-col items-start"
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
            className="mb-4 w-full rounded-2xl bg-gray-200 p-3 text-sm outline-none placeholder:text-sm placeholder:font-semibold"
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
            className="mb-4 w-full rounded-2xl bg-gray-200 p-3 text-sm outline-none placeholder:text-sm placeholder:font-semibold"
            onChange={handleUrlChange}
          />
          <div className="flex w-full justify-end gap-2">
            <button
              onClick={toggleNewImageForm}
              className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-gray-200 px-4 py-1 font-semibold text-gray-500 transition-transform duration-300 hover:cursor-pointer hover:bg-gray-100"
            >
              Cancel
            </button>
            <input
              onClick={handleFormSubmit}
              type="submit"
              value="Submit"
              className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-red-600 px-4 py-1 font-semibold text-white transition-transform duration-300 hover:cursor-pointer hover:bg-red-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

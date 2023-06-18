import { useState, useCallback } from "react";

export default function EditImageForm(props: {
  imageId: number;
  imageTitle: string;
  imageUrl: string;
  isLiked: boolean;
  isRerender: boolean;
  setEditImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState(props.imageTitle);
  const [url, setUrl] = useState(props.imageUrl);

  const handleTitleChange = useCallback((event: React.ChangeEvent<any>) => {
    setTitle(event.target.value);
  }, []);

  const handleUrlChange = useCallback((event: React.ChangeEvent<any>) => {
    setUrl(event.target.value);
  }, []);

  const toggleEditImageForm = () => {
    props.setEditImageForm((editImageForm) => !editImageForm);
  };

  const handleFormSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    toggleEditImageForm();
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
        props.setIsRerender((prev) => !prev);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 p-4">
      <div className="z-50 flex w-full max-w-[425px] flex-col items-start rounded-2xl bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Edit image</h2>
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
            onChange={handleTitleChange}
            type="text"
            id="title"
            name="title"
            placeholder={title}
            className="mb-4 w-full rounded-2xl bg-gray-200 p-3 text-sm outline-none placeholder:text-sm placeholder:font-semibold"
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
            className="mb-4 w-full rounded-2xl bg-gray-200 p-3 text-sm outline-none placeholder:text-sm placeholder:font-semibold"
          />
          <div className="flex w-full justify-end gap-2">
            <button
              onClick={toggleEditImageForm}
              className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-gray-200 px-4 py-1 font-semibold text-gray-500 transition-transform duration-300 hover:cursor-pointer hover:bg-gray-100"
            >
              Cancel
            </button>
            <input
              onClick={handleFormSubmit}
              type="submit"
              value="Submit"
              className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-red-600 px-4 py-1 font-semibold text-white transition-transform duration-300 hover:cursor-pointer hover:bg-red-500 active:scale-100"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

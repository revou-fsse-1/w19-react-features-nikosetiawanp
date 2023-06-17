import { useState, useEffect, useContext } from "react";
import NewImageForm from "./NewImageForm";
import FilterByCategoryButton from "./FilterByCategoryButton";
import Photo from "./Photo";
// import { UserContext } from "../App";

export default function HomePage() {
  const [newImageForm, setNewImageForm] = useState(false);
  const [displayIsLiked, setDisplayIsLiked] = useState(false);
  const [images, setImages] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState();

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    fetch("https://mock-api.arikmpt.com/api/user/profile", {
      method: "GET",
      headers: {
        Authorization: `${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData((userData) => (userData = data));
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch("https://648b162117f1536d65ea53a5.mockapi.io/images")
      .then((response) => response.json())
      .then((data) => {
        setImages((images) => (images = data));
      });
  }, []);

  const likedImageList = images.filter((image) => image.isLiked === true);
  console.log(likedImageList);

  // filter by search
  const filteredImageList = displayIsLiked
    ? likedImageList.filter((image) =>
        image.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : images.filter((image) =>
        image.title.toLowerCase().includes(searchInput.toLowerCase())
      );
  // render images
  const imageList = filteredImageList.map(
    (image: { id: number; title: string; url: string; isLiked: boolean }) => {
      return (
        <Photo
          imageId={image.id}
          imageTitle={image.title}
          imageUrl={image.url}
          isLiked={image.isLiked}
        />
      );
    }
  );

  // functions
  const toggleNewImageForm = () => {
    setNewImageForm((newImageForm) => !newImageForm);
  };
  const showDisplayIsLiked = () => {
    setDisplayIsLiked((displayIsLiked) => (displayIsLiked = true));
  };
  const hideDisplayIsLiked = () => {
    setDisplayIsLiked((displayIsLiked) => (displayIsLiked = false));
  };

  // delete this

  return (
    <div className="w-full px-12">
      {/* Navigation */}
      <nav className="sticky w-full flex justify-between items-center py-4 gap-4 z-50 bg-white border-b">
        <a href="#" className="font-bold text-2xl">
          MyPhoto
        </a>
        <span className="font-bold">
          {userData ? (
            "Welcome" + " " + userData.data.name + "!"
          ) : (
            <button className="px-4 py-1 bg-red-600 hover:bg-red-500">
              Log in
            </button>
          )}
        </span>
      </nav>
      {/* Search bar & filter */}
      <section className="flex justify-between gap-3 py-4 bg-white">
        <form action="submit" className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200 p-3 rounded-2xl text-sm placeholder:text-sm placeholder:font-semibold w-full outline-none"
              onChange={handleSearchInputChange}
            />
            <button className="w-[20px] absolute right-4 inset-y-0">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Ik01NS4xNDYgNTEuODg3IDQxLjU4OCAzNy43ODZBMjIuOTI2IDIyLjkyNiAwIDAgMCA0Ni45ODQgMjNjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMyAxMC4zMTgtMjMgMjMgMTAuMzE4IDIzIDIzIDIzYzQuNzYxIDAgOS4yOTgtMS40MzYgMTMuMTc3LTQuMTYybDEzLjY2MSAxNC4yMDhjLjU3MS41OTMgMS4zMzkuOTIgMi4xNjIuOTIuNzc5IDAgMS41MTgtLjI5NyAyLjA3OS0uODM3YTMuMDA0IDMuMDA0IDAgMCAwIC4wODMtNC4yNDJ6TTIzLjk4NCA2YzkuMzc0IDAgMTcgNy42MjYgMTcgMTdzLTcuNjI2IDE3LTE3IDE3LTE3LTcuNjI2LTE3LTE3IDcuNjI2LTE3IDE3LTE3eiIgZmlsbD0iIzllOWU5ZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" />{" "}
            </button>
          </div>
        </form>
        {/* filter button */}
        <button
          onClick={toggleNewImageForm}
          className={`text-xl font-bold ${
            !newImageForm
              ? "bg-gray-200 text-gray-500"
              : "bg-black/100 text-white"
          } bg-gray-200 p-2 w-[45px] rounded-2xl flex justify-center items-center hover:scale-105 hover:cursor-pointer transition-transform duration-300`}
        >
          +
        </button>
      </section>
      {/* categories */}
      <section className="flex gap-4 flex-wrap py-4">
        {/* new category button */}

        {!displayIsLiked ? (
          <button
            onClick={showDisplayIsLiked}
            className="bg-red-600 text-white flex items-center flex-nowrap  h-[30px] w-fit py-1 px-4 rounded-full font-semibold  hover:bg-red-500 hover:cursor-pointer transition-transform duration-300"
          >
            All
          </button>
        ) : (
          <button
            onClick={hideDisplayIsLiked}
            className="bg-gray-200 text-gray-500 flex items-center flex-nowrap  h-[30px] w-fit py-1 px-4 rounded-full font-semibold  hover:bg-gray-100 hover:cursor-pointer transition-transform duration-300"
          >
            All
          </button>
        )}
        {displayIsLiked ? (
          <button
            onClick={hideDisplayIsLiked}
            className="bg-red-600 text-white flex items-center flex-nowrap  h-[30px] w-fit py-1 px-4 rounded-full font-semibold  hover:bg-red-500 hover:cursor-pointer transition-transform duration-300"
          >
            Liked
          </button>
        ) : (
          <button
            onClick={showDisplayIsLiked}
            className="bg-gray-200 text-gray-500 flex items-center flex-nowrap  h-[30px] w-fit py-1 px-4 rounded-full font-semibold  hover:bg-gray-100 hover:cursor-pointer transition-transform duration-300"
          >
            Liked
          </button>
        )}
      </section>

      {/* photo container */}
      <section className="md:columns-3 lg:columns-4 gap-4 mb-8">
        {imageList}
      </section>

      {newImageForm ? (
        <NewImageForm
          newImageForm={newImageForm}
          setNewImageForm={setNewImageForm}
          imagesLength={images.length}
        />
      ) : null}
    </div>
  );
}

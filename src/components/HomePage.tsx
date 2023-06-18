import { useState, useEffect, useCallback } from "react";
import NewImageForm from "./NewImageForm";
import Photo from "./Photo";

export default function HomePage() {
  const [newImageForm, setNewImageForm] = useState(false);
  const [displayIsLiked, setDisplayIsLiked] = useState(false);
  const [images, setImages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isRerender, setIsRerender] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const [userData, setUserData] = useState({ data: { name: "Guest" } });

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setSearchInput(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (accessToken) {
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
    } else setUserData({ data: { name: "Guest" } });
  }, [accessToken, isRerender]);

  // fetch data
  useEffect(() => {
    fetch("https://648b162117f1536d65ea53a5.mockapi.io/images")
      .then((response) => response.json())
      .then((data) => {
        setImages((images) => (images = data));
      });
  }, [isRerender]);

  // filter by liked
  const likedImageList = images.filter(
    (image: { isLiked: boolean }) => image.isLiked === true
  );

  // filter by search
  const filteredImageList = displayIsLiked
    ? likedImageList.filter((image: { title: string }) =>
        image.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : images.filter((image: { title: string }) =>
        image.title.toLowerCase().includes(searchInput.toLowerCase())
      );
  // render images
  const imageList = filteredImageList.map(
    (image: { id: number; title: string; url: string; isLiked: boolean }) => {
      return (
        <Photo
          key={image.id}
          imageId={image.id}
          imageTitle={image.title}
          imageUrl={image.url}
          isLiked={image.isLiked}
          isRerender={isRerender}
          setIsRerender={setIsRerender}
        />
      );
    }
  );

  // functions
  const toggleNewImageForm = () => {
    setNewImageForm((newImageForm) => !newImageForm);
  };
  const showDisplayIsLiked = () => {
    setIsRerender((prev) => !prev);
    setDisplayIsLiked((displayIsLiked) => (displayIsLiked = true));
  };
  const hideDisplayIsLiked = () => {
    setIsRerender((prev) => !prev);
    setDisplayIsLiked((displayIsLiked) => (displayIsLiked = false));
  };

  return (
    <div className="w-full px-12 pb-8">
      <nav className="sticky z-50 flex w-full items-center justify-between gap-4 border-b bg-white py-4">
        <a href="#" className="text-2xl font-bold">
          MyPhoto
        </a>
        {/* profile picture */}
        {accessToken ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                window.location.replace("http://localhost:5173/login");
                localStorage.removeItem("accessToken");
              }}
              className="rounded-2xl  bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-500"
            >
              Logout
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black font-bold text-white">
              {userData.data.name[0].toUpperCase()}
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              window.location.replace("http://localhost:5173/login");
            }}
            className="rounded-2xl  bg-red-600 px-5 py-2 font-bold text-white hover:bg-red-500"
          >
            Login
          </button>
        )}
      </nav>
      {/* Welcome message */}
      <span className="flex w-full justify-start py-6 text-4xl font-bold">
        Welcome {userData.data.name}!
      </span>
      {/* Search bar & filter */}
      <section className="flex justify-between gap-3 bg-white py-4">
        <form action="submit" className="relative w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search image here..."
              className="w-full rounded-2xl bg-gray-200 p-3 text-sm outline-none placeholder:text-sm placeholder:font-semibold"
              onChange={handleSearchInputChange}
            />
          </div>
        </form>
        {/* filter button */}
        <button
          onClick={toggleNewImageForm}
          className={`text-xl font-bold ${
            !newImageForm
              ? "bg-gray-200 text-gray-500"
              : "bg-red-600 text-white"
          } flex w-[45px] items-center justify-center rounded-2xl bg-gray-200 p-2 transition-transform duration-300 hover:cursor-pointer hover:bg-gray-100`}
        >
          +
        </button>
      </section>
      {/* categories */}
      <section className="flex flex-wrap gap-4 py-4">
        {/* new category button */}

        {!displayIsLiked ? (
          <button
            onClick={hideDisplayIsLiked}
            className="flex h-[30px] w-fit scale-110 flex-nowrap items-center  rounded-full bg-red-600 px-4 py-1 font-semibold text-white  transition-transform duration-300 hover:cursor-pointer hover:bg-red-500"
          >
            All
          </button>
        ) : (
          <button
            onClick={hideDisplayIsLiked}
            className="flex h-[30px] w-fit flex-nowrap items-center  rounded-full bg-gray-200 px-4 py-1 font-semibold text-gray-500  transition-transform duration-300 hover:cursor-pointer hover:bg-gray-100"
          >
            All
          </button>
        )}
        {displayIsLiked ? (
          <button
            onClick={showDisplayIsLiked}
            className="flex h-[30px] w-fit scale-110 flex-nowrap items-center  rounded-full bg-red-600 px-4 py-1 font-semibold text-white  transition-transform duration-300 hover:cursor-pointer hover:bg-red-500"
          >
            Liked
          </button>
        ) : (
          <button
            onClick={showDisplayIsLiked}
            className="flex h-[30px] w-fit flex-nowrap items-center  rounded-full bg-gray-200 px-4 py-1 font-semibold text-gray-500  transition-transform duration-300 hover:cursor-pointer hover:bg-gray-100"
          >
            Liked
          </button>
        )}
      </section>
      {/* photo container */}
      <section className="mb-8 gap-4 md:columns-3 lg:columns-4">
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

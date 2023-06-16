import { useState, useEffect } from "react";
import NewImageForm from "./NewImageForm";
import FilterByCategoryButton from "./FilterByCategoryButton";
import Photo from "./Photo";

export default function HomePage() {
  const [newImageForm, setNewImageForm] = useState(false);
  const [displayIsLiked, setDisplayIsLiked] = useState(false);
  const [images, setImages] = useState([]);

  // fetch data
  useEffect(() => {
    fetch("https://648b162117f1536d65ea53a5.mockapi.io/images")
      .then((response) => response.json())
      .then((data) => {
        setImages((images) => (images = data));
        console.log(images);
      });
  }, []);

  // render images
  const imageList = images.map(
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
        <span className="font-bold">Welcome, User!</span>
      </nav>
      {/* Search bar & filter */}
      <section className="flex justify-between gap-3 py-4 bg-white">
        <form action="submit" className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200 p-3 rounded-2xl text-sm placeholder:text-sm placeholder:font-semibold w-full outline-none"
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
            className="bg-red-600 text-white flex items-center flex-nowrap  h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:scale-105 hover:cursor-pointer transition-transform duration-300"
          >
            All
          </button>
        ) : (
          <button
            onClick={hideDisplayIsLiked}
            className="bg-gray-200 text-gray-500 flex items-center flex-nowrap  h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:scale-105 hover:cursor-pointer transition-transform duration-300"
          >
            All
          </button>
        )}
        {displayIsLiked ? (
          <button
            onClick={hideDisplayIsLiked}
            className="bg-red-600 text-white flex items-center flex-nowrap  h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:scale-105 hover:cursor-pointer transition-transform duration-300"
          >
            Liked
          </button>
        ) : (
          <button
            onClick={showDisplayIsLiked}
            className="bg-gray-200 text-gray-500 flex items-center flex-nowrap  h-[40px] w-fit py-1 px-4 rounded-xl font-semibold hover:shadow-md hover:scale-105 hover:cursor-pointer transition-transform duration-300"
          >
            Liked
          </button>
        )}
      </section>

      {/* photo container */}
      <section className="md:columns-3 lg:columns-4 gap-4 mb-8">
        {imageList}
        <button
          onClick={toggleNewImageForm}
          className="bg-gray-200 relative w-full h-48 rounded-2xl overflow-hidden flex justify-center items-center hover:scale-105 transition-transform"
        >
          <div className="absolute opacity-0 hover:opacity-100 transition-opacity bg-black/50 text-white flex items-center justify-center font-semibold w-full h-full top-0 left-0">
            Add new photo
          </div>
          <img
            className="w-24"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDY0IDY0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJNNTYgNDRhMSAxIDAgMCAxLTEgMWgtNHY0YTEgMSAwIDAgMS0yIDB2LTRoLTRhMSAxIDAgMCAxIDAtMmg0di00YTEgMSAwIDAgMSAyIDB2NGg0YTEgMSAwIDAgMSAxIDFabTUgMGExMC45OTYgMTAuOTk2IDAgMCAxLTIxLjgwOSAySDZhMy4wMDMgMy4wMDMgMCAwIDEtMy0zVjEyYTMuMDAzIDMuMDAzIDAgMCAxIDMtM2g0MmEzLjAwMyAzLjAwMyAwIDAgMSAzIDN2MjEuMDVBMTEuMDExIDExLjAxMSAwIDAgMSA2MSA0NFpNNSAxMnYzMC40bDE0LjM5My0xNy45OTJhMiAyIDAgMCAxIDMuMTkuMDg3bDUuNDIgNy4wODkgNS41LTUuNTAxYTEuOTc3IDEuOTc3IDAgMCAxIDEuNTI1LS41ODMgMi4wMDEgMi4wMDEgMCAwIDEgMS40NTEuNzQ4bDcuNjg0IDguNDQ1QTEwLjkxIDEwLjkxIDAgMCAxIDQ5IDMzLjA1VjEyYTEuMDAxIDEuMDAxIDAgMCAwLTEtMUg2YTEuMDAxIDEuMDAxIDAgMCAwLTEgMVptMTUuOTc0IDEzLjY4NEw2LjI4MiA0NGgyOC42OTVaTTM5IDQ0YTEwLjk2IDEwLjk2IDAgMCAxIDMuNTctOC4wODdsLTcuNjEyLTguMzY4LTUuNzI3IDUuNjQ2TDM3LjQ5NCA0NFptMjAgMGE5IDkgMCAxIDAtOSA5IDkuMDEgOS4wMSAwIDAgMCA5LTlaTTM1IDE4YTUgNSAwIDEgMSA1IDUgNS4wMDYgNS4wMDYgMCAwIDEtNS01Wm0yIDBhMyAzIDAgMSAwIDMtMyAzLjAwMyAzLjAwMyAwIDAgMC0zIDNaIiBmaWxsPSIjOWU5ZTllIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg=="
          />
        </button>
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

export default function DeletePhotoForm(props: {
  setDeletePhotoForm: React.Dispatch<React.SetStateAction<boolean>>;
  imageTitle: string;
  imageId: number;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  isRerender: boolean;
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const toggleDeletePhotoForm = () => {
    props.setDeletePhotoForm((deletePhotoForm) => !deletePhotoForm);
  };
  const deletePhoto = (e: React.ChangeEvent<any>): void => {
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
          throw new Error("Delete Failed");
        }
      })
      .then(function () {
        props.setIsRerender((prev) => !prev);
        toggleDeletePhotoForm();
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50 p-4">
      <div className="z-40 flex flex-col items-start rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          Are you sure you want to delete {props.imageTitle}?
        </h2>
        <div className="flex w-full justify-end gap-4">
          <button
            onClick={toggleDeletePhotoForm}
            className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-gray-200 px-4 py-1 font-semibold text-gray-500 transition-transform duration-300 hover:cursor-pointer hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={deletePhoto}
            className="flex h-[40px] w-fit flex-nowrap items-center rounded-xl bg-red-600 px-4 py-1 font-semibold text-white transition-transform duration-300 hover:cursor-pointer hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

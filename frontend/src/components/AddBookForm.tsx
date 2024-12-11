import React, { useState, useRef } from "react";
import axios from "axios";

interface tForm {
  bookName: string;
  author: string;
  coverImage: File | null;
  file: File | null;
}

const AddBookForm: React.FC = () => {
  const [formData, setFormData] = useState<tForm>({
    bookName: "",
    author: "",
    coverImage: null,
    file: null,
  });

  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Refs for file inputs
  const coverImageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      // Handle file inputs
      const file = (e.target as HTMLInputElement).files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      // Handle text inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bookName || !formData.author || !formData.coverImage || !formData.file) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append("bookName", formData.bookName);
      data.append("author", formData.author);
      data.append("coverImage", formData.coverImage as Blob);  // Type casting
      data.append("file", formData.file as Blob);  // Type casting

      const response = await axios.post("/api/add/book", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / Number(progressEvent.total));
          setProgress(percentCompleted);
        },
      });

      setSuccessMessage(response.data.message);
      setErrorMessage(null);

      // Reset the form state
      setFormData({
        bookName: "",
        author: "",
        coverImage: null,
        file: null,
      });

      // Clear file inputs manually
      if (coverImageRef.current) coverImageRef.current.value = "";
      if (fileRef.current) fileRef.current.value = "";

      setProgress(0); // Reset progress bar
    } catch (error: unknown) {
      // Handle the error more safely with 'unknown'
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response?.data?.message || "An error occurred.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Book</h2>

      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Book Name</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            ref={coverImageRef}
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Book File (PDF)</label>
          <input
            type="file"
            name="file"
            ref={fileRef}
            onChange={handleChange}
            accept="application/pdf"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
          />
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        <button
          type="submit"
          disabled={progress > 0}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${progress > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;

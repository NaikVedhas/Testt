import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file!");
      return;
    }
    
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Preview the image
  };

  const { mutate: uploadImage, isLoading } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("http://localhost:5000/api/v1/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Uploaded successfully!");
      console.log("IPFS Hash:", data.ipfsHash);
      setImage(null);
      setPreview(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error uploading");
      console.log("Upload Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image first!");
      return;
    }
    uploadImage();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold m-4">Upload Image</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="file" onChange={handleImageChange} accept="image/*" className="m-4 p-2 border rounded" />
        
        {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg m-2" />}

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded mt-4" >
          {isLoading ? "Uploading..." : "Upload Now"}
        </button>
      </form>
    </div>
  );
};

export default UploadImage;

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast"
import axios from "axios";
import { useState } from "react";

const UploadImage = () => {
    
    // const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);


    const handlImagechange = (e) =>{

    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file only!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    }

    const {mutate:upload} = useMutation({
        mutationFn:async () => {
            const response = await axios.post("http://localhost:5000/api/v1/image/upload",image)
        },
        onSuccess:()=>{
            toast.success("Uploaded");
        },
        onError: (e) =>{
            toast.error(e.response.data.message || "Error uploading")
        }
    })



    const handlsubmit= (e) =>{
        e.preventDefault();
        upload();
    }

  return (
    <div className="flex  items-center">
        <h1 className="text-5xl m-4">Upload Image</h1>
        <form onSubmit={handlsubmit}>
        <input 
        type="file"
        className="bg-black text-white m-7"
        onChange={handlImagechange}
        accept="image/*" 
        />
        <button type="submit" className="text-2xl bg-red-200 c">Upload Now</button>
        </form>


    </div>
  )
}
export default UploadImage
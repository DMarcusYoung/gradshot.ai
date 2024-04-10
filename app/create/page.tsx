"use client"
import Image from 'next/image'
import { useState } from 'react'
import base64 from 'base-64'


export default function Create() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

    const upload_img = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        try {
          if (file) {
              const formData = new FormData();
              formData.append("file", file);
              fetch("/api/save_img", {
                  method: "POST",
                  body: formData,
              });
          }
        }
        catch (error) {
            console.error("Error uploading image", error);
        }
        try {
          if (!file) {
              console.error("No file selected");
              return;
          }
          const formData = new FormData();
          const gradPicFile = new File(["/grad_pic.png"], "grad_pic.png");
          const uploadedFile = file;

          const base64_base_img: string = await convertToBase64(gradPicFile) as string;
          const base64_face_img: string = await convertToBase64(uploadedFile) as string;

          formData.append("base_img", base64_base_img);
          formData.append("face_img", base64_face_img);
          const res = await fetch("/api/generate_img", {
            method: "POST",
            body: formData,
          });
          const data = await res.json()
          if (data) {
            // const decoded_image = base64.decode(data)
            setGeneratedImage("/grad_pic.png");
          }
    
        }
        catch (error) {
            console.error("Error generating image", error);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center bg-gray-100">
          <div className="flex flex-col items-center justify-center bg-zinc-900 w-full p-24">
            <h1 className="text-5xl font-bold p-6">Gradshot.ai</h1>
            <p className="text-xl">
              Graduation photos without the photoshoot
            </p>
            <label htmlFor="image_upload" className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700">
                Upload
            </label>
            <input
                style={{ display: 'none' }} 
                id="image_upload"
                type="file"
                accept="image/*"
                onChange={upload_img}
            />
          </div>
          {generatedImage && (
          <div className="mt-8">
            <Image src={generatedImage} alt="Generated Grad Img" width={500} height={500} />
          </div>
        )}
        </main>
      );
}

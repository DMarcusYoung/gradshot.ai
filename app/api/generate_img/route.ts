import { NextResponse } from "next/server";
import { NovitaSDK } from "novita-sdk";

const novitaApiKey = process.env.NOVITA_API_KEY || ""; // Set a default value if the environment variable is undefined

export async function POST(req: { formData: () => any; }, res: any) {
    // const base64_base_img = fs.readFileSync("/grad_pic.png", { encoding: 'base64' });
    // const base64_face_img = fs.readFileSync('/uploads/'+ file?.name, { encoding: 'base64' });
    const formData = await req.formData();
    const base_img = formData.get("base_img");
    const face_img = formData.get("face_img");   

    const novitaClient = new NovitaSDK(novitaApiKey);
    const params = {
        image_file: base_img, 
        face_image_file: face_img,
    };

    novitaClient.mergeFace(params) // Only novita face swap for now
        .then((res) => {
            console.log("finished!", res);
            return NextResponse.json(res)
        })
        .catch((err) => {
            console.error("error:", err);
            return NextResponse.json({ Message: "Failed", status: 500 })
        })
    
    
    return NextResponse.json(face_img)
    return NextResponse.json({ Message: "Success", status: 201 });
}
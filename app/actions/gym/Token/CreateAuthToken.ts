"use server";
import axios from "axios";
import { sessionType } from "@/app/actions/gym/FetchGymDetailsSA";

export default async function CreateAuthToken( { session }: { session: sessionType }) {
    console.log("creating auth token");
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/createauthtoken`, { 

        },{
            headers: {
                Authorization: ` ${JSON.stringify(session)}`
            }
        });

        if (response.data) {
            return {
                success: true,
                token: response.data.token,
                message: "Token created successfully"
            };
        }
        return {
            success: false,
            message: "Failed to create token"
        };
    } catch (error) {
        console.error("Error creating token:", error);
        return {
            success: false,
            message: "Error creating token"
        };
    }
}
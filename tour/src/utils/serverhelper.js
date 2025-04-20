import { backendUrl1 } from "./config";

const baseUrl = backendUrl1 || "http://localhost:3000"; // Fallback to a default URL

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
        const response = await fetch(baseUrl + route, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            // Log detailed error information
            console.error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}, URL: ${baseUrl + route}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("Error in POST request:", error); // Log error details
        throw error;
    }
};
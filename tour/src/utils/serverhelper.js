import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
        const response = await fetch(backendUrl + route, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("Error in POST request:", error);
        throw error;
    }
};
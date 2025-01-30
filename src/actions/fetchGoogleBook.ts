'use server';


export const fetchGoogleBook = async (url:string) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch image");
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}
export const getBandsSpotify = async (keyword: string, token: string): Promise<any[]> => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${keyword}&type=artist`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Spotify data");
        }

        const jsonData = await response.json();
        return jsonData.artists.items;
    } catch (error) {
        console.error("Spotify data fetch error:", error);
        return [];
    }
};

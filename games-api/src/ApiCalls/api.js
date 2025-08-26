const searchGameBaseUrl = "https://api.gamebrain.co/v1/games";
const secretKey = "";  //Enter your API key here

async function searchGames(query, offset = 0, limit = 10) {
  try {
    const response = await fetch(`${searchGameBaseUrl}?query=${query}&api-key=${secretKey}&offset=${offset}&limit=${limit}`);
    if (!response.ok) {
      throw { status: response.status, message: response.statusText };
    }
    const data = await response.json();
    return {
      results: data.results || [],
      total_results: data.total_results || 0,
    };
  } catch (error) {
    console.error("Error in searchGames:", error);
    return { results: [], total_results: 0, ErrorStatus: error.status };
  }
}

export default {
  searchGames,
};

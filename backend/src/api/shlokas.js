const API_BASE_URL = "http://localhost:5000/api";

/**
 * Fetch all shlokas from backend
 */
export async function fetchAllShlokas() {
  const response = await fetch("/api/shlokas");
  if (!response.ok) {
    throw new Error("Failed to fetch shlokas");
  }
  return response.json();
}

/**
 * Fetch single shloka by chapter & verse
 */
export const fetchShlokaById = async (chapter, verse) => {
  const response = await fetch(
    `${API_BASE_URL}/shlokas/${chapter}/${verse}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch shloka");
  }

  return response.json();
};

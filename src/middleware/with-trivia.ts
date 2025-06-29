export type CategoryHandle = (typeof categories)[number]["handle"];
export type CategoryLabel = (typeof categories)[number]["label"];
export type DifficultyHandle = (typeof difficulties)[number]["handle"];
export type DifficultyLabel = (typeof difficulties)[number]["label"];

export const categories = [
  {
    handle: "music",
    label: "Music",
  },
  {
    handle: "sport_and_leisure",
    label: "Sports & Lesiure",
  },
  {
    handle: "film_and_tv",
    label: "Film & TV",
  },
  {
    handle: "arts_and_literature",
    label: "Arts & Literature",
  },
  {
    handle: "history",
    label: "History",
  },
  {
    handle: "society_and_culture",
    label: "Society & Culture",
  },
  {
    handle: "science",
    label: "Science",
  },
  {
    handle: "geography",
    label: "Geography",
  },
  {
    handle: "food_and_drink",
    label: "Food & Drink",
  },
  {
    handle: "general_knowledge",
    label: "General Knowledge",
  },
] as const;

export const difficulties = [
  {
    handle: "easy",
    label: "Easy",
  },
  {
    handle: "medium",
    label: "Medium",
  },
  {
    handle: "hard",
    label: "Hard",
  },
];

class TriviaHandler {
  async generateQuestions(
    categories: CategoryHandle[],
    difficulties: DifficultyHandle[],
    quantity: number
  ) {
    const params = new URLSearchParams({
      limit: quantity.toString(),
      categories: categories.join(","),
      difficulties: difficulties.join(","),
    });

    const endpoint = "https://the-trivia-api.com/v2/questions";

    const response = await fetch(`${endpoint}?${params.toString()}`);
    return await response.json();
  }
}

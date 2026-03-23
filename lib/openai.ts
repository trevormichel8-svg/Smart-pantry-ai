import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateRecipeArgs = {
  ingredients: string[];
  expiringSoon?: string[];
  cuisine?: string;
  diet?: string;
  exclude?: string[];
  mealType?: string;
  maxCookTime?: number;
  pantryOnly?: boolean;
};

export async function generateRecipeJson(args: GenerateRecipeArgs) {
  const prompt = `
You are a smart kitchen assistant.
Generate a practical, appetizing recipe using the user's pantry ingredients.
Prioritize these expiring ingredients first: ${args.expiringSoon?.join(", ") || "none"}.
Available ingredients: ${args.ingredients.join(", ")}.
Cuisine preference: ${args.cuisine || "any"}.
Diet: ${args.diet || "none"}.
Excluded ingredients: ${args.exclude?.join(", ") || "none"}.
Meal type: ${args.mealType || "any"}.
Max cook time: ${args.maxCookTime || 45} minutes.
Pantry only mode: ${args.pantryOnly ? "yes" : "no"}.

Return valid JSON only with this shape:
{
  "title": "",
  "description": "",
  "prepMinutes": 0,
  "cookMinutes": 0,
  "servings": 0,
  "ingredientsUsed": [""],
  "missingIngredients": [""],
  "steps": [""],
  "wasteSavingTip": ""
}
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output_text;

  try {
    return JSON.parse(text);
  } catch {
    return {
      title: "Pantry Stir-Fry",
      description: "A flexible meal built from what you already have.",
      prepMinutes: 10,
      cookMinutes: 15,
      servings: 2,
      ingredientsUsed: args.ingredients.slice(0, 6),
      missingIngredients: [],
      steps: [
        "Prep the ingredients and cut everything into even pieces.",
        "Cook aromatics first, then add the main ingredients.",
        "Season to taste and cook until tender.",
        "Serve hot and use remaining fresh herbs or toppings.",
      ],
      wasteSavingTip: "Use the most perishable produce first and freeze leftovers if needed.",
    };
  }
}

import React, { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';
import { Plus, Heart } from './components/Icons';

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Mom's Fish Curry",
      snippet: "Put coconut, green chilies in mixer. Fry fish first. Then add curry leaves, mustard seeds tadka. Don't forget tamarind!",
      ingredients: ["Fish (pomfret)", "Coconut", "Green chilies", "Curry leaves", "Mustard seeds", "Tamarind", "Onions", "Turmeric"],
      instructions: ["Grind coconut with green chilies to make paste", "Fry fish pieces until golden", "Heat oil, add mustard seeds and curry leaves", "Add onions, cook until soft", "Add coconut paste and tamarind water", "Add fried fish and simmer"],
      cookTime: "30 mins",
      serves: "4",
      isComplete: true
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    snippet: '',
    ingredients: [],
    instructions: [],
    cookTime: '',
    serves: ''
  });

  const addRecipe = () => {
    if (newRecipe.name && newRecipe.snippet) {
      const recipe = {
        id: Date.now(),
        ...newRecipe,
        isComplete: false
      };
      setRecipes([...recipes, recipe]);
      setNewRecipe({
        name: '',
        snippet: '',
        ingredients: [],
        instructions: [],
        cookTime: '',
        serves: ''
      });
      setShowAddForm(false);
    }
  };

  const convertSnippet = (id) => {
    setRecipes(recipes.map(recipe => {
      if (recipe.id === id) {
        const snippet = recipe.snippet.toLowerCase();
        const suggestedIngredients = [];
        const suggestedInstructions = [];
        
        const ingredientKeywords = ['coconut', 'chilies', 'fish', 'curry leaves', 'mustard seeds', 'tamarind', 'onions', 'oil', 'turmeric', 'ginger', 'garlic'];
        ingredientKeywords.forEach(ingredient => {
          if (snippet.includes(ingredient)) {
            suggestedIngredients.push(ingredient.charAt(0).toUpperCase() + ingredient.slice(1));
          }
        });
        
        const sentences = recipe.snippet.split(/[.!]/).filter(s => s.trim());
        sentences.forEach(sentence => {
          if (sentence.trim()) {
            suggestedInstructions.push(sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1));
          }
        });
        
        return {
          ...recipe,
          ingredients: suggestedIngredients,
          instructions: suggestedInstructions,
          isComplete: true
        };
      }
      return recipe;
    }));
  };

  const shareRecipe = (recipe) => {
    const shareText = `${recipe.name}\n\nIngredients:\n${recipe.ingredients.map(ing => `• ${ing}`).join('\n')}\n\nInstructions:\n${recipe.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}\n\nCook Time: ${recipe.cookTime} | Serves: ${recipe.serves}`;
    
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Recipe copied to clipboard!');
    }
  };

  const updateRecipeField = (id, field, value) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, [field]: value } : recipe
    ));
  };

  const addIngredient = (id, ingredient) => {
    if (ingredient.trim()) {
      setRecipes(recipes.map(recipe => 
        recipe.id === id 
          ? { ...recipe, ingredients: [...recipe.ingredients, ingredient.trim()] }
          : recipe
      ));
    }
  };

  const addInstruction = (id, instruction) => {
    if (instruction.trim()) {
      setRecipes(recipes.map(recipe => 
        recipe.id === id 
          ? { ...recipe, instructions: [...recipe.instructions, instruction.trim()] }
          : recipe
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3">Mom's Konkan Kitchen</h1>
          <p className="text-gray-500 text-lg font-light">Preserving family recipes, one call at a time</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Add Recipe Button */}
        <div className="mb-16">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-3"
          >
            <Plus />
            Add New Recipe
          </button>
        </div>

        {/* Add Recipe Form */}
        <RecipeForm 
          showForm={showAddForm}
          setShowForm={setShowAddForm}
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          onAddRecipe={addRecipe}
        />

        {/* Recipes */}
        <div className="space-y-12">
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe.id}
              recipe={recipe}
              editingId={editingId}
              setEditingId={setEditingId}
              onShareRecipe={shareRecipe}
              onConvertSnippet={convertSnippet}
              onUpdateRecipeField={updateRecipeField}
              onAddIngredient={addIngredient}
              onAddInstruction={addInstruction}
            />
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">No recipes yet</h3>
            <p className="text-gray-500 font-light">Start by adding your first recipe from mom</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
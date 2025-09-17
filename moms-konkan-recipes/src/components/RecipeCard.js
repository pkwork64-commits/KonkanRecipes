import React from 'react';
import { Edit, Share } from './Icons';

const RecipeCard = ({ 
  recipe, 
  editingId, 
  setEditingId, 
  onShareRecipe, 
  onConvertSnippet,
  onUpdateRecipeField,
  onAddIngredient,
  onAddInstruction 
}) => {
  return (
    <div className="bg-white shadow-sm border border-gray-100">
      {/* Recipe Header */}
      <div className="p-12 border-b border-gray-50">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-4">{recipe.name}</h3>
            <div className="flex items-center gap-8 text-gray-500 text-sm">
              {recipe.cookTime && <span>{recipe.cookTime}</span>}
              {recipe.serves && <span>Serves {recipe.serves}</span>}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditingId(editingId === recipe.id ? null : recipe.id)}
              className="p-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <Edit className="text-gray-400" />
            </button>
            <button
              onClick={() => onShareRecipe(recipe)}
              className="p-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <Share className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* Original Snippet */}
        <div className="mb-12 p-8 bg-rose-50 border border-rose-100">
          <h4 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wide">Mom's Words</h4>
          <p className="text-gray-700 text-lg font-light italic leading-relaxed">"{recipe.snippet}"</p>
          {!recipe.isComplete && (
            <button
              onClick={() => onConvertSnippet(recipe.id)}
              className="mt-6 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Convert to Recipe
            </button>
          )}
        </div>

        {/* Full Recipe */}
        {recipe.isComplete && (
          <div className="grid md:grid-cols-2 gap-16">
            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-6 uppercase tracking-wide">Ingredients</h4>
              <div className="space-y-4">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-rose-300 rounded-full mt-3 flex-shrink-0"></div>
                    {editingId === recipe.id ? (
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => {
                          const newIngredients = [...recipe.ingredients];
                          newIngredients[index] = e.target.value;
                          onUpdateRecipeField(recipe.id, 'ingredients', newIngredients);
                        }}
                        className="flex-1 p-2 border border-gray-200 text-gray-700 font-light"
                      />
                    ) : (
                      <span className="text-gray-700 font-light text-lg">{ingredient}</span>
                    )}
                  </div>
                ))}
              </div>
              {editingId === recipe.id && (
                <input
                  type="text"
                  placeholder="Add ingredient"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onAddIngredient(recipe.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-3 border border-gray-200 text-sm mt-4"
                />
              )}
            </div>

            {/* Instructions */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-6 uppercase tracking-wide">Instructions</h4>
              <div className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    {editingId === recipe.id ? (
                      <textarea
                        value={instruction}
                        onChange={(e) => {
                          const newInstructions = [...recipe.instructions];
                          newInstructions[index] = e.target.value;
                          onUpdateRecipeField(recipe.id, 'instructions', newInstructions);
                        }}
                        className="flex-1 p-3 border border-gray-200 resize-none font-light"
                        rows="2"
                      />
                    ) : (
                      <span className="flex-1 text-gray-700 font-light text-lg leading-relaxed">{instruction}</span>
                    )}
                  </div>
                ))}
              </div>
              {editingId === recipe.id && (
                <textarea
                  placeholder="Add instruction"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onAddInstruction(recipe.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-3 border border-gray-200 text-sm mt-4"
                  rows="2"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
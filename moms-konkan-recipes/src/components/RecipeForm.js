import React from 'react';
import { X, Plus } from './Icons';

const RecipeForm = ({ 
  showForm, 
  setShowForm, 
  newRecipe, 
  setNewRecipe, 
  onAddRecipe 
}) => {
  if (!showForm) return null;

  return (
    <div className="bg-white p-12 mb-16 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-2xl font-light text-gray-900">What did Mom say?</h3>
        <button 
          onClick={() => setShowForm(false)}
          className="p-2 hover:bg-gray-50 transition-colors duration-200"
        >
          <X className="text-gray-400" />
        </button>
      </div>
      
      <div className="space-y-8">
        <input
          type="text"
          placeholder="Recipe name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
          className="w-full p-4 border border-gray-200 text-lg font-light focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors duration-200"
        />
        
        <textarea
          placeholder="Paste exactly what mom said - don't worry about formatting..."
          value={newRecipe.snippet}
          onChange={(e) => setNewRecipe({...newRecipe, snippet: e.target.value})}
          className="w-full p-4 border border-gray-200 h-32 resize-none text-lg font-light focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors duration-200"
        />
        
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Cook time"
            value={newRecipe.cookTime}
            onChange={(e) => setNewRecipe({...newRecipe, cookTime: e.target.value})}
            className="p-4 border border-gray-200 text-lg font-light focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors duration-200"
          />
          <input
            type="text"
            placeholder="Serves"
            value={newRecipe.serves}
            onChange={(e) => setNewRecipe({...newRecipe, serves: e.target.value})}
            className="p-4 border border-gray-200 text-lg font-light focus:ring-1 focus:ring-gray-300 focus:border-gray-300 transition-colors duration-200"
          />
        </div>
        
        <button
          onClick={onAddRecipe}
          className="bg-black text-white px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;
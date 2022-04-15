import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes= async function(){
  try {
    const id=window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    recipeView.renderSpinner()
    //1) Fetch Data
    await model.loadRecipe(id);
    //const{recipe} = model.state


    //2) Rendering Recepi
    recipeView.render(model.state.recipe)

    
  } catch (error) {
    console.log(error)
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    const query=searchView.getQuery();
    if(!query) return;
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init= function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();

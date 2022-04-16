import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }

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
    resultsView.renderSpinner();
    //1 load search result
    const query=searchView.getQuery();
    if(!query) return;
    //2 load search result
    await model.loadSearchResults(query);
    //3 render result
    //resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage(5))
    paginationView.render(model.state.search);

  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const init= function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();

import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');


console.log('test')



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
  }
}

const init= function(){
  recipeView.addHandlerRender(controlRecipes);
}

init();

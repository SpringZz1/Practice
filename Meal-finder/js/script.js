const randomBtn = document.getElementById('random');
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const singleMealEl = document.getElementById('single-meal');

/**
 * Search meal and fetch from API
 */
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal

    // Get search term
    const term = search.value;

    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search rusults for '${term}'</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
                } else {
                    mealsEl.innerHTML = data.meals
                        .map(
                            meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
                        )
                        .join('');
                }
            });
        // Clear search text
        search.value = '';
    } else {
        alert('Please enter a search trim');
    }
}

/**
 * Fetch meal by id
 */
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealDOM(meal);
        });
}

/**
 * Fetch random meal from API
 */
function getRandomMeal() {
    // Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealDOM(meal);
        });
}

/**
 * Add meal to DOM
 */
function addMealDOM(meal) {
    const ingredient = [];

    for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredient.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}



// Add eventlistenr
submit.addEventListener('click', searchMeal);
randomBtn.addEventListener('click',getRandomMeal);
mealsEl.addEventListener('click',e=>{
    const mealInfo = e.path.find(item=>{
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    });

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealByID(mealID);
    }
});
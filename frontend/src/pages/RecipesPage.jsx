import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../recipes.css";

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [activeTag, setActiveTag] = useState("Все");

  const filterTags = [
    "Все",
    "Здоровый кишечник",
    "Витамины",
    "Баланс",
    "Завтрак",
    "Здоровье сердца",
    "Высокий белок",
  ];

  useEffect(() => {
    const url =
      activeTag === "Все"
        ? "http://localhost:5000/api/recipes"
        : `http://localhost:5000/api/recipes?tag=${encodeURIComponent(activeTag)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Ошибка загрузки рецептов:", err));
  }, [activeTag]);

  return (
    <div className="recipes-container">
      <div className="recipes-header">
        <h1>
          Ешьте вкусно. <span>Живите здорово.</span>
        </h1>
        <p>
          Медицински обоснованные рецепты для здоровья кишечника, сердца и
          контроля веса.
        </p>
      </div>

      <div className="recipes-filters">
        {filterTags.map((tag) => (
          <span
            key={tag}
            className={`filter-pill ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <Link
            to={`/recipes/${recipe.id}`}
            className="recipe-card"
            key={recipe.id}
          >
            <div className="card-image-wrapper">
              <img src={recipe.image} alt={recipe.title} />
              <div className="card-tags">
                {recipe.tags.map((tag, index) => (
                  <span className="tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-content">
              <h3 className="card-title">{recipe.title}</h3>
              <p className="card-ingredients">{recipe.description}</p>

              <div className="card-stats">
                <span>🔥 {recipe.calories} ккал</span>
                <span>🥩 {recipe.protein}г белка</span>
                <span>⏱ {recipe.totalTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;

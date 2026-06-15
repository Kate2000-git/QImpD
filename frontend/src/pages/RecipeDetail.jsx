import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../recipes.css";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Рецепт не найден");
        }
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки рецепта:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px", fontSize: "20px" }}>
        Загрузка рецепта...
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>{error || "Рецепт не найден!"}</h2>
        <Link
          to="/recipes"
          style={{ color: "#E53E3E", textDecoration: "underline" }}
        >
          Вернуться к списку рецептов
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        className="recipe-detail-hero"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <Link to="/recipes" className="back-link">
          ← Все рецепты
        </Link>
        <div className="hero-content">
          <div
            className="card-tags"
            style={{
              position: "relative",
              bottom: 0,
              left: 0,
              marginBottom: "15px",
            }}
          >
            {recipe.tags.map((tag, index) => (
              <span className="tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-header">
          <h1>{recipe.title}</h1>
          <p className="detail-desc">{recipe.description}</p>
        </div>

        <div className="time-stats">
          <div className="time-stat-box">
            ВРЕМЯ <strong>{recipe.totalTime}</strong>
          </div>
          <div className="time-stat-box">
            ГОТОВКА <strong>{recipe.prepTime}</strong>
          </div>
          <div className="time-stat-box">
            ПОДГОТОВКА <strong>{recipe.cookTime}</strong>
          </div>
          <div className="time-stat-box">
            ПОРЦИИ <strong>{recipe.servings}</strong>
          </div>
        </div>

        <div className="macros-row">
          <div className="macro-box highlight">
            <span className="macro-value">{recipe.calories}</span>
            <span className="macro-label">Ккал</span>
          </div>
          <div className="macro-box">
            <span className="macro-value">{recipe.protein} г</span>
            <span className="macro-label">Белки</span>
          </div>
          <div className="macro-box">
            <span className="macro-value">{recipe.carbs} г</span>
            <span className="macro-label">Углеводы</span>
          </div>
          <div className="macro-box">
            <span className="macro-value">{recipe.fat} г</span>
            <span className="macro-label">Жиры</span>
          </div>
        </div>

        <div className="recipe-layout">
          <div className="steps-section">
            <h3>Способ приготовления</h3>
            <div className="steps-list">
              {recipe.steps.map((step, index) => (
                <div className="step-item" key={index}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <h4>
                      Шаг {index + 1}: {step.title}
                    </h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ingredients-section">
            <div className="ingredients-box">
              <h3>Ингредиенты</h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#718096",
                  marginTop: "-15px",
                }}
              >
                На {recipe.servings} порции
              </p>
              <ul className="ingredients-list">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://anna_user:secretpassword@localhost:5432/nutrition_db'
});

const formatRussianDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatRecipe = (recipe, tagsList, stepsList) => {
  const prep = recipe.prep_time || 0;
  const prepTimeValue = Math.max(1, Math.round(prep * 0.6));
  const cookTimeValue = Math.max(0, Math.round(prep * 0.4));

  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description || "",
    ingredients: recipe.ingredients
      ? recipe.ingredients.split('|').map(i => i.trim()).filter(Boolean)
      : [],
    image: recipe.image_url || "",
    tags: tagsList || [],
    calories: recipe.calories || 0,
    protein: recipe.protein || 0,
    carbs: recipe.carbs || 0,
    fat: recipe.fat || 0,
    totalTime: `${prep} мин`,
    prepTime: `${prepTimeValue} мин`,
    cookTime: `${cookTimeValue} мин`,
    servings: recipe.servings || 1,
    steps: stepsList || []
  };
};

const formatPost = (post, tagsList) => {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || "",
    content: post.content
      ? post.content.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
      : [],
    image: post.image_url || "",
    tags: tagsList || [],
    date: formatRussianDate(post.created_at),
    readTime: post.read_time || "5 мин"
  };
};

app.get('/api/recipes', async (req, res) => {
  const { tag } = req.query;

  try {
    let recipesQuery = 'SELECT * FROM recipes ORDER BY id DESC';
    const queryParams = [];

    if (tag) {
      recipesQuery = `
        SELECT r.* FROM recipes r
        JOIN tags_recipes tr ON r.id = tr.recipe_id
        JOIN tags t ON tr.tag_id = t.id
        WHERE LOWER(t.name) = LOWER($1)
        ORDER BY r.id DESC`;
      queryParams.push(tag);
    }

    const recipesResult = await pool.query(recipesQuery, queryParams);

    const tagsResult = await pool.query(`
      SELECT tr.recipe_id, t.name 
      FROM tags t 
      JOIN tags_recipes tr ON t.id = tr.tag_id
    `);

    const stepsResult = await pool.query('SELECT * FROM recipe_steps ORDER BY id ASC');

    const recipes = recipesResult.rows;
    const allTags = tagsResult.rows;
    const allSteps = stepsResult.rows;

    const formattedRecipes = recipes.map(recipe => {
      const recipeTags = allTags
        .filter(t => t.recipe_id === recipe.id)
        .map(t => t.name);

      const recipeSteps = allSteps
        .filter(s => s.recipe_id === recipe.id)
        .map(s => ({ title: s.title, desc: s.description }));

      return formatRecipe(recipe, recipeTags, recipeSteps);
    });

    res.json(formattedRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipeResult = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    
    if (recipeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Рецепт не найден' });
    }
    const recipe = recipeResult.rows[0];

    const tagsResult = await pool.query(`
      SELECT t.name FROM tags t
      JOIN tags_recipes tr ON t.id = tr.tag_id
      WHERE tr.recipe_id = $1
    `, [id]);

    const stepsResult = await pool.query(`
      SELECT title, description as desc 
      FROM recipe_steps 
      WHERE recipe_id = $1 
      ORDER BY id ASC
    `, [id]);

    const recipeTags = tagsResult.rows.map(t => t.name);
    const recipeSteps = stepsResult.rows;

    const formattedRecipe = formatRecipe(recipe, recipeTags, recipeSteps);
    res.json(formattedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts', async (req, res) => {
  const { tag } = req.query;

  try {
    let postsQuery = 'SELECT * FROM posts ORDER BY created_at DESC';
    const queryParams = [];

    if (tag) {
      postsQuery = `
        SELECT p.* FROM posts p
        JOIN tags_posts tp ON p.id = tp.post_id
        JOIN tags t ON tp.tag_id = t.id
        WHERE LOWER(t.name) = LOWER($1)
        ORDER BY p.created_at DESC`;
      queryParams.push(tag);
    }

    const postsResult = await pool.query(postsQuery, queryParams);
    
    const tagsResult = await pool.query(`
      SELECT tp.post_id, t.name 
      FROM tags t 
      JOIN tags_posts tp ON t.id = tp.tag_id
    `);

    const posts = postsResult.rows;
    const allTags = tagsResult.rows;

    const formattedPosts = posts.map(post => {
      const postTags = allTags
        .filter(t => t.post_id === post.id)
        .map(t => t.name);

      return formatPost(post, postTags);
    });

    res.json(formattedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const postResult = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }
    const post = postResult.rows[0];

    const tagsResult = await pool.query(`
      SELECT t.name FROM tags t
      JOIN tags_posts tp ON t.id = tp.tag_id
      WHERE tp.post_id = $1
    `, [id]);

    const postTags = tagsResult.rows.map(t => t.name);

    const formattedPost = formatPost(post, postTags);
    res.json(formattedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { firstName, lastName, email, phone, message, consentPhone, consentEmail } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Пожалуйста, заполните все обязательные поля' });
  }

  try {
    const queryText = `
      INSERT INTO contact_requests (first_name, last_name, email, phone, message, consent_phone, consent_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      firstName, 
      lastName, 
      email, 
      phone, 
      message, 
      consentPhone || false, 
      consentEmail || false
    ];

    const result = await pool.query(queryText, values);
    res.status(201).json({ message: 'Заявка успешно сохранена', data: result.rows[0] });
  } catch (err) {
    console.error('Ошибка сохранения заявки в базу данных:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера при обработке заявки' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
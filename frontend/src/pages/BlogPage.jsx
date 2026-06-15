import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../blog.css";

function BlogPage() {

  const [posts, setPosts] = useState([]);
  const [activeTag, setActiveTag] = useState("Все");

  const filterTags = [
    "Все",
    "Здоровый кишечник",
    "Витамины",
    "Иммунитет",
    "Баланс",
    "Женское здоровье",
    "Высокий белок",
  ];

  useEffect(() => {
    const url =
      activeTag === "Все"
        ? "http://localhost:5000/api/posts"
        : `http://localhost:5000/api/posts?tag=${encodeURIComponent(activeTag)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Ошибка загрузки статей:", err));
  }, [activeTag]);

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Полезные статьи</h1>
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

      {featuredPost && (
        <Link to={`/blog/${featuredPost.id}`} className="featured-post">
          <div className="featured-image-wrapper">
            <img src={featuredPost.image} alt={featuredPost.title} />
            <div className="post-tags">
              {featuredPost.tags.map((tag, index) => (
                <span className="post-tag" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="featured-content">
            <h2 className="featured-title">{featuredPost.title}</h2>
            <p className="featured-excerpt">{featuredPost.excerpt} [...]</p>
            <span className="btn-read-more">Читать статью</span>
          </div>
        </Link>
      )}

      <div className="blog-grid">
        {gridPosts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            className="grid-post-card"
            key={post.id}
          >
            <div className="grid-image-wrapper">
              <img src={post.image} alt={post.title} />
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span className="post-tag" key={index}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid-content">
              <div className="grid-meta">
                {post.date} • {post.readTime} чтения
              </div>
              <h3 className="grid-title">{post.title}</h3>
              <p className="grid-excerpt">{post.excerpt}</p>
              <span className="grid-read-link">Читать далее →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;

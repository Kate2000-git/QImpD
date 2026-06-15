import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../blog.css";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Статья не найдена");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки статьи:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px", fontSize: "20px" }}>
        Загрузка статьи...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <h2>{error || "Статья не найдена!"}</h2>
        <Link
          to="/blog"
          style={{ color: "#E53E3E", textDecoration: "underline" }}
        >
          Вернуться к списку статей
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div
        className="post-detail-hero"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <Link to="/blog" className="back-to-blog-btn">
          ← Вернуться в блог
        </Link>

        <div className="post-hero-content">
          <div
            className="post-tags"
            style={{ position: "relative", bottom: 0, left: 0 }}
          >
            {post.tags.map((tag, index) => (
              <span className="post-tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <article className="post-article-container">
        <h1 className="post-article-title">{post.title}</h1>

        <div className="post-article-meta">
          <span>📅 {post.date}</span>
          <span>⏱ {post.readTime} чтения</span>
        </div>

        <div className="post-article-text">
          {post.content
            .toString()
            .split("\\n")
            .map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
        </div>
      </article>
    </div>
  );
}

export default PostDetail;

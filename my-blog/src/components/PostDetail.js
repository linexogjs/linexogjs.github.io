import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = posts.find((p) => p.id === parseInt(id));

    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/");
  };

  if (!post) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", fontFamily: "'Roboto', sans-serif" }}>
      <h1 style={{ fontSize: "30px", color: "#333" }}>{post.title}</h1>
      <p style={{ color: "#777", fontSize: "16px", marginBottom: "20px" }}>
        작성 시간: {new Date(post.createdAt).toLocaleString()}
      </p>

      {/* 이미지가 있을 경우 이미지 미리보기 */}
      {post.image && (
        <div style={{ marginBottom: "20px" }}>
          <img
            src={post.image}
            alt="첨부 이미지"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
          />
        </div>
      )}

      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", marginBottom: "30px" }}>
        <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#555" }}>{post.content}</p>
      </div>

      {/* 수정, 삭제 버튼 배치 */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button
          onClick={() => navigate(`/edit/${id}`)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#1976D2"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#2196F3"}
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#e53935"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default PostDetail;

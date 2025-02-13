import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const hasIncreasedView = useRef(false); // ✅ 조회수 증가 여부 체크

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = posts.find((p) => p.id === parseInt(id));

    if (foundPost) {
      if (!hasIncreasedView.current) {
        // ✅ 조회수 증가 로직을 한 번만 실행
        foundPost.views = (foundPost.views || 0) + 1;
        hasIncreasedView.current = true; // 다시 실행되지 않도록 설정

        // ✅ 증가된 조회수를 localStorage에 반영
        const updatedPosts = posts.map((p) =>
          p.id === foundPost.id ? foundPost : p
        );
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
      }

      setPost(foundPost);
    } else {
      navigate("/"); // 게시글이 없으면 홈으로 이동
    }
  }, [id, navigate]);

  const handleDelete = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/"); // 삭제 후 홈으로 이동
  };

  if (!post) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", fontFamily: "'Roboto', sans-serif" }}>
      <h1 style={{ fontSize: "30px", color: "#333" }}>{post.title}</h1>
      <p style={{ color: "#777", fontSize: "16px", marginBottom: "10px" }}>
        작성 시간: {new Date(post.createdAt).toLocaleString()}
      </p>
      <p style={{ color: "#777", fontSize: "16px", marginBottom: "20px" }}>
        👀 조회수: {post.views} {/* ✅ 조회수 표시 */}
      </p>

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
          onMouseOver={(e) => e.target.style.backgroundColor = "#d32f2f"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#f44336"}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default PostDetail;

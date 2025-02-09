import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    // 📌 최신 게시글이 상단에 오도록 정렬 (updatedAt 기준)
    storedPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setPosts(storedPosts);
  }, []);

  // 🔍 선택된 카테고리 및 검색어 필터링
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "전체" || post.category.trim().toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", fontFamily: "'Roboto', sans-serif", display: "flex", gap: "20px" }}>
      
      {/* 📌 왼쪽 카테고리 사이드바 */}
      <aside style={{ width: "200px", padding: "10px", borderRight: "2px solid #ddd" }}>
        <h3>카테고리</h3>
        {["전체", "프로젝트", "프론트엔드", "백엔드", "취미 잡담"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              display: "block",
              margin: "5px 0",
              padding: "8px",
              width: "100%",
              textAlign: "left",
              backgroundColor: selectedCategory === category ? "#2196F3" : "transparent",
              color: selectedCategory === category ? "#fff" : "#333",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {category}
          </button>
        ))}
      </aside>

      {/* 📌 메인 콘텐츠 */}
      <main style={{ flex: 1 }}>
        <h1 style={{ textAlign: "center", color: "#333" }}>TaeHeon_Developer</h1>

        {/* 🔍 검색창 */}
        <input
          type="text"
          placeholder="게시글 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "calc(100% - 30px)",  // 검색창 크기 조정
            padding: "10px",
            marginBottom: "15px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginLeft: "15px",  // 왼쪽 여백 추가
          }}
        />

        {/* ✍ 새 게시글 작성 버튼 */}
        <Link to="/editor">
          <button
            style={{
              padding: "10px 16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              float: "right",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            새 게시글 작성
          </button>
        </Link>

        {/* 📜 게시글 리스트 */}
        <div style={{ marginTop: "50px" }}>
          {filteredPosts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>저장된 게시글이 없습니다.</p>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  marginBottom: "20px",
                  borderBottom: "2px solid #ddd",
                  paddingBottom: "20px",
                }}
              >
                <h2 style={{ fontSize: "24px", color: "#333" }}>
                  <Link
                    to={`/post/${post.id}`}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    {post.title}
                  </Link>
                </h2>
                <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
                  {post.content.slice(0, 100)}...
                </p>
                <p style={{ color: "#777", fontSize: "14px", fontWeight: "bold" }}>
                  📌 카테고리 : {post.category || "기타"}
                </p>
              </div>
            ))
          )}
        </div>
      </main>

      {/* 📌 오른쪽 인기 게시글 */}
      <aside style={{ width: "250px", padding: "10px", borderLeft: "2px solid #ddd" }}>
        <h3>🔥 인기 게시글</h3>
        <ul style={{ paddingLeft: "0" }}>
          {posts.slice(0, 3).map((post) => (
            <li key={post.id} style={{ listStyle: "none", marginBottom: "10px" }}>
              <Link to={`/post/${post.id}`} style={{ textDecoration: "none", color: "#333" }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Home;

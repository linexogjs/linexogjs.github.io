import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 5; // 한 페이지당 표시할 게시글 수
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크 모드 상태

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts); // 게시물 초기화
  }, []);

  // 🔍 검색 및 카테고리 필터링
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "전체" || post.category.trim().toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 📌 최신순으로 정렬 (최신순)
  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // 📌 페이지네이션 계산
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const displayedPosts = sortedPosts.slice(startIndex, endIndex);

  // 📌 인기 게시물 (조회수 높은 순)
  const popularPosts = posts
    .sort((a, b) => b.views - a.views) // 조회수 기준 내림차순 정렬
    .slice(0, 3); // 상위 3개만 표시

  // 다크모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 다크모드 스타일
  const appStyles = {
    backgroundColor: isDarkMode ? "#2c2c2c" : "#fff",
    color: isDarkMode ? "#fff" : "#333",
    transition: "background-color 0.3s ease, color 0.3s ease",
    minHeight: "100vh", // 전체 화면을 차지하도록 수정
    display: "flex",
    position: "relative", // 이미지들이 왼쪽 하단에 있을 수 있도록 부모에 상대 위치 추가
  };

  const sidebarStyles = {
    width: "200px",
    padding: "10px",
    borderRight: "2px solid #ddd",
    backgroundColor: isDarkMode ? "#333" : "#fff", // 다크모드 시 배경색 변경
    color: isDarkMode ? "#fff" : "#333", // 다크모드 시 텍스트 색상 변경
  };

  const mainStyles = {
    flex: 1,
    padding: "20px",
    backgroundColor: isDarkMode ? "#333" : "#fff", // 다크모드 시 배경색 변경
    color: isDarkMode ? "#fff" : "#333", // 다크모드 시 텍스트 색상 변경
  };

  const buttonStyles = {
    padding: "8px",
    backgroundColor: isDarkMode ? "#333" : "#2196F3",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    borderRadius: "5px",
  };

  const linkStyles = {
    textDecoration: "none",
    color: isDarkMode ? "#fff" : "#333", // 다크모드 시 링크 텍스트 색상 변경
  };

  return (
    <div style={appStyles}>
      {/* 📌 왼쪽 카테고리 사이드바 */}
      <aside style={sidebarStyles}>
        <h3>카테고리</h3>
        {["전체", "프로젝트", "프론트엔드", "백엔드", "취미 잡담"].map((category) => (
          <button
            key={category}
            onClick={() => { setSelectedCategory(category); setCurrentPage(1); }} // ✅ 변경 시 1페이지로 이동
            style={{
              display: "block",
              margin: "5px 0",
              padding: "8px",
              width: "100%",
              textAlign: "left",
              backgroundColor: selectedCategory === category ? "#2196F3" : "transparent",
              color: selectedCategory === category ? "#fff" : isDarkMode ? "#fff" : "#333", // 다크모드 시 텍스트 색상 변경
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
      <main style={mainStyles}>
        <h1 style={{ textAlign: "center" }}>TaeHeon_Developer</h1>

        {/* 🔍 검색창 */}
        <input
          type="text"
          placeholder="게시글 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "calc(100% - 30px)",
            padding: "10px",
            marginBottom: "15px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginLeft: "15px",
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
          {displayedPosts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>저장된 게시글이 없습니다.</p>
          ) : (
            displayedPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  marginBottom: "20px",
                  borderBottom: "2px solid #ddd",
                  paddingBottom: "20px",
                }}
              >
                <h2 style={{ fontSize: "24px" }}>
                  <Link
                    to={`/post/${post.id}`}
                    style={linkStyles}
                  >
                    {post.title}
                  </Link>
                </h2>
                <p style={{ color: isDarkMode ? "#ccc" : "#555", fontSize: "16px", lineHeight: "1.5" }}>
                  {post.content.slice(0, 100)}...
                </p>
                <p style={{ color: isDarkMode ? "#bbb" : "#777", fontSize: "14px", fontWeight: "bold" }}>
                  📌 카테고리 : {post.category || "기타"}
                </p>
              </div>
            ))
          )}
        </div>

        {/* 📌 페이지네이션 */}
        {totalPages > 1 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  margin: "5px",
                  padding: "8px 12px",
                  backgroundColor: currentPage === index + 1 ? "#007bff" : "#f1f1f1",
                  color: currentPage === index + 1 ? "#fff" : "#000",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {/* 📌 오른쪽 인기 게시글 */}
      <aside style={{ width: "250px", padding: "10px", borderLeft: "2px solid #ddd" }}>
        <h3>🔥 인기 게시글</h3>
        <ul style={{ paddingLeft: "0" }}>
          {popularPosts.map((post) => (
            <li key={post.id} style={{ listStyle: "none", marginBottom: "10px" }}>
              <Link to={`/post/${post.id}`} style={linkStyles}>
                {post.title} ( 👈 조회수 : {post.views}회)
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* 📌 다크모드 전환 버튼과 GitHub 아이콘 왼쪽 하단 */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <img
          src={isDarkMode ? "/Icon/whiteblack.png" : "/Icon/whiteblack.png"} // 다크모드 상태에 따라 아이콘 변경
          alt="Toggle Dark Mode"
          onClick={toggleDarkMode}
          style={{
            cursor: "pointer",
            width: "30px", // 원하는 크기 조정
            height: "30px",
            transition: "all 0.3s ease",
          }}
        />
        <img
          src="/Icon/githubIcon.png" // GitHub 아이콘 이미지 경로
          alt="GitHub"
          style={{
            cursor: "pointer",
            width: "30px",
            height: "30px",
          }}
          onClick={() => window.open("https://github.com/linexogjs", "_blank")}
        />
      </div>
    </div>
  );
};

export default Home;

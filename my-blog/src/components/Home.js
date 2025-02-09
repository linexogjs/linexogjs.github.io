import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const sortedPosts = storedPosts.sort((a, b) => b.id - a.id); // 최근 작성된 글이 위로 오도록 정렬
    setPosts(sortedPosts);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "잘못된 날짜"; // 날짜가 잘못된 경우 처리
    }
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h1>박태헌의 풀스택 개발자 블로그</h1>
      <Link to="/editor">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          새 게시글 작성
        </button>
      </Link>

      <div>
        {posts.length === 0 ? (
          <p>저장된 게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "20px",
              }}
            >
              <h2>
                <Link
                  to={`/post/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {post.title}
                </Link>
              </h2>
              <p>{post.content.slice(0, 100)}...</p>
              <p style={{ color: "#888" }}>
                작성 시간: {formatDate(post.createdAt)}
              </p>
              {post.createdAt !== post.updatedAt && (
                <p style={{ color: "#888" }}>
                  수정 시간: {formatDate(post.updatedAt)}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // 로컬스토리지에서 게시글 가져오기
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((p) => p.id === parseInt(id));

    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      navigate("/");  // 게시글이 없으면 홈으로 돌아가기
    }
  }, [id, navigate]);

  const handleSavePost = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((post) =>
      post.id === parseInt(id)
        ? {
            ...post,
            title,
            content,
            updatedAt: new Date().toISOString(), // 수정 시간 갱신
          }
        : post
    );

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    navigate("/");  // 수정 후 홈으로 돌아가기
  };

  return (
    <div>
      <h1>게시글 수정</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <button onClick={handleSavePost}>수정 완료</button>
    </div>
  );
};

export default EditPost;

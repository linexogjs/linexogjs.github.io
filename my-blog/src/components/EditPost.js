import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("프로젝트"); // 기본값을 '프로젝트'로 설정
    const [imagePreview, setImagePreview] = useState("");
  
    useEffect(() => {
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      const foundPost = posts.find((p) => p.id === parseInt(id));
      if (foundPost) {
        setPost(foundPost);
        setTitle(foundPost.title);
        setContent(foundPost.content);
        setCategory(foundPost.category); // 카테고리 값 설정
        setImagePreview(foundPost.image || "");
      } else {
        navigate("/");
      }
    }, [id, navigate]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = posts.map((p) =>
        p.id === parseInt(id)
          ? { ...p, title, content, category, updatedAt: new Date().toISOString(), image: imagePreview }
          : p
      );
  
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      navigate("/");
    };
  
    return (
      <div style={{ maxWidth: "800px", margin: "20px auto" }}>
        <h1>게시글 수정</h1>
        {post && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }}
              />
            </div>
  
            <div>
              <label>카테고리 선택</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)} // 카테고리 값 변경
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }}
              >
                <option value="프로젝트">프로젝트</option>
                <option value="프론트엔드">프론트엔드</option>
                <option value="백엔드">백엔드</option>
                <option value="취미 잡담">취미 잡담</option>
              </select>
            </div>
  
            <div>
              <label>내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px", minHeight: "200px" }}
              />
            </div>
  
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <div>
                <label>이미지 첨부</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setImagePreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "5px" }}
                />
              </div>
              {imagePreview && (
                <div style={{ marginTop: "10px", marginLeft: "20px" }}>
                  <img
                    src={imagePreview}
                    alt="미리보기"
                    style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover", borderRadius: "5px" }}
                  />
                </div>
              )}
            </div>
  
            <button
              type="submit"
              style={{
                padding: "12px 20px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              게시글 수정 완료
            </button>
          </form>
        )}
      </div>
    );
  };
  
export default EditPost;

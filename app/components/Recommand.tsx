import { useState, useEffect } from "react";

export default function Recommand({ reviewNm }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const fetchLikes = async () => {
    const res = await fetch(`/api/post/like?id=${reviewNm}`);
    const data = await res.json();
    setLike(data.like || 0);
    setDislike(data.dislikes || 0);
    setHasLiked(localStorage.getItem(`liked-${reviewNm}`) === "true");
    setHasDisliked(localStorage.getItem(`disliked-${reviewNm}`) === "true");
  };
  useEffect(() => {
    if (reviewNm) {
      fetchLikes();
    }
  }, [reviewNm]);

  const handleLike = async () => {
    const action = hasLiked ? "unlike" : "like";
    try {
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: reviewNm, type: action }),
      });
      const data = await res.json();
      setLike(data.likes || 0);
      setDislike(data.dislikes || 0);
      setHasLiked(!hasLiked);
      localStorage.setItem(`liked-${reviewNm}`, !hasLiked ? "true" : "false");
      if (hasDisliked) {
        setHasDisliked(false);
        localStorage.setItem(`disliked-${reviewNm}`, "false");
      }
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };
  const handleDislike = async () => {
    const action = hasDisliked ? "undislike" : "dislike";
    try {
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: reviewNm, type: action }),
      });
      const data = await res.json();
      setLike(data.likes || 0);
      setDislike(data.dislikes || 0);
      setHasDisliked(!hasDisliked);
      localStorage.setItem(
        `disliked-${reviewNm}`,
        !hasDisliked ? "true" : "false"
      );
      if (hasLiked) {
        setHasLiked(false);
        localStorage.setItem(`liked-${reviewNm}`, "false");
      }
    } catch (error) {
      console.error("Failed to update dislike:", error);
    }
  };

  return (
    <>
      <button onClick={handleLike} className="btn flex-1 ">
        추천({like})
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={hasLiked ? "red" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <button onClick={handleDislike} className="btn flex-1 ">
        비추천({dislike})
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={hasDisliked ? "blue" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치를 감지하는 함수
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 페이지 맨 위로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 ">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-orange-400 text-white shadow-lg hover:bg-orange-600 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowUp} className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

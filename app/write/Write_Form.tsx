"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "./Form";
import CleanW from "./CleanW";
import ServiceW from "./ServiceW";
import ConvenienceW from "./ConvenienceW";

interface Review {
  _id: string;
  userId: string;
  contentId: string;
  review: string;
  email: string;
  createdAt: string;
}

export default function Write_Form() {
  const [reviewText, setReviewText] = useState("");
  const { data: session } = useSession();
  const [clean, setClean] = useState<number>(0);
  const [service, setServiec] = useState<number>(0);
  const [convenience, setConvenience] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const contentId = searchParams.get("contentId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      signIn();
      return;
    }

    try {
      const response = await fetch("/api/post/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId,
          userId: session?.user?.name,
          review: reviewText,
          email: session?.user?.email,
          createdAt: new Date().toISOString(),
          clean,
          service,
          convenience,
        }),
      });

      const result: { review: Review } = await response.json();

      if (response.ok) {
        const newReview: Review = {
          _id: result.review._id,
          userId: session?.user?.name,
          contentId: contentId as string,
          review: reviewText,
          email: session?.user?.email,
          createdAt: new Date().toISOString(),
          clean,
          service,
          convenience,
        };
        setReviewText("");
        router.back();
      } else {
        alert(result.message || "오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("리뷰 제출 중 오류가 발생했습니다.", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const handleButtonClick = () => {
    if (clean === 0 || service === 0 || convenience === 0) {
      alert("별점을 모두 체크해주세요.");
    } else {
      handleSubmit(new Event('submit') as React.FormEvent); 
    }
  };

  return (
    <div className="w-full flex items-center justify-center my-4">
      <div className=" p-8  w-full">
        <h2 className="text-2xl font-bold mb-6">리뷰</h2>
        <div className="bg-gray-50 rounded-xl">
          <CleanW onChange={setClean} />
          <ServiceW onChange={setServiec} />
          <ConvenienceW onChange={setConvenience} />
        </div>
        <Form
          session={session}
          handleSubmit={handleSubmit}
          reviewText={reviewText}
          setReviewText={setReviewText}
          handleButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
}

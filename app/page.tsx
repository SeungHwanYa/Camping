"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Induty from "./components/Induty";
import Region_Option from "./components/Region_Option";

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getCities = (region) => {
    switch (region) {
      case "서울시":
        return ["전체"];
      case "인천시":
        return ["전체"];
      case "경기도":
        return [
          "전체",
          "수원시",
          "안양시",
          "의왕시",
          "과천시",
          "군포시",
          "성남시",
          "광주시",
          "이천시",
          "양평군",
          "여주군",
          "하남시",
          "광명시",
          "김포시",
          "부천시",
          "시흥시",
          "안산시",
          "평택시",
          "용인시",
          "안성시",
          "화성시",
          "오산시",
          "파주시",
          "의정부시",
          "구리시",
          "고양시",
          "양주시",
          "남양주시",
          "동두천시",
          "포천시",
          "연천군",
          "가평군",
        ];
      case "강원도":
        return [
          "전체",
          "강릉시",
          "동해시",
          "삼척시",
          "속초시",
          "원주시",
          "춘천시",
          "태백시",
          "고성군",
          "양구군",
          "양양군",
          "영월군",
          "인제군",
          "정선군",
          "철원군",
          "평창군",
          "홍천군",
          "화천군",
          "횡성군",
        ];
      case "충청북도":
        return [
          "전체",
          "청주시",
          "충주시",
          "제천시",
          "음성군",
          "진천군",
          "옥천군",
          "영동군",
          "증평군",
          "괴산군",
          "보은군",
          "단양군",
        ];
      case "대전시":
        return ["전체"];
      case "세종시":
        return ["전체"];
      case "충청남도":
        return [
          "전체",
          "천안시",
          "공주시",
          "보령시",
          "아산시",
          "서산시",
          "논산시",
          "계룡시",
          "당진시",
          "금산군",
          "부여군",
          "서천군",
          "청양군",
          "홍성군",
          "예산군",
          "태안군",
        ];
      case "전라북도":
        return [
          "전체",
          "전주시",
          "군산시",
          "익산시",
          "정읍시",
          "남원시",
          "김제시",
          "완주군",
          "진안군",
          "무주군",
          "장수군",
          "임실군",
          "순창군",
          "고창군",
          "부안군",
        ];
      case "광주시":
        return ["전체"];
      case "전라남도":
        return [
          "전체",
          "목포시",
          "여수시",
          "나주시",
          "순천시",
          "광양시",
          "담양군",
          "곡성군",
          "구례군",
          "고흥군",
          "보성군",
          "화순군",
          "장흥군",
          "강진군",
          "해남군",
          "영암군",
          "무안군",
          "함평군",
          "영광군",
          "장성군",
          "완도군",
          "진도군",
          "신안군",
        ];
      case "대구시":
        return ["전체"];
      case "경상북도":
        return [
          "전체",
          "포항시",
          "경주시",
          "안동시",
          "김천시",
          "구미시",
          "영주시",
          "영천시",
          "상주시",
          "문경시",
          "경산시",
          "의성군",
          "청송군",
          "영양군",
          "영덕군",
          "청도군",
          "고령군",
          "성주군",
          "칠곡군",
          "예천군",
          "봉화군",
          "울진군",
          "울릉군",
        ];
      case "부산시":
        return ["전체"];
      case "울산시":
        return ["전체"];
      case "경상남도":
        return [
          "전체",
          "부산",
          "울산",
          "창원시",
          "진주시",
          "김해시",
          "양산시",
          "거제시",
          "통영시",
          "사천시",
          "밀양시",
          "의령군",
          "함안군",
          "창녕군",
          "고성군",
          "남해군",
          "하동군",
          "산청군",
          "함양군",
          "거창군",
          "합천군",
        ];

      case "제주시":
        return ["전체", "제주시", "서귀포시"];
      default:
        return ["시·군을 선택하세요!"];
    }
  };

  const getDoNm = (region) => {
    switch (region) {
      case "서울시":
        return "서울시";
      case "인천시":
        return "인천시";
      case "경기도":
        return "경기도";
      case "강원도":
        return "강원도";
      case "충청북도":
        return "충청북도";
      case "대전시":
        return "대전시";
      case "세종시":
        return "세종시";
      case "충청남도":
        return "충청남도";
      case "전라북도":
        return "전라북도";
      case "광주시":
        return "광주시";
      case "전라남도":
        return "전라남도";
      case "대구시":
        return "대구시";
      case "경상북도":
        return "경상북도";
      case "부산시":
        return "부산시";
      case "울산시":
        return "울산시";
      case "경상남도":
        return "경상남도";
      case "제주도":
        return "제주도";
      default:
        return "";
    }
  };
  const handleSearch = () => {
    let queryRegion = "";
    let queryDoNm = "";

    if (selectedCity === "전체" || selectedCity === "") {
      queryDoNm = getDoNm(selectedRegion);
      queryRegion = "전체";
    } else {
      queryRegion = selectedCity || selectedRegion;
      queryDoNm = getDoNm(selectedRegion);
    }

    router.push(`/camplist?region=${queryRegion}&doNm=${queryDoNm}`);
  };

  return (
    <div>
      <Induty />
      <Region_Option
        handleRegionChange={handleRegionChange}
        handleCityChange={handleCityChange}
        selectedCity={selectedCity}
        getCities={getCities}
        selectedRegion={selectedRegion}
        handleSearch={handleSearch}
      />
    </div>
  );
}

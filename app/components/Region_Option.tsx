interface OptionProps {
  handleRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCity: string;
  getCities: (region: string) => string[];
  selectedRegion: string;
  handleSearch: () => void;
}

export default function Option({
  handleRegionChange,
  handleCityChange,
  selectedCity,
  getCities,
  selectedRegion,
  handleSearch,
}: OptionProps) {
  return (
    <div className="px-2 py-32">
      <select
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-300"
        onChange={handleRegionChange}
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline>')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
        }}
      >
        <option>지역을 선택하세요!</option>
        <option>서울시</option>
        <option>인천시</option>
        <option>경기도</option>
        <option>강원도</option>
        <option>충청북도</option>
        <option>충청남도</option>
        <option>대전시</option>
        <option>세종시</option>
        <option>전라북도</option>
        <option>광주시</option>
        <option>전라남도</option>
        <option>경상북도</option>
        <option>대구시</option>
        <option>경상남도</option>
        <option>부산시</option>
        <option>울산시</option>
        <option>제주도</option>
      </select>

      <select
        className="mt-4 block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-300"
        onChange={handleCityChange}
        value={selectedCity}
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline>')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
        }}
      >
        {getCities(selectedRegion).map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="flex justify-end">
        <button
          onClick={handleSearch}
          className="mt-2 bg-orange-100 px-4 py-2 text-gray-800 rounded-xl hover:bg-orange-300 ease-in duration-500 hover:text-gray-100"
        >
          검색
        </button>
      </div>
    </div>
  );
}

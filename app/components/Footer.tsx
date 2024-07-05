import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="text-gray-700 mx-auto w-700px bg-gray-200 p-10">
      <div className="flex items-center justify-center gap-10">
        <div>이용약관</div>
        <div>서비스 약관</div>
      </div>
      <div className="flex items-center justify-center gap-10 pt-5">
        <Link href={"https://github.com/SeungHwanYa/camping"}>
          <FontAwesomeIcon icon={faGithub} className="w-8 h-8" />
        </Link>
        <Link
          href={"https://www.notion.so/e75f6946e1bd4d2399a50f5795c32e00?pvs=4"}
        >
          <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div>대표자: 양승환</div>
        <div>전화번호: 010-4366-6640</div>
        <div>이메일: didtmdghkssl@naver.com</div>
      </div>
    </footer>
  );
}

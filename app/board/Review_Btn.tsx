import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function btn({ contentId }: any) {
  return (
    <div className="flex justify-end pt-8 pr-12">
      <Link href={`/write?contentId=${contentId}`}>
        <div className="font-bold text-gray-500 hover:text-orange-400 duration-500 text-center">
          리뷰작성 <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    </div>
  );
}

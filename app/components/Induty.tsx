import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTent,
  faCampground,
  faCaravan,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Induty() {
  const buttonClass =
    "bg-orange-100 rounded-xl p-10 hover:bg-orange-300 ease-in duration-500 group";
  const iconClass =
    "text-gray-800 text-6xl group-hover:text-gray-200 duration-500";

  return (
    <div className="w-full flex justify-between pt-32 px-8">
      <div className="text-center">
        <Link href={"/indutylist?induty=자동차야영장"}>
          <button className={buttonClass}>
            <FontAwesomeIcon icon={faTent} className={iconClass} />
          </button>
        </Link>
        <div className="font-bold mt-4">오토캠핑</div>
      </div>
      <div className="text-center">
        <Link href={"/indutylist?induty=카라반"}>
          <button className={buttonClass}>
            <FontAwesomeIcon icon={faCaravan} className={iconClass} />
          </button>
        </Link>
        <div className="font-bold mt-4">카라반</div>
      </div>
      <div className="text-center">
        <Link href={"/indutylist?induty=글램핑"}>
          <button className={buttonClass}>
            <FontAwesomeIcon icon={faCampground} className={iconClass} />
          </button>
        </Link>
        <div className="font-bold mt-4">글램핑</div>
      </div>
    </div>
  );
}

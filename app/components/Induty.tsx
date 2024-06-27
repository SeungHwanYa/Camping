import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTent,
  faCampground,
  faCaravan,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Induty() {
  return (
    <div className="w-full flex justify-between justify-center pt-32">
      <div>
        <Link href={"/indutylist?induty=자동차야영장"}>
          <button className="bg-orange-100 rounded-xl p-10 hover:bg-orange-300 ease-in duration-500 group">
            <FontAwesomeIcon
              icon={faTent}
              className="text-gray-800 text-6xl group-hover:text-gray-200 duration-500"
            />
          </button>
        </Link>
        <div className="text-center mt-4">오토캠핑</div>
      </div>
      <div>
        <Link href={"/indutylist?induty=카라반"}>
          <button className="bg-orange-100 rounded-xl p-10 hover:bg-orange-300 ease-in duration-500 group">
            <FontAwesomeIcon
              icon={faCaravan}
              className="text-gray-800 text-6xl group-hover:text-gray-200 duration-500"
            />
          </button>
        </Link>
        <div className="text-center mt-4">카라반</div>
      </div>
      <div>
        <Link href={"/indutylist?induty=글램핑"}>
          <button className="bg-orange-100 rounded-xl p-10 hover:bg-orange-300 ease-in duration-500 group">
            <FontAwesomeIcon
              icon={faCampground}
              className="text-gray-800 text-6xl group-hover:text-gray-200 duration-500"
            />
          </button>
        </Link>
        <div className="text-center mt-4">글램핑</div>
      </div>
    </div>
  );
}

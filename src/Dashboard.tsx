import { Link} from "react-router-dom";
import { Button } from "./components/ui/button";

import { PlayIcon } from "lucide-react";
export default function Dashboard() {

  return (
    <div className="text-center flex flex-col items-center space-y-4 mt-10">
      <span className="text-3xl font-semibold">Hi,Adeeti</span>
      <span className="flex justify-center items-center space-x-2">
        <span className="text-xl flex  items-center ">
          <span className=" mx-1">
            start quiz
          </span>
          <PlayIcon/>
        </span>

        <Link to="/test">
          <Button className="px-5 ">Start</Button>
        </Link>
      </span>
    </div>
  );
}

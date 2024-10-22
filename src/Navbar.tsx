import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ReloadIcon } from "@radix-ui/react-icons";
import { imgdata } from "./store/const";
import { useAuth } from "./context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { cn } from "./lib/utils";
import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

export default function Navbar() {
  const { theme } = useTheme();
  const aut = useAuth();
  const username = aut?.user?.email?.split("@")[0];
  const image = imgdata[username]?.img;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur text-foreground py-2",
        theme === "dark" && "bg-dark/95 text-dark-foreground"
      )}
    >
      <div className="container flex h-14 items-center mx-auto px-24 justify-between ">
        <div className="mr-4 flex">
          <a
            href="/"
            className={cn(
              "mr-6 flex items-center space-x-2 text-neutral-800",
              theme === "dark" && "text-dark-foreground"
            )}
          >
            <span className="flex items-center space-x-2">
              <ReloadIcon className="h-6 w-6" />
              <span className="font-bold text-2xl">Revise</span>
            </span>
          </a>
        </div>
        <nav className="flex items-center justify-between space-x-2 ">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className={cn(
                "relative h-8 w-8 rounded-full",
                theme === "dark" && "border-dark-foreground"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={image} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
            <ModeToggle/>
          </div>
        </nav>
      </div>
    </header>
  );
}



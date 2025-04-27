import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Menu,
  Sun,
  Moon,
  MonitorCog,
  Users,
  BookA,
  CalendarFold,
  LogOut,
  Home,
  
} from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";
import {  useNavigate } from "react-router-dom";

export const MdNavbarDropdown = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  
  const logOut = () => {
    localStorage.removeItem("token"); 
    navigate("/", { replace: true });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Menu className=" h-[1.5rem] w-[1.5rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Admin</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/admin/upload-students")}>
            <Users />
            <span>Students</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/admin/upload-subjects")}>
            <BookA />
            <span>Subjects</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/admin/upload-timetable")}>
            <CalendarFold />
            <span>Timetable</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <MonitorCog />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=> navigate("/admin")}>
          <Home/>
          <span>Home</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logOut()}>
          <LogOut />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

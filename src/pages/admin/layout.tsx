import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Uploads } from "@/components/admin/admin-uploads-dropdown";

import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MdNavbarDropdown } from "@/components/admin/admin-navbar-dropdown";

const adminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <div className="flex flex-col h-screen">
      <nav>
        <div className="h-[80px] w-full p-4  grid md:grid-cols-3 grid-cols-2">
          <div className="flex justify-start items-center text-xl md:text-2xl pl-4">
            <span className="cursor-pointer">
              <AnimatedShinyText onClick={() => navigate("/")}>
                PresencePro
              </AnimatedShinyText>
            </span>
          </div>
          <div className="md:flex justify-center items-center text-[17px] gap-6 hidden">
            <span onClick={() => navigate("/admin")} className="cursor-pointer">
              <AnimatedShinyText>Students</AnimatedShinyText>
            </span>
            <span onClick={() => navigate("/admin/timetable")} className="cursor-pointer">
              <AnimatedShinyText>Timetable</AnimatedShinyText>
            </span>
            <span onClick={() => navigate("/admin/subjects")} className="cursor-pointer">
              <AnimatedShinyText>Subjects</AnimatedShinyText>
            </span>
            
          </div>
          <div className="flex justify-end items-center md:hidden">
            <MdNavbarDropdown />
          </div>
          <div className="md:flex justify-end items-center gap-2  hidden">
            <div>
              <Button
                onClick={() => handleLogout()}
                className="border bg-background shadow-xs hover:border-red-400 hover:bg-accent text-muted-foreground dark:bg-input/30  dark:hover:bg-input/50 cursor-pointer"
              >
                Log Out
              </Button>
            </div>
            <div>
              <Uploads />
            </div>
            <div className="cursor-pointer">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default adminLayout;

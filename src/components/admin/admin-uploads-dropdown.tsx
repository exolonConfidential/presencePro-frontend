import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { CloudUpload, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookA, CalendarFold } from "lucide-react";

export const Uploads = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  size="icon" className="border bg-background shadow-xs hover:border-green-400 hover:bg-accent text-muted-foreground dark:bg-input/30  dark:hover:bg-input/50 cursor-pointer">
          <CloudUpload className="h-[1.5rem] w-[1.5rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Upload Data</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/admin/upload-students")}>
          <Users />
          <span>Students</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin/upload-subjects" )}>
          <BookA />
          <span>Subjects</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin/upload-timetable")}>
          <CalendarFold />
          <span>Timetable</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

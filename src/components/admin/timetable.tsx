import axios from "axios";
import { useEffect, useState } from "react";

import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

type timetable = {
  id: string;
  subjectCode: string;
  day: "Monday" | "Tuesday" | "Thursday" | "Wednesday" | "Friday" | "Saturday";
  year: "One" | "Two" | "Three" | "Four";
  startTime: string;
  endTime: string;
};
const Years = ["One", "Two", "Three", "Four"];

export const Timetable = () => {
  const [timetable, setTimetable] = useState<timetable[]>([]);
  const [yearFilter, setYearFilter] = useState<string>("Four");
  const [loading, setLoading] = useState<boolean>();
  const token = localStorage.getItem("token");


  const handleRemove = async (id:string)=>{
    try {
        const requestConfig = {
            url: "https://presence-pro-backend.onrender.com/admin/TtRemoveById",
            method: 'delete',
            params: {
                id: id
            },
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const res = await axios.request(requestConfig);
        if(res.status == 200) {
            setTimetable((pre)=> pre.filter((t)=> t.id != id))
        }
    } catch (error) {
        
    }
  }

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (yearFilter) queryParams.append("year", yearFilter);
      const requestConfig = {
        url: `https://presence-pro-backend.onrender.com/admin/timetable?${queryParams}`,
        method: "get",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.request(requestConfig);

      if (res.status == 200) setTimetable(res.data.timetable);
      setLoading(false);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [yearFilter]);

  return (
    <Card className="p-6 overflow-auto">
      <CardContent className="overflow-x-auto overflow-y-auto max-h-[80vh]">
      <div>
        <Select onValueChange={setYearFilter} value={yearFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {Years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-2">
        {loading ? (
          "Loading..."
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Subject Code</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timetable.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.year}</TableCell>
                  <TableCell>{t.day}</TableCell>
                  <TableCell>{t.subjectCode}</TableCell>
                  <TableCell>{t.startTime}</TableCell>
                  <TableCell>{t.endTime}</TableCell>
                  <TableCell>
                    <Button size={"sm"} variant="destructive" className="cursor-pointer" onClick={()=>handleRemove(t.id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      </CardContent>
    </Card>
  );
};

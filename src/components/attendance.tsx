import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  rollNo: string;
  subjectCode: string;
  url: string;
};

type attendance = {
  subjectCode: string;
  timestamp: Date;
};

type responseType = {
  attendance: attendance[];
};

export const Attendance = ({ rollNo, subjectCode, url }: props) => {
  const [attendance, setAttendance] = useState<attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const requestConfig = {
        url: url,
        method: "get",
        params: {
          rollNo,
          subjectCode,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.request<responseType>(requestConfig);
      setAttendance(res.data.attendance);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Attendance for {subjectCode}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full rounded-md" />
            ))}
          </div>
        ) : attendance.length === 0 ? (
          <p className="text-gray-500">No attendance records found.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((entry, idnx) => {
                const dateObj = new Date(entry.timestamp);
                return (
                  <TableRow key={idnx}>
                    <TableCell>{dateObj.toLocaleDateString()}</TableCell>
                    <TableCell>{dateObj.toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
                    <TableCell>{dateObj.toLocaleTimeString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

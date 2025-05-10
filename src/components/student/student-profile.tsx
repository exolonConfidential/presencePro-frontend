import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";

type subjects = {
  name: string;
  code: string;
  teacher: string;
  year: "One" | "Two" | "Three" | "Four";
};
type student = {
  name: string;
  rollNo: string;
  branch: "electronics" | "computer" | "information" | "biotech" | "chemical";
  year: "One" | "Two" | "Three" | "Four";
};
type studentHomeResponse = {
  subjects: subjects[];
  student: student;
};
type props = {
  url: string;
  credential: string;
  navigateUrl: string;
};

export const StudentProfile = ({ url, credential, navigateUrl }: props) => {
  const [subjects, setSubjects] = useState<subjects[]>([]);
  const [student, setStudent] = useState<student>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleView = (subjectCode: string) => {
    navigate(`${navigateUrl}/subject/${subjectCode}/rollNo/${credential}`, {replace: true});
  };

  const fetchStudentHome = async () => {
    setLoading(true);
    try {
      const requestConfig = {
        url: url,
        method: "get",
        params: {
          rollNo: credential,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.request<studentHomeResponse>(requestConfig);

      setSubjects(res.data.subjects);
      setStudent(res.data.student);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudentHome();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="bg-muted p-4 rounded-xl shadow">
        {loading ? (
          <>
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-5 w-1/3" />
          </>
        ) : (
          student && (
            <div>
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-muted-foreground">
                Roll No: {student.rollNo} | Year: {student.year} | Branch:{" "}
                {student.branch.charAt(0).toUpperCase() +
                  student.branch.slice(1)}
              </p>
            </div>
          )
        )}
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Subjects For Attendance</h3>
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.code}>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  <TableCell>{subject.year}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => handleView(subject.code)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

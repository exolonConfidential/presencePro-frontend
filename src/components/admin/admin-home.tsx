import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "../ui/pagination";
import { Card } from "../ui/card";
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
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { getPaginationRange } from "@/utils/getPaginationRange";

const years = ["One", "Two", "Three", "Four"];
const branches = [
  "electronics",
  "computer",
  "information",
  "biotech",
  "chemical",
];

const PAGE_SIZE = 10;
type Student = {
  id: string;
  name: string;
  year: "One" | "Two" | "Three" | "Four";
  branch: "electronics" | "computer" | "information" | "biotech" | "chemical";
  password: string | null;
  rollNo: string;
  enrolled: boolean;
  fingerprintId?: string;
};

type StudentResponse = {
  students: Student[];
  total: number;
  page: number;
  pageSize: number;
};

// Main export function
const AdminPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [yearFilter, setYearFilter] = useState<string>("");
  const [branchFilter, setBranchFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const range = getPaginationRange(page, totalPages);

  // Delete Student
  const removeStudent = async (rollNo: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/student/remove?rollNo=${rollNo}`,{
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setStudents((prev) => prev.filter((s) => s.rollNo !== rollNo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Enrole Fingerprint
  const handleEnrollToggle = async (
    rollNo: string,
    currentlyEnrolled: boolean
  ) => {
    try {
      const endpoint = currentlyEnrolled
        ? `http://localhost:3000/student/unenroll?rollNo=${rollNo}`
        : `http://localhost:3000/student/enroll?rollNo=${rollNo}`;

      const res = await axios.put(
        endpoint,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setStudents((prev) =>
          prev.map((s) =>
            s.rollNo === rollNo ? { ...s, enrolled: !currentlyEnrolled } : s
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle enrollment:", err);
    }
  };

  // Getting Students from database
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (yearFilter !== "all") queryParams.append("year", yearFilter);
      if (branchFilter !== "all") queryParams.append("branch", branchFilter);
      queryParams.append("page", page.toString());
      queryParams.append("pageSize", PAGE_SIZE.toString());

      const res = await axios.get<StudentResponse>(
        `http://localhost:3000/student/students?${queryParams.toString()}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStudents(res.data.students);
      setTotalPages(Math.ceil(res.data.total / PAGE_SIZE));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [yearFilter, branchFilter, page]);

  return (
    <div>
      <Card className="p-2">
        <div className="flex gap-4">
          <Select onValueChange={setYearFilter} value={yearFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setBranchFilter} value={branchFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {branches.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          "Loading..."
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Fingerprint Id</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id} >
                  <TableCell>{s.rollNo}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.year}</TableCell>
                  <TableCell>{s.branch}</TableCell>
                  <TableCell>{s.fingerprintId}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant={s.enrolled ? "destructive" : "default"}
                      onClick={() => handleEnrollToggle(s.rollNo, s.enrolled)}
                    >
                      {s.enrolled ? "Delete" : "Enroll"}
                    </Button>
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant="secondary"
                      onClick={() => removeStudent(s.rollNo)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Pagination>
          <PaginationContent className="flex justify-center pt-4">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {range.map((item, idx) => (
              <PaginationItem key={idx}>
                {item === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={page === (item as number)}
                    onClick={() => setPage(item as number)}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </div>
  );
};

export default AdminPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

type subjects = {
    id: string
  code: string;
  name: string;
  teacher: string;
  createdAt: Date
};

export const AllSubjects = () => {
  const [subjects, setSubjects] = useState<subjects[]>([]);
  const [loading, setLoading] = useState<boolean>();
  const token = localStorage.getItem("token");

  const removeSubjects = async(code: string)=>{
      try {
        const requestConfig = {
          url: "https://presence-pro-backend.onrender.com/admin/removeSubByCode",
          method: "delete",
          params: {
            code: code
          },
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
        const res = await axios.request(requestConfig);
        if(res.status == 200){
          setSubjects((p)=> p.filter((s) => s.code !== code))
        }
      } catch (error) {
        
      }
  }

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const requestConfig = {
        method: "get",
        url: "https://presence-pro-backend.onrender.com/admin/allSub",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const res = await axios.request(requestConfig)
      setSubjects(res.data.allSubs);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchSubjects();
  },[])

  return(
    <Card className="p-2 w-11/12 md:w-9/12">
      <CardContent className="overflow-y-auto overflow-x-auto">
        <div className="w-full text-center">
            <h1>All Subjects</h1>
        </div>
        <div className="overflow-x-auto mt-4">
            {loading ? "Loading..." : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Teacher's Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subjects.map((s)=>(
                        <TableRow key={s.id}>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>{s.code}</TableCell>
                            <TableCell>{s.teacher}</TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm" onClick={()=>removeSubjects(s.code)} className="cursor-pointer">Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
        </div>
        </CardContent>
    </Card>
  )

};

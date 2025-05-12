import { Attendance } from "@/components/attendance"

import { useParams } from "react-router-dom"

const SubjectAttendance = ()=>{
    const { rollNo, subjectCode} = useParams()
    if(!(rollNo && subjectCode)) return <div> </div>
    return (
        <div>
           <Attendance rollNo={rollNo} subjectCode={subjectCode} url="https://presence-pro-backend.onrender.com/student/attendance"/>
        </div>
    )
}

export default SubjectAttendance
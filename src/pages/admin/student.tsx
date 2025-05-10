import { StudentProfile } from "@/components/student/student-profile"
import { useParams } from "react-router-dom"


const Student = () =>{
    const { rollNo } = useParams()
    if(!rollNo) return <div></div>
    return (
        <div >
           <StudentProfile url="http://localhost:3000/admin/studentHome" credential= {rollNo} navigateUrl="/admin"/>
        </div>
    )
}

export default Student
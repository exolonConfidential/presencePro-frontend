import { StudentProfile } from "@/components/student/student-profile"
import { useParams } from "react-router-dom"


const Student = () =>{
    const { rollNo } = useParams()
    if(!rollNo) return <div></div>
    return (
        <div >
           <StudentProfile url="https://presence-pro-backend.onrender.com/admin/studentHome" credential= {rollNo} navigateUrl="/admin"/>
        </div>
    )
}

export default Student
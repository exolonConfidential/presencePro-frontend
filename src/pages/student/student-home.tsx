import { StudentProfile } from "@/components/student/student-profile"
import { getUserFromToken } from "@/utils/auth"


const studentHome = () =>{
    const rollNo = getUserFromToken()?.rollNo
    if(!rollNo) return <div></div>
    return (
        <div>
            <StudentProfile url="https://presence-pro-backend.onrender.com/student/studentHome" credential = {rollNo} navigateUrl="/student"/>
        </div>
    )
}

export default studentHome
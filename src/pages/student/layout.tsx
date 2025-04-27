import { Outlet } from "react-router-dom"


const studentLayout = () =>{
    return (
        <div>
            <nav>
                hello from student layout 
            </nav>
            <hr/>
            <Outlet />
        </div>
    )
}

export default studentLayout
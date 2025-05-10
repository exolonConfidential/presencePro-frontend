import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import HomePage from "./pages/home";
import AdminLayout from "./pages/admin/layout";
import AdminHome from "./pages/admin/admin-home";
import AdminLogin from "./pages/admin/admin-login";
import UploadStudents from "./pages/admin/upload-students";
import UploadSubjects from "./pages/admin/upload-subjects";
import UploadTimetable from "./pages/admin/upload-timetable";
import StudentLayout from "./pages/student/layout";
import StudentLogin from "./pages/student/student-login";
import StudentHome from "./pages/student/student-home";
import About from "./pages/about";
import ProtectedRoute from "./components/auth/protected-route";
import AuthRedirect from "./components/auth/auth-redirect";
import RedirectToHome from "./components/auth/invalid-url-redirect";
import Subjects from "./pages/admin/subjects";
import Student from "./pages/admin/student";
import Timetable from "./pages/admin/timetable";
import SubjectAttendance from "./pages/student/subject-attendane";
import AdminSubjectAttendance from "./pages/admin/admin-subject-attendance";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
         
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="adminLogin" element={
            <>
              <AuthRedirect />
              <AdminLogin />
            </>
          } />
          <Route path="studentLogin" element={
            <>
              <AuthRedirect />
              <StudentLogin />
            </>
          } />

          {/* Admin Protected Routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="upload-students" element={<UploadStudents />} />
            <Route path="upload-timetable" element={<UploadTimetable />} />
            <Route path="upload-subjects" element={<UploadSubjects />} />
            <Route path= "subjects"   element={<Subjects/>} />
            <Route path= "student/:rollNo"   element={<Student/>} />
            <Route path= "timetable"   element={<Timetable/>} />
            <Route path="subject/:subjectCode/rollNo/:rollNo" element={<AdminSubjectAttendance/>}/>
            

          </Route>

          {/* Student Protected Routes */}
          <Route
            path="student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentHome />} />
            <Route path="subject/:subjectCode/rollNo/:rollNo" element={<SubjectAttendance/>}/>
          </Route>

          { /* Auto Redirects the user to home if none of the above routes matched  */}
          <Route path="*" element={<RedirectToHome/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

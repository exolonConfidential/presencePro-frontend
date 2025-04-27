import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentAttendance = () => {
  const { studentId } = useParams();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`/api/students/${studentId}/attendance`);
        setAttendance(res.data);
      } catch (err) {
        console.error('Failed to fetch attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId]);

  return (
    <div>
      <h2>Attendance for Student</h2>
      {loading ? (
        <p>Loading...</p>
      ) : attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Present</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a, index) => (
              <tr key={index}>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.present ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentAttendance;

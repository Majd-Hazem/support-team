import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentInfoSection.css";

function StudentInfoSection({ serviceId }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // استدعاء API لجلب بيانات الطالب المرتبطة بالخدمة
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://eallaenjazapi.runasp.net/api/Serves_Student/GetStudentInfoByServiceId/${serviceId}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("فشل في جلب بيانات الطالب:", error);
      }
    };

    fetchData();
  }, [serviceId]);

  if (!student) return <p>جاري تحميل بيانات الطالب...</p>;

  return (
    <div className="student-info-box">
      <h3>بيانات الطالب</h3>
      <ul>
        <li>
          <strong>الاسم:</strong> {student.name}
        </li>
        <li>
          <strong>الرقم:</strong> {student.number}
        </li>
        <li>
          <strong>الكلية:</strong> {student.college}
        </li>
        <li>
          <strong>التخصص:</strong> {student.major}
        </li>
        <li>
          <strong>السنة الدراسية:</strong> {student.year}
        </li>
      </ul>
    </div>
  );
}

export default StudentInfoSection;

import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceInfoSection.css";

function ServiceInfoSection({ serviceId }) {
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `https://eallaenjazapi.runasp.net/api/Serves_Student/GetServiceInfoById/${serviceId}`
        );
        setService(response.data);
      } catch (error) {
        console.error("فشل في جلب معلومات الخدمة:", error);
      }
    };

    fetchService();
  }, [serviceId]);

  if (!service) return <p>جاري تحميل معلومات الخدمة...</p>;

  return (
    <div className="service-info-box">
      <h3>معلومات الخدمة</h3>
      <ul>
        <li>
          <strong>العنوان:</strong> {service.title}
        </li>
        <li>
          <strong>الوصف:</strong> {service.description}
        </li>
        <li>
          <strong>الموعد النهائي:</strong> {service.deadline}
        </li>
      </ul>
    </div>
  );
}

export default ServiceInfoSection;

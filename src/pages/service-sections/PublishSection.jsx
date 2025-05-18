import { useState } from "react";
import axios from "axios";
import "./PublishSection.css";

function PublishSection({ serviceId }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://eallaenjazapi.runasp.net/api/Serves_Student/Admin_PublishService`,
        { serviceId } // يفترض أن API يستقبل المعرف بهذا الشكل
      );

      setStatus("تم نشر الخدمة بنجاح");
    } catch (error) {
      console.error("فشل النشر:", error);
      setStatus("حدث خطأ أثناء النشر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-box">
      <h3>نشر الخدمة</h3>
      <p>اضغط على الزر التالي لإتمام عملية النشر أو القبول النهائي للطلب.</p>

      <button onClick={handlePublish} disabled={loading}>
        {loading ? "جاري النشر..." : "نشر الخدمة"}
      </button>

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}

export default PublishSection;

import { useEffect, useState } from "react";
import axios from "axios";
import "./ServiceDetails.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  BookOpen,
  PenTool,
  Code,
  Calendar,
  Heart,
  Stethoscope,
  Home,
  ShoppingCart,
  Globe,
  Truck,
  Users,
  ChevronLeft,
} from "lucide-react";

const iconMap = {
  تعليمة: BookOpen,
  ابداعية: PenTool,
  تقنية: Code,
  فعاليات: Calendar,
  الرعاية: Heart,
  الصحية: Stethoscope,
  المنزلية: Home,
  التسويق: ShoppingCart,
  الترجمة: Globe,
  النقل: Truck,
  متنوعة: Users,
  مهنية: Users,
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [serviceInfo, setServiceInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [mainServiceName, setMainServiceName] = useState("");
  const [subServiceName, setSubServiceName] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://eallaenjazapi.runasp.net/api/Serves_Student/GET_Serves_Student_By_Id/${serviceId}`
        );
        setServiceInfo(res.data);

        const studentId = res.data.iD_Student;
        // console.log("this is the data meme " + serviceId);

        const personal = await axios.get(
          `http://eallaenjazapi.runasp.net/api/Student_/GET_INFO_FROM_STUDENT_UNVIRSTY_PERSON_USED_SHOW_SERVES_BY_ID_STUDENT${studentId}`
        );
        setPersonalInfo(personal.data);
        console.log("بيانات الطالب من API:", personal.data);

        const Name_Serves = res.data.serveS_ID;

        const mainRes = await axios.get(
          `http://eallaenjazapi.runasp.net/api/Name_Serves/GET_SERVES ${Name_Serves}`
        );
        setMainServiceName(mainRes.data.name_Serves);

        const Branch_Serves = res.data.branch_Server_Id;
        console.log("this is ehat " + res.data.branch_Server_Id);

        const subRes = await axios.get(
          `http://eallaenjazapi.runasp.net/api/Branch_Serves/GET_BRANCH_SERVES_BY_ID${Branch_Serves}`
        );
        setSubServiceName(subRes.data.name);

        const imgRes = await axios.get(
          `http://eallaenjazapi.runasp.net/api/Imege/GET_ALL_IMEGES_BY_ID_SERVES 1015`
        );
        // console.log("jjjjjjjjjjjjjjjjjjjjjj" + serviceId);

        setImages(Array.isArray(imgRes.data) ? imgRes.data : []);
      } catch (error) {
        console.error("فشل في تحميل البيانات:", error);
      }
    };

    fetchData();
  }, [serviceId]);

  const handleAccept = () => {
    axios
      .put(
        `http://eallaenjazapi.runasp.net/api/Serves_Student/Accept_And_to_publish_Serves_Student${serviceId}`
      )
      .then(() => {
        toast.success("✅ تم نشر الخدمة");
        navigate("/admin-dashboard/services");
      })
      .catch(() => toast.error("حدث خطأ أثناء نشر الخدمة"));
  };

  const handleReject = () => {
    if (window.confirm("هل أنت متأكد من رفض الخدمة؟")) {
      axios
        .delete(
          `http://eallaenjazapi.runasp.net/api/Serves_Student/ADMIN_Delete_Serves_Student_By_Id_Serve_From_Admin ${serviceId}`
        )
        .then(() => {
          toast.success("❌ تم رفض الخدمة");
          navigate("/admin-dashboard/services");
        })
        .catch(() => toast.error("⚠️ حدث خطأ أثناء رفض الخدمة"));
    }
  };
  console.log("📷 الصور القادمة من الـ API:", images);

  if (!personalInfo || !serviceInfo)
    return <div className="show-info-container">جاري التحميل...</div>;

  return (
    <div className="show-info-container">
      <div className="steps-navigation labeled">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className="step-item"
            onClick={() => setActiveStep(step)}
          >
            <div className={`circle ${activeStep === step ? "active" : ""}`}>
              {step}
            </div>
            <span className="step-label">
              {{ 1: "معلومات الخدمة", 2: "المعلومات الشخصية" }[step]}
            </span>
          </div>
        ))}
      </div>

      {activeStep === 1 && (
        <>
          <h2>معلومات الخدمة</h2>
          <div className="main-image-wrapper">
            <img src={images[0]?.imeg_Url || ""} alt="الصورة الرئيسية" />
          </div>

          {(() => {
            const Icon = iconMap[mainServiceName?.trim()] || ChevronLeft;
            return (
              <div className="service-title-center with-icon">
                <Icon size={32} />
                <span>{serviceInfo?.service_Address || ""}</span>
              </div>
            );
          })()}

          <div className="service-info-grid">
            <div className="info-item">
              <label>الخدمة الرئيسية:</label>
              <div className="info-value-box">{mainServiceName}</div>
            </div>
            <div className="info-item">
              <label>الخدمة الفرعية:</label>
              <div className="info-value-box">{subServiceName}</div>
            </div>
            <div className="info-item">
              <label>السعر:</label>
              <div className="info-value-box">{serviceInfo?.price || ""}</div>
            </div>
            <div className="info-item">
              <label>رابط المعاينة:</label>
              <div className="info-value-box">
                <a
                  href={serviceInfo?.preview_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  عرض المعاينة
                </a>
              </div>
            </div>
            <div className="info-item">
              <label>طريقة التسليم:</label>
              <div className="info-value-box">
                {serviceInfo?.description_works || ""}
              </div>
            </div>
            <div className="info-item">
              <label>مميزات الخدمة:</label>
              <div className="info-value-box">
                {serviceInfo?.service_Features || ""}
              </div>
            </div>
            <div className="info-item full-width">
              <label>وصف الخدمة:</label>
              <div className="info-value-box">
                {serviceInfo?.service_Description || ""}
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <>
              <h3 className="section-title">صور إضافية</h3>
              <div className="extra-images-grid">
                {images.slice(1, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img.imeg_Url}
                    alt={`صورة ${index + 2}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {activeStep === 2 && (
        <>
          <h2>المعلومات الشخصية</h2>
          <div className="personal-info-section">
            <div className="personal-image">
              <img
                src={personalInfo?.mainImageUrl || ""}
                alt="الصورة الشخصية"
              />
            </div>
            <div className="personal-details">
              <div className="info-item">
                <label>الاسم الكامل:</label>
                <div className="info-value-box">
                  {personalInfo?.fullName || ""}
                </div>
              </div>
              <div className="info-item">
                <label>البريد الإلكتروني:</label>
                <div className="info-value-box">
                  {personalInfo?.email || ""}
                </div>
              </div>
              <div className="info-item">
                <label>التخصص الجامعي:</label>
                <div className="info-value-box">
                  {personalInfo?.universityMajor || ""}
                </div>
              </div>
              <div className="info-item">
                <label>اسم الجامعة:</label>
                <div className="info-value-box">
                  {personalInfo?.universityName || ""}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {activeStep === 3 && (
        <>
          <h2>إجراءات الخدمة</h2>
          <div className="action-buttons">
            <button className="accept-btn" onClick={handleAccept}>
              ✅ نشر الخدمة
            </button>
            <button className="reject-btn" onClick={handleReject}>
              ❌ رفض الخدمة
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceDetails;

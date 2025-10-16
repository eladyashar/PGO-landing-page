import CostumButton from "./CostumButton";
import { course1, course2, course3, course4 } from "../assets"; 

export default function CourseCard({ id, title, description, image, setChosenCourse }) {
  const images = [course1, course2, course3, course4]
  
  return (
    <div className="card col-3">
      <div className="image-container">
        <img src={images[id]} alt={title} style={{width: "100%"}} />
        <div className="dark-screen"></div>
      </div>
      <div className="info">
        <span>
          <div className="subheader">{title}</div>
          <p>{description}</p>
        </span>
        <CostumButton text="לפרטים" theme="light" onClick={() => setChosenCourse(title)} />
      </div>
    </div>
  );
}

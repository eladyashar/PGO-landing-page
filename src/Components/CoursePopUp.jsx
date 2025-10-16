import { course1, course2, course3, course4, banner1, banner2, banner3 } from "../assets"; 
import data from "../data.json";
import CostumButton from "./CostumButton";

export default function CoursePopUp({ course, onClose, onClick }) {
    const images = [course1, course2, course3, course4]
    const banners = {banner1, banner2, banner3}

    const selectedCourse = data.courses.find((c) => c.title === course)
    const seletedCourseId = data.courses.findIndex(({title}) => title === course)

    console.log(banners[`banner${seletedCourseId+1}`])
    const handleClick = () => {
        onClose();
        onClick();
    }

    return(
        <div className="course-pop-up" role="dialog" aria-modal>
            <div className="course-img col-md-4 order-md-2">
                <img src={images[seletedCourseId]} />
            </div>
            <div className="info-container col-md-8 order-md-1">
                <div className="info">
                    <div onClick={onClose} style={{cursor: "pointer"}} >
                        <i className="bi bi-arrow-right ms-2"></i>
                        <span className="">חזרה</span>
                    </div>
                    <div className="header">{course}</div>
                    {banners[`banner${seletedCourseId+1}`] && <img className="course-banner" src={banners[`banner${seletedCourseId+1}`]} />}
                    {selectedCourse.info.map(({title, text}) => 
                        <div className="course-info" key={title}>
                            <div>{title}</div>
                            <p style={{ whiteSpace: "pre-line" }}>{text}</p>
                        </div>)}
                    <CostumButton text="לקבלת הצעת מחיר" theme="light" onClick={handleClick} />
                </div>
            </div>
            
        </div>
    )
}
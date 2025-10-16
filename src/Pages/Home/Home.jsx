import { darkLogo, heroImage, heroIcon1, heroIcon2, aboutImage, lightLogo, logo1, logo2, logo3, logo4 } from "../../assets";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CostumButton from "../../Components/CostumButton";
import data from "../../data.json";
import CourseCard from "../../Components/CourseCard";
import { useEffect, useState } from "react";
import CoursePopUp from "../../Components/CoursePopUp";
import "./Home.scss"

export default function Home() {
  const partnersLogos = [logo1, logo2, logo3, logo4]
  const [chosenCourse, setChosenCourse] = useState(null)

  useEffect(() => {
    if (chosenCourse !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [chosenCourse])

  const scrollTo = (sectionName) => {
    const contactSection = document.getElementById(sectionName)
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    const res = await fetch("https://formspree.io/f/mvgwverw", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-green-600">✅ תודה! הטופס נשלח בהצלחה.</p>;
  }

  return (
    <div className="home-page">
      <div className="nav-bar">
        <div><span onClick={() => scrollTo("contact-section")}>צור קשר</span></div>
        <div style={{justifyContent: "center"}}> 
          <img className="logo" src={darkLogo} alt="darkLogo" />
        </div>
        
        <div style={{justifyContent: "left"}}>
          <span className="ms-3" onClick={() => scrollTo("courses-section")}>קורסים</span>
          <span onClick={() => scrollTo("about-us-section")}>מי אנחנו</span>
        </div>
      </div>

      <div className="hero-section section row-md">
        <div className="hero-image col-md-6 order-md-2">
          <img src={heroImage} className="img"/>
          <img className="i icon1 " src={heroIcon1} />
          <img className="i icon2" src={heroIcon2} />
        </div>
        <div className="content col-md-6 ps-md-5 order-md-1">
          <div
            className="title"
            dangerouslySetInnerHTML={{ __html: data.heroSection.title }}
          ></div>
          <div className="subheader mb-2">{data.heroSection.subheader}</div>
          <CostumButton text="בואו נצא לדרך" theme="dark" onClick={() => scrollTo("contact-section")} />
        </div>
        
      </div>

      <div className="advantages-section section">
        {data.advantage.map(({ icon, header, content }, i) => (
          <div className="advantage-container" key={i}>
            <i className={`bi ${icon} icon`} />
            <div className="subheader">{header}</div>
            <p>{content}</p>
          </div>
        ))}
      </div>

      <div id="courses-section" className="courses-section">
        <div className="header">הקורסים שלנו</div>
        <div className="cards">
          {data.courses.map(({ title, description, image }, i) => (
            <CourseCard key={i} id={i} title={title} description={description} image={image} setChosenCourse={setChosenCourse} />
          ))}
        </div>
      </div>
      {chosenCourse !== null && <CoursePopUp  course={chosenCourse} onClick={() => scrollTo("contact-section")} onClose={() => setChosenCourse(null)} />}

      <div className="testimonials-section section">
        <div className="header">אתם מספרים</div>
        <div className="testimonials">
          {data.testimonials.map(({ testimonial, name, info }, i) => (
            <div
              key={i}
              className="testimonial-container"
              style={
                i == 0
                  ? { borderBottomRightRadius: "0" }
                  : { borderBottomLeftRadius: "0" }
              }
            >
              <p style={{ whiteSpace: "pre-line" }} key={i}>{testimonial}</p>
              <div className="person-info">
                <i className="bi bi-person-circle" />
                <span>
                  <div className="subheader">{name}</div>
                  <div className="caption">
                    {info.map((t, i) => (
                      <div key={i}>{t}</div>
                    ))}
                  </div>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="about-us-section" className="about-us-section section row justify-content-center">
        <div className="about-us-container col-md-10">
          <img src={aboutImage} />
          <span className="info">
            <div className="header">מי אנחנו?</div>
            <p>
              {data.aboutUs.text}
            </p>
          </span>
        </div>
      </div>

      <div className="partners-section">
        {partnersLogos.map((logo, i) => <img key={i} src={logo} />)}
      </div>

      <div id="contact-section" className="contact-section section row justify-content-md-center">
        <div className="contact-container col-md-6 ">
          <div>
            <div className="header">בואו נדבר</div>
            <p>ש לכם שאלות? מעוניינים בפרטים נוספים? פנו אלינו ונענה בהקדם!</p>
          </div>
          <form action="https://formspree.io/f/mvgwverw" method="POST">
            {data.contactForm.map(({ type, placeholder, required }, i) => (
              <input
                key={i}
                type={type}
                name={placeholder}
                placeholder={placeholder}
                required={required}
              />
            ))}
            <CostumButton text="שליחת הפרטים" theme="yellow" />
          </form>
        </div>
      </div>

      <div className="footer-section">
        <img src={lightLogo} alt="lightLogo" className="footer-logo" />
        <div>
          <p className="footer-header">צור קשר</p>
          <div className="contact-info-item">
            {data.footer.contactInfo.map(({ icon, text }, i) => (
              <div key={i}>
                <i className={`bi ${icon}`} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-header">קורסים</p>
            {data.courses.map(({title}, i) => (
              <div key={i} className="course-button" onClick={() => setChosenCourse(title)}>{title}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

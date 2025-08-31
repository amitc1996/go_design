import React from "react";
import { useAuthState } from "../store/AuthContext";
import MainLayout from "../layout/MainLayout";
import "./Dashboard.scss"; 
const Dashboard = () => {
  const { user } = useAuthState();

  return (
    <MainLayout>
      {/* Welcome Section */}
      <div className="welcome mb-4">
        <h2>
          Welcome <span className="gradient-text">{user?.company_name || "CompanyX"}</span>
        </h2>
        <p>Get a fixed project cost in a few clicks—no calls, no meetings.</p>
        <button className="btn-create">
          <span>＋</span> Create a new project
        </button>
      </div>

      {/* Filter Section */}
      <div className="filter-section d-flex gap-3 mb-4 flex-wrap">
        <select className="form-control">
          <option>Category</option>
        </select>
        <select className="form-control">
          <option>Type</option>
        </select>
        <button className="filter-btn">Filter</button>
      </div>

      {/* Cards Section */}
      <div className="row g-4 mb-4">
        {[
          {
            img: "https://picsum.photos/id/1042/400/200",
            cat: "Graphics",
            title: "Social Media Post",
            desc: "Quick, scroll-stopping designs tailored for your brand’s voice.",
          },
          {
            img: "https://picsum.photos/id/1042/400/200",
            cat: "Graphics",
            title: "Logo Design",
            desc: "A unique, memorable mark that captures your brand identity.",
          },
          {
            img: "https://picsum.photos/id/1042/400/200",
            cat: "UI/Web",
            title: "Landing Page",
            desc: "Engaging layouts optimized for conversions, built one section at a time.",
          },
          {
            img: "https://picsum.photos/id/1042/400/200",
            cat: "Video",
            title: "2D Explainer Video",
            desc: "Simple, animated storytelling to clarify your product or service.",
          },
        ].map((card, index) => (
          <div key={index} className="col-md-3 d-flex justify-content-center">
            <div className="card-custom">
              <img src={card.img} alt={card.title} />
              <div className="card-body-content">
                <div className="card-cat">{card.cat}</div>
                <div className="card-title">{card.title}</div>
                <div className="card-desc">{card.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Dashboard;

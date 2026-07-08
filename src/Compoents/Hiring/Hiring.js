"use client";
import Image from "next/image";
import { useEffect, useState } from "react"
export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/jobs`
        );

        const data = await res.json();

        if (data.success) {
          setJobs(data.data || []);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Loading State
  if (loading) {
    return (
      <section
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading latest jobs...</p>
        </div>
      </section>
    );
  }

  // No Jobs State
  if (jobs.length === 0) {
    return (
      <>
        <section
          className="d-flex align-items-center py-5"
          style={{
            minHeight: "70vh",
            background: "linear-gradient(135deg,#f8f9fa,#eef6ff)",
          }}
        >
          <div className="container">
            <div
              className="mx-auto text-center bg-white shadow-lg rounded-4 p-5"
              style={{ maxWidth: "650px" }}
            >
              <div style={{ fontSize: "80px" }}>📋</div>

              <h2 className="fw-bold mt-3 mb-3">
                No Job Openings Available
              </h2>

              <p className="text-muted fs-5">
                We dont have any vacancies at the moment.
                <br />
                Please check back later for exciting career opportunities.
              </p>

              <button
                className="btn btn-gradient mt-4"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </div>
          </div>
        </section>

        <style jsx>{`
          .btn-gradient {
            background: linear-gradient(90deg, #090708, #fc2574);
            color: #fff;
            border: none;
            border-radius: 30px;
            padding: 10px 24px;
            font-weight: 600;
            transition: 0.3s;
          }

          .btn-gradient:hover {
            transform: translateY(-2px);
            opacity: 0.9;
          }
        `}</style>
      </>
    );
  }

  // Categories
  const categories = ["All", ...new Set(jobs.map((job) => job.category))];

  // Filter Jobs
  const filteredJobs =
    activeCategory === "All"
      ? jobs
      : jobs.filter((job) => job.category === activeCategory);

  return (
    <>
      <section className="py-5 job-section">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">
            Latest Job Openings
          </h2>

          {/* Category Tabs */}
          <ul className="nav nav-pills justify-content-center mb-5 flex-wrap">
            {categories.map((cat) => (
              <li className="nav-item m-1" key={cat}>
                <button
                  className={`nav-link ${activeCategory === cat ? "active" : ""
                    }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>

          {/* Job Cards */}
          <div className="row g-4">
            {filteredJobs.map((job) => (
              <div className="col-md-6 col-lg-4" key={job._id}>
                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden job-card">
                  <div className="job-img-wrap">
                    <Image
                      src={job.image || "/placeholder.png"}
                      alt={job.title}
                      width={600}
                      height={400}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="card-body p-4 d-flex flex-column">
                    <span className="badge bg-primary mb-3 align-self-start">
                      {job.category}
                    </span>

                    <h5 className="fw-bold">
                      {job.title}
                    </h5>

                    <p className="text-muted flex-grow-1">
                      {job.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-secondary">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </small>

                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gradient"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted">
                  No jobs found in this category.
                </h5>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .job-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #eef6ff 100%);
        }

        .job-card {
          transition: all 0.35s ease;
        }

        .job-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }

        .job-img-wrap {
          height: 220px;
          overflow: hidden;
        }

        .job-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .job-card:hover .job-img-wrap img {
          transform: scale(1.08);
        }

        .btn-gradient {
          background: linear-gradient(90deg, #090708, #fc2574);
          color: #fff;
          border: none;
          border-radius: 30px;
          padding: 8px 20px;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn-gradient:hover {
          color: #fff;
          transform: translateY(-2px);
          opacity: 0.95;
        }

        .nav-pills .nav-link {
          border-radius: 30px;
          font-weight: 600;
          color: #333;
          transition: all 0.3s ease;
          padding: 10px 20px;
        }

        .nav-pills .nav-link:hover {
          background: #e9ecef;
        }

        .nav-pills .nav-link.active {
          background: linear-gradient(90deg, #090708, #fc2574);
          color: #fff;
        }

        @media (max-width: 768px) {
          .job-img-wrap {
            height: 200px;
          }

          .nav-pills .nav-link {
            font-size: 14px;
            padding: 8px 16px;
          }

          .btn-gradient {
            padding: 8px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
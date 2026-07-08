"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../app/Styles/Gallery.module.css";

const images = [

  "/Assests/Ourgallery/2024-09-12.webp",
  "/Assests/Ourgallery/bannew.webp",
  "/Assests/Ourgallery/bannew1.webp",
  "/Assests/Ourgallery/bannw2.webp",

];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`${styles.gallerySection} py-5`}>
      <Container>
        <h2 className="text-center fw-bold mb-4">Our Gallery</h2>

        {/* Main Image */}
        <Row className="justify-content-center">
          <Col md={10} xs={12} className="text-center">
            {/* Main Image */}
            <div className={styles.mainImage}>
              <Image
                src={images[activeIndex]}
                alt={`Main ${activeIndex}`}
                fill
                priority
                className={styles.mainImg}
              />
            </div>
          </Col>
        </Row>

        {/* Thumbnails */}
        <Row className="mt-4 justify-content-center">
          <Col md={10}>
            <div className={`${styles.thumbnails} d-flex flex-wrap justify-content-center gap-3`}>
              {/* Thumbnails */}
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`${styles.thumbWrapper} ${index === activeIndex ? styles.activeThumb : ""
                    }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${index}`}
                    fill
                    className={styles.thumbImg}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Gallery;

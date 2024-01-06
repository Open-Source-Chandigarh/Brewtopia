import { FaGithub, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import Styles from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className={Styles.footerContainer}>
      <div className={Styles.footerContent}>
        <div className={Styles.column}>
          <h2>About Brewtopia</h2>
          <p>
            Discover the warmth of Brewtopia, a haven for coffee and tea lovers.
            Indulge in our handcrafted beverages and delectable treats amidst a
            cozy ambiance. Join us for a delightful experience.
          </p>
        </div>

        <div className={Styles.column}>
          <h2>Connect With Us</h2>
          <div className={Styles.socialIcons}>
            <a href="https://github.com/Varinder-Dhillon0" className={Styles.iconLink}>
              <FaGithub size={30} />
            </a>
            <a href="https://www.linkedin.com/in/varinder-dhillon-5b8420263" className={Styles.iconLink}>
              <FaLinkedin size={30} />
            </a>
            <a href="https://twitter.com/varinder_d0" className={Styles.iconLink}>
              <FaTwitterSquare size={30} />
            </a>
          </div>
        </div>

        <div className={Styles.column}>
          <h2>Our Products</h2>
          <ul className={Styles.footerLinks}>
            <li>
              <a href="#product1" className={Styles.navLink}>Hot Classics</a>
            </li>
            <li>
              <a href="#product2" className={Styles.navLink}>All Time Chillers</a>
            </li>
            <li>
              <a href="#product3" className={Styles.navLink}>All Day Delights</a>
            </li>
            <li>
              <a href="#product4" className={Styles.navLink}>Sweet Tooth</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={Styles.footerBottom}>
        <p>&copy; 2024 Brewtopia Cafe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import "./Footer.scss";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container footer-content">
				<div className="footer-left">
					<p className="footer-text">
						© {new Date().getFullYear()} Veljko Naumović
					</p>
					<p className="footer-sub">Built with React & TypeScript</p>
				</div>

				<div className="footer-links">
					<a
						href="https://github.com/veljko-naumovic"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub />
						GitHub
					</a>

					<a
						href="https://www.linkedin.com/in/veljko-naumovic-3370381a4/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin />
						LinkedIn
					</a>

					<a href="mailto:veljko.naumovic@gmail.com?subject=Project inquiry&body=Hi Veljko,%0D%0A%0D%0A">
						<HiOutlineMail />
						Email
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

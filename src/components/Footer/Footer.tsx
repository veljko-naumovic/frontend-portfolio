import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container footer-content">
				<p className="footer-text">
					© {new Date().getFullYear()} Veljko Naumović
				</p>

				<div className="footer-links">
					<a
						href="https://github.com/veljko-naumovic"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a
						href="https://www.linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import "./About.scss";

const About = () => {
	return (
		<section className="about section section-alt" id="about">
			<div className="container">
				<h2 className="about-title">About me</h2>

				<p className="about-text">
					I enjoy working on complex, data-driven interfaces and
					turning business requirements into clean, scalable UI
					solutions. I value clean code, reusable components and close
					collaboration with designers, backend developers and product
					teams.
				</p>

				{/* <p className="about-text">
					I value clean code, reusable components and close
					collaboration with designers, backend developers and product
					teams.
				</p> */}
			</div>
		</section>
	);
};

export default About;

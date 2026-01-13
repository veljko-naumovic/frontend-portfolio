import "./About.scss";

const About = () => {
	return (
		<section className="about section" id="about">
			<div className="container about-container">
				<h2 className="about-title">About me</h2>

				<p className="about-text">
					I’m a frontend developer with 4+ years of experience
					building production-ready web applications using React and
					TypeScript. I enjoy working on complex, data-driven
					interfaces and turning business requirements into clean,
					scalable UI solutions.
				</p>

				<p className="about-text">
					I value clean code, reusable components and close
					collaboration with designers, backend developers and product
					teams.
				</p>
			</div>
		</section>
	);
};

export default About;

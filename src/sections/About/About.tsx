import "./About.scss";

const About = () => {
	return (
		<section className="about section" id="about">
			<div className="container about-container">
				{/* LEFT */}
				<div className="about-left">
					<h2 className="about-title">About me</h2>

					<p className="about-text">
						I’m a frontend developer with{" "}
						<span>4+ years of experience </span>
						building production-ready web applications using React
						and TypeScript. I enjoy working on complex, data-driven
						interfaces and turning business requirements into clean,
						scalable UI solutions.
					</p>

					<p className="about-text">
						I value clean code, reusable components and close
						collaboration with designers, backend developers and
						product teams.
					</p>
				</div>

				{/* RIGHT */}
				<div className="about-right">
					<div className="stat-card">
						<h3>4+</h3>
						<span>Years experience</span>
					</div>

					<div className="stat-card">
						<h3>React</h3>
						<span>Main stack</span>
					</div>

					<div className="stat-card">
						<h3>TypeScript</h3>
						<span>Strong typing </span>
					</div>

					<div className="stat-card">
						<h3>Component UI</h3>
						<span>Design focus</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;

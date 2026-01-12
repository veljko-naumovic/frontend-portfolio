import "./Hero.scss";

const Hero = () => {
	return (
		<section className="hero" id="hero">
			<div className="container">
				<p className="hero-eyebrow">Frontend Developer</p>

				<h1 className="hero-title">
					Hi, I’m <span>Veljko</span>
				</h1>

				<p className="hero-description">
					Frontend developer with 4+ years of experience building
					modern, scalable web applications using React and
					TypeScript.
				</p>

				<div className="hero-actions">
					<a href="#projects" className="btn btn-primary">
						View projects
					</a>
					<a href="#contact" className="btn btn-secondary">
						Contact me
					</a>
				</div>
			</div>
		</section>
	);
};

export default Hero;

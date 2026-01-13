import "./Hero.scss";

const Hero = () => {
	return (
		<section className="hero" id="hero">
			<div className="container hero-layout">
				{/* LEVA STRANA */}
				<div className="hero-content">
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

				{/* DESNA STRANA – apstraktni UI card */}
				<div className="hero-ui">
					<div className="ui-header">
						<div className="ui-dot red" />
						<div className="ui-dot yellow" />
						<div className="ui-dot green" />
					</div>

					<div className="ui-body">
						<div className="ui-row title" />
						<div className="ui-row" />
						<div className="ui-row" />
						<div className="ui-row short" />

						<div className="ui-stats">
							<div className="ui-stat" />
							<div className="ui-stat" />
							<div className="ui-stat" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;

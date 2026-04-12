import "./Hero.scss";

const Hero = () => {
	return (
		<section className="hero" id="hero">
			<div className="container hero-layout">
				{/* Left side */}
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

				{/* Right side – CODE SNIPPET */}
				<div className="hero-ui code">
					<div className="ui-header">
						<div className="ui-dot red" />
						<div className="ui-dot yellow" />
						<div className="ui-dot green" />
					</div>

					<div className="code-label">Product API example</div>

					<pre className="code-block">
						<code>
							{`const fetchProducts = async () => {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();

    return data.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price
    }));
  } catch (err) {
    console.error(err);
  }
};`}
							<span className="cursor">|</span>
						</code>
					</pre>
				</div>
			</div>
		</section>
	);
};

export default Hero;

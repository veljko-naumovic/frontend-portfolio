import { experience } from "../../data/experience.data";
import "./Experience.scss";

const Experience = () => {
	return (
		<section className="experience section section-alt" id="experience">
			<div className="container">
				<h2 className="experience-title">Experience</h2>

				<div className="experience-list">
					{experience.map((item) => (
						<div key={item.role} className="experience-item">
							<div className="experience-header">
								<h3 className="experience-role">{item.role}</h3>
								<span className="experience-period">
									{item.period}
								</span>
							</div>

							<p className="experience-company">{item.company}</p>

							<ul className="experience-points">
								{item.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>

							<div className="experience-tech">
								{item.tech.map((tech) => (
									<span key={tech} className="tag">
										{tech}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;

import Card from "../../components/Card/Card";
import { technologies } from "../../data/technologies.data";
import "./Technologies.scss";

const Technologies = () => {
	return (
		<section className="technologies section" id="technologies">
			<div className="container">
				<h2 className="technologies-title">Technologies</h2>
				<div className="technologies-grid">
					<Card title="Frontend">
						<ul className="technologies-list">
							{technologies.frontend.map(
								({ label, icon: Icon }) => (
									<li key={label} className="tag">
										<Icon />
										{label}
									</li>
								),
							)}
						</ul>
					</Card>

					<Card title="Backend">
						<ul className="technologies-list">
							{technologies.backend.map(
								({ label, icon: Icon }) => (
									<li key={label} className="tag">
										<Icon />
										{label}
									</li>
								),
							)}
						</ul>
					</Card>

					<Card title="Tools">
						<ul className="technologies-list">
							{technologies.tools.map(({ label, icon: Icon }) => (
								<li key={label} className="tag">
									<Icon />
									{label}
								</li>
							))}
						</ul>
					</Card>

					<Card title="Full-Stack">
						<ul className="technologies-list">
							{technologies.fullstack.map(
								({ label, icon: Icon }) => (
									<li key={label} className="tag">
										<Icon />
										{label}
									</li>
								),
							)}
						</ul>
					</Card>
					<Card title="AI Integration">
						<ul className="technologies-list">
							{technologies.ai.map(({ label, icon: Icon }) => (
								<li key={label} className="tag">
									<Icon />
									{label}
								</li>
							))}
						</ul>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default Technologies;

import { useEffect, useState } from "react";
import "./Header.scss";

const sections = [
	{ key: "hero", title: "Home" },
	{ key: "about", title: "About" },
	{ key: "projects", title: "Projects" },
	{ key: "experience", title: "Experience" },
	{ key: "technologies", title: "Technologies" },
	{ key: "contact", title: "Contact" },
];

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [activeSection, setActiveSection] = useState<string>("hero");

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			if (scrollY + windowHeight >= documentHeight - 10) {
				setActiveSection("contact");
				return;
			}

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = document.getElementById(sections[i].key);
				if (!section) continue;

				if (scrollY >= section.offsetTop - 80) {
					setActiveSection(sections[i].key);
					break;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="header">
			<div className="container">
				<div className="logo">VN</div>

				<nav className={`nav ${isOpen ? "open" : ""}`}>
					{sections.map(({ key, title }) => (
						<a
							key={key}
							href={`#${key}`}
							onClick={() => setIsOpen(false)}
							className={activeSection === key ? "active" : ""}
						>
							{title}
						</a>
					))}
				</nav>

				<button
					className={`burger ${isOpen ? "open" : ""}`}
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle navigation"
				>
					<span />
					<span />
					<span />
				</button>
			</div>
		</header>
	);
};

export default Header;

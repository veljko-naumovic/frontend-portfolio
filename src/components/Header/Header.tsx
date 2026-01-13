import { useState } from "react";
import "./Header.scss";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="header">
			<div className="container">
				<div className="logo">VN</div>

				<nav className={`nav ${isOpen ? "open" : ""}`}>
					<a href="#about" onClick={() => setIsOpen(false)}>
						About
					</a>
					<a href="#projects" onClick={() => setIsOpen(false)}>
						Projects
					</a>
					<a href="#experience" onClick={() => setIsOpen(false)}>
						Experience
					</a>
					<a href="#technologies" onClick={() => setIsOpen(false)}>
						Technologies
					</a>
					<a href="#contact" onClick={() => setIsOpen(false)}>
						Contact
					</a>
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

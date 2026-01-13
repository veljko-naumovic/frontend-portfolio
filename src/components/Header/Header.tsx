import "./Header.scss";

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="logo">VN</div>

				<nav className="nav">
					<a href="#about">About</a>
					<a href="#projects">Projects</a>
					<a href="#experience">Experience</a>
					<a href="#technologies">Technologies</a>
					<a href="#contact">Contact</a>
				</nav>
			</div>
		</header>
	);
};

export default Header;

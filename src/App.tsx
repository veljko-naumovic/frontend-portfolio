import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Experience from "./sections/Experience/Experience";
import Technologies from "./sections/Technologies/Technologies";
import Projects from "./sections/Projects/Projects";
import "./styles/main.scss";
import Header from "./components/Header/Header";
import Contact from "./sections/Contact/Contact";

function App() {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Projects />
			<Experience />
			<Technologies />
			<Contact />
			<Footer />
		</>
	);
}

export default App;

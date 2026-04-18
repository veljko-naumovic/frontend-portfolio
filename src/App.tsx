import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Experience from "./sections/Experience/Experience";
import Technologies from "./sections/Technologies/Technologies";
import Projects from "./sections/Projects/Projects";
import "./styles/main.scss";
import Header from "./components/Header/Header";
import Contact from "./sections/Contact/Contact";
import AiAssistant from "./components/AiAssistant/AiAssistant";
import { useState } from "react";

function App() {
	const [openAiAssistant, setOpenAiAssistant] = useState(false);
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Projects openAI={() => setOpenAiAssistant(true)} />
			<Experience />
			<Technologies />
			<Contact />
			<Footer />
			<AiAssistant
				openAiAssistant={openAiAssistant}
				setOpenAiAssistant={setOpenAiAssistant}
			/>
		</>
	);
}

export default App;

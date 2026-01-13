import "./Contact.scss";

const Contact = () => {
	return (
		<section className="contact section section-alt" id="contact">
			<div className="container">
				<h2 className="contact-title">Contact</h2>

				<p className="contact-description">
					Interested in working together or have a question? Feel free
					to reach out.
				</p>

				<form className="contact-form">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input id="name" type="text" placeholder="Your name" />
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							placeholder="your@email.com"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="message">Message</label>
						<textarea
							id="message"
							rows={5}
							placeholder="Tell me about your project"
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Send message
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;

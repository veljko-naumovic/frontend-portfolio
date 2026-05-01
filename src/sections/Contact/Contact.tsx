import { useState } from "react";
import "./Contact.scss";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// prevent double submit
		if (loading) return;

		setLoading(true);
		setError(null);
		setSuccess(null);

		//  basic validation
		if (!form.email.includes("@")) {
			setError("Please enter a valid email");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${API_URL}/api/contact`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			setSuccess("Message sent successfully!");
			setForm({ name: "", email: "", message: "" });

			//  auto hide success
			setTimeout(() => {
				setSuccess(null);
			}, 4000);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to send message",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="contact section section-alt" id="contact">
			<div className="container contact-layout">
				{/* Left side */}
				<form className="contact-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							id="name"
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							placeholder="Your name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							required
							placeholder="Your email"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="message">Message</label>
						<textarea
							id="message"
							name="message"
							rows={5}
							value={form.message}
							onChange={handleChange}
							required
							placeholder="Write your message..."
							onKeyDown={(e) => {
								if (e.key === "Enter" && e.ctrlKey) {
									handleSubmit(e);
								}
							}}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-primary"
						disabled={loading}
					>
						{loading ? (
							<span className="btn-loading">
								<span className="spinner" />
								Sending...
							</span>
						) : (
							"Send Message"
						)}
					</button>

					{success && <p className="contact-success">{success}</p>}
					{error && <p className="contact-error">{error}</p>}
				</form>

				{/* Right side */}
				<div className="contact-info">
					<h2>Let’s build something great.</h2>

					<p className="subtitle">
						I design and build modern web applications using React
						and TypeScript.
					</p>

					<div className="contact-highlight">
						<span className="badge">Available for work</span>

						<h3>Have a project in mind?</h3>

						<p>
							I help turn ideas into fast, scalable products.
							Let’s talk and make it happen.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;

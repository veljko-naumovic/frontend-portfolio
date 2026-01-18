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
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setLoading(true);
		setError(null);
		setSuccess(null);

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
			<div className="container">
				<h2 className="contact-title">Contact</h2>

				<p className="contact-description">
					Interested in working together or have a question? Feel free
					to reach out.
				</p>

				<form className="contact-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							placeholder="Name"
						/>
					</div>

					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							required
							placeholder="Email"
						/>
					</div>

					<div className="form-group">
						<label>Message</label>
						<textarea
							name="message"
							rows={5}
							value={form.message}
							onChange={handleChange}
							required
							placeholder="Message..."
						/>
					</div>

					<button
						type="submit"
						className="btn btn-primary"
						disabled={loading}
					>
						{loading ? "Sending..." : "Send message"}
					</button>

					{success && <p className="contact-success">{success}</p>}
					{error && <p className="contact-error">{error}</p>}
				</form>
			</div>
		</section>
	);
};

export default Contact;

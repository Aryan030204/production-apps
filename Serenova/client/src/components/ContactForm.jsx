import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
} from "../utils/config";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    query: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          fullName: formData.fullName,
          emailId: formData.emailId,
          query: formData.query,
        },
        EMAIL_PUBLIC_KEY
      );

      console.log("Email sent successfully:", res);
      alert("Message sent successfully!");
      setFormData({ fullName: "", emailId: "", query: "" });
    } catch (err) {
      console.error("Failed to send email:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-[90%] lg:w-[50%] max-w-lg mx-auto border drop-shadow-[5px_-5px_5px] p-6 rounded-2xl shadow-md bg-white">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div>
          <label
            htmlFor="fullName"
            className="block mb-1 font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="emailId"
            className="block mb-1 font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            placeholder="Enter your email"
            value={formData.emailId}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="query"
            className="block mb-1 font-medium text-gray-700"
          >
            Your Query
          </label>
          <textarea
            name="query"
            id="query"
            placeholder="Write your message here..."
            value={formData.query}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 h-28 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-md font-semibold text-white transition-colors ${
            isSubmitting
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

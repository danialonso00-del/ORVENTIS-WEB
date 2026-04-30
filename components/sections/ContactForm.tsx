"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  fields: {
    name: { label: string; placeholder: string };
    company: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    subject: { label: string; options: { value: string; label: string }[] };
    message: { label: string; placeholder: string };
  };
  submitLabel: string;
  successMessage: string;
}

export default function ContactForm({ fields, submitLabel, successMessage }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Form submitted:", data);
    setSubmitting(false);
    setSubmitted(true);
    reset();
  };

  const inputClass = `w-full px-4 py-3 rounded text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all duration-200`;
  const inputStyle = {
    background: "#F8FAFD",
    border: "1.5px solid rgba(15,23,42,0.12)",
    borderRadius: "6px",
  };
  const inputFocusStyle = { borderColor: "#3B6FD4" };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center rounded-xl"
        style={{
          background: "rgba(59,111,212,0.08)",
          border: "1px solid rgba(59,111,212,0.3)",
          borderRadius: "12px",
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(59,111,212,0.2)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B6FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="text-2xl font-black text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "-0.03em" }}
        >
          Message Sent
        </h3>
        <p className="text-gray-600 max-w-sm">{successMessage}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm font-medium transition-colors duration-200"
          style={{ color: "#5A8DE8" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {fields.name.label} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder={fields.name.placeholder}
            className={inputClass}
            style={inputStyle}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            {fields.company.label} <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            placeholder={fields.company.placeholder}
            className={inputClass}
            style={inputStyle}
            aria-describedby={errors.company ? "company-error" : undefined}
            aria-invalid={!!errors.company}
            {...register("company")}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {fields.email.label} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder={fields.email.placeholder}
            className={inputClass}
            style={inputStyle}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {fields.phone.label}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={fields.phone.placeholder}
            className={inputClass}
            style={inputStyle}
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {fields.subject.label} <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          className={`${inputClass} cursor-pointer`}
          style={{ ...inputStyle, color: "inherit" }}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={!!errors.subject}
          {...register("subject")}
        >
          {fields.subject.options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ background: "#F8FAFD" }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {fields.message.label} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder={fields.message.placeholder}
          className={`${inputClass} resize-none`}
          style={inputStyle}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-4 font-semibold text-white rounded transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        style={{ background: "#3B6FD4", borderRadius: "4px" }}
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <SpinnerIcon /> Sending...
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

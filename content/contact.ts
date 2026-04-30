export const contactContent = {
  hero: {
    headline: "Get in Touch",
    subheadline: "Let's Discuss Your Global Strategy",
    description:
      "Whether you're looking for a commodity trading partner or need help positioning your brand for international markets — we'd like to hear from you.",
  },
  info: {
    email: "info@orventis.com",
    linkedIn: "https://linkedin.com/company/orventis",
    responseTime: "We typically respond within 1 business day.",
  },
  reasons: [
    { icon: "trading", title: "Commodity Trading Inquiry", desc: "Discuss sourcing, volumes, products, and logistics requirements." },
    { icon: "brand", title: "Brand Positioning Project", desc: "Start a conversation about your international expansion strategy." },
    { icon: "partnership", title: "Strategic Partnership", desc: "Explore collaboration opportunities with Orventis globally." },
    { icon: "other", title: "General Inquiry", desc: "Any other question or topic you'd like to bring to our team." },
  ],
  form: {
    fields: {
      name: { label: "Full Name", placeholder: "Your full name" },
      company: { label: "Company", placeholder: "Your company name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      phone: { label: "Phone (optional)", placeholder: "+1 234 567 8900" },
      subject: {
        label: "Subject",
        options: [
          { value: "", label: "Select a topic" },
          { value: "commodity-trading", label: "Commodity Trading Inquiry" },
          { value: "brand-positioning", label: "Brand Positioning Project" },
          { value: "partnership", label: "Strategic Partnership" },
          { value: "other", label: "Other" },
        ],
      },
      message: { label: "Message", placeholder: "Tell us about your project or inquiry..." },
    },
    submitLabel: "Send Message",
    successMessage: "Thank you for your message. Our team will be in touch within 1 business day.",
  },
};

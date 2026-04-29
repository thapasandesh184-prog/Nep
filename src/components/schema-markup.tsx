export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nepovoxel",
    description:
      "Premium AI-powered creative studio delivering AI-generated visuals, ad creatives, and world-class web development for e-commerce brands.",
    url: "https://nepovoxel.com",
    logo: "https://nepovoxel.com/logo.png",
    sameAs: [
      "https://instagram.com/nepovoxel",
      "https://linkedin.com/company/nepovoxel",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
    },
    serviceType: [
      "AI Creative Studio",
      "AI Product Photography",
      "AI Video Production",
      "Web Development",
    ],
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    priceRange: "$$$",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Package",
        description: "AI product/UGC images and short-form videos",
        price: "500",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Growth Package",
        description: "Mixed AI creatives + landing page",
        price: "2000",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Elite Package",
        description: "Full custom website + unlimited creatives",
        price: "5000",
        priceCurrency: "USD",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

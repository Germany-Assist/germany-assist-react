import React from "react";

export default function PartnerMarquee() {
  const partners = [
    "Siemens",
    "SAP",
    "BMW",
    "Zalando",
    "Delivery Hero",
    "BioNTech",
  ];

  return (
    <div className="py-10 bg-dark-950 overflow-hidden">
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* We use three groups to ensure no "end" is ever visible */}
        {[1, 2, 3].map((group) => (
          <div key={group} className="flex animate-marquee shrink-0">
            {partners.map((brand, idx) => (
              <span
                key={`${group}-${idx}`}
                className="text-2xl font-bold text-gray-600 px-12 hover:text-accent transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

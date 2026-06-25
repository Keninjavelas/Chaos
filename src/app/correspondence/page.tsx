// src/app/correspondence/page.tsx
import React from "react";
import Link from "next/link";

export default function CorrespondencePage() {
  return (
    <div className="archive-page">
      <div className="archive-page-header">
        <div className="archive-page-breadcrumb">
          <Link href="/">Archive AK-27</Link> / Correspondence
        </div>
        <h1 className="archive-page-title">Correspondence</h1>
      </div>
      <div className="archive-page-content">
        <p>Secure communication channels are available.</p>
        <p style={{ marginTop: "1rem", color: "#6a6560" }}>
          A contact form and messaging interface will be
          established here for authorized personnel.
        </p>
      </div>
    </div>
  );
}

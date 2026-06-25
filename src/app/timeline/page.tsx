// src/app/timeline/page.tsx
import React from "react";
import Link from "next/link";

export default function TimelinePage() {
  return (
    <div className="archive-page">
      <div className="archive-page-header">
        <div className="archive-page-breadcrumb">
          <Link href="/">Archive AK-27</Link> / Timeline
        </div>
        <h1 className="archive-page-title">Career Chronology</h1>
      </div>
      <div className="archive-page-content">
        <p>Timeline records are being reconstructed from available data.</p>
        <p style={{ marginTop: "1rem", color: "#6a6560" }}>
          A chronological record of education, employment, and significant
          events will be rendered here.
        </p>
      </div>
    </div>
  );
}

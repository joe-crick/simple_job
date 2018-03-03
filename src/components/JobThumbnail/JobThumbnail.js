import React from "react";

export const JobThumbnail = ({
  companyName,
  companyLogo,
  datePosted,
  description,
  jobId,
  sentinelMarker,
  viewJobDetails
}) => (
  <div className={`JobThumbnail ${sentinelMarker}`}>
    <div className="JobThumbnail-logo">
      <img src={companyLogo} alt={companyName} />
    </div>
    <div className="JobThumbnail-details">
      <div className="JobThumbnail-price">Company: {companyName}</div>
      <div className="JobThumbnail-title">Date Posted: {datePosted}</div>
      <div className="JobThumbnail-desc">{description}</div>
      <button className="JobThumbnail-button" onClick={viewJobDetails} data-id={jobId}>
        View Details
      </button>
    </div>
  </div>
);

export default JobThumbnail;

"use client";

import { useEffect, useState } from "react";

export function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.dataset.loading = "true";
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1500);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      delete document.body.dataset.loading;
    }, 2250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      delete document.body.dataset.loading;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`siteLoader${leaving ? " isLeaving" : ""}`} role="status" aria-label="Loading The Hidden Retreat">
      <div className="siteLoaderPanel siteLoaderPanelLeft" />
      <div className="siteLoaderPanel siteLoaderPanelRight" />
      <div className="siteLoaderContent">
        <div className="siteLoaderMeta">
          <span>Private forest residence</span>
          <span>01 / 05</span>
        </div>
        <div className="siteLoaderMark" aria-hidden="true">N</div>
        <p className="siteLoaderTitle">The Hidden Retreat</p>
        <div className="siteLoaderLine" aria-hidden="true"><i /></div>
        <p className="siteLoaderStatus">Entering quietly</p>
      </div>
      <div className="siteLoaderCorner" aria-hidden="true">Forest sanctuary / 2026</div>
    </div>
  );
}
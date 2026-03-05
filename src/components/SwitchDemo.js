"use client";

import * as React from "react";

export function SwitchDemo() {
  const [notifications, setNotifications] = React.useState(false);
  const [autoplay, setAutoplay] = React.useState(true);
  const [captions, setCaptions] = React.useState(false);

  function toggleNotifications() {
    setNotifications((v) => !v);
  }

  function toggleAutoplay() {
    setAutoplay((v) => !v);
  }

  function toggleCaptions() {
    setCaptions((v) => !v);
  }

  return (
    <div className="switch-demo">
      {/* 
        This example uses a <div>.
        The same pattern may also be implemented using:
        - <button role="switch">, or
        - <input type="checkbox" role="switch">
      */}

      <div
        role="switch"
        aria-checked={notifications ? "true" : "false"}
        tabIndex={0}
        aria-labelledby="sw-label"
        onClick={toggleNotifications}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggleNotifications();
          }
        }}
      >
        <span id="sw-label" className="label">
          Notifications
        </span>
        <span className="switch" aria-hidden="true">
          <span />
        </span>
        <span className="on" aria-hidden="true">
          On
        </span>
        <span className="off" aria-hidden="true">
          Off
        </span>
      </div>

      <fieldset>
        <legend>Playback Settings</legend>
        <p id="playback-desc">
          These settings apply to all videos.
        </p>

        <div
          role="switch"
          aria-checked={autoplay ? "true" : "false"}
          tabIndex={0}
          aria-labelledby="autoplay-label"
          aria-describedby="playback-desc"
          onClick={toggleAutoplay}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggleAutoplay();
            }
          }}
        >
          <span id="autoplay-label" className="label">
            Autoplay
          </span>
          <span className="switch" aria-hidden="true">
            <span />
          </span>
          <span className="on" aria-hidden="true">
            On
          </span>
          <span className="off" aria-hidden="true">
            Off
          </span>
        </div>

        <div
          role="switch"
          aria-checked={captions ? "true" : "false"}
          tabIndex={0}
          aria-labelledby="captions-label"
          aria-describedby="playback-desc"
          onClick={toggleCaptions}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggleCaptions();
            }
          }}
        >
          <span id="captions-label" className="label">
            Always show captions
          </span>
          <span className="switch" aria-hidden="true">
            <span />
          </span>
          <span className="on" aria-hidden="true">
            On
          </span>
          <span className="off" aria-hidden="true">
            Off
          </span>
        </div>
      </fieldset>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";

const vapi = new Vapi("aba3795b-85b5-4d59-9902-8fdf4a32286f");

export default function VapiAssistant() {
  const [callStatus, setCallStatus] = useState("inactive");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shadowSize, setShadowSize] = useState(0);

  const start = async () => {
    setCallStatus("loading");
    await vapi.start("751e19a3-a7c2-42d1-8695-84f3accfe582");
    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("volume-level", (volume) => {
      const newShadowSize = Math.floor(volume * 10);
      setShadowSize(newShadowSize);
    });
  };

  const stop = () => {
    setCallStatus("inactive");
    vapi.stop();
  };

  useEffect(() => {
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("call-end", () => setCallStatus("inactive"));

    return () => vapi.removeAllListeners();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        zIndex: 999999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: callStatus === "active" ? "#37225b" : "white",
          borderRadius: callStatus === "active" ? "12px" : "50px",
          width: "100%",
          maxWidth: "24rem",
          transition: "all 0.2s ease-in-out",
          gap: "12px",
          boxShadow: "1px 1px 30px 1px rgba(0, 0, 0, 0.05)",
          minWidth:
            callStatus === "inactive"
              ? "240px"
              : callStatus === "loading"
              ? "62px"
              : "100px", // Adjust if needed for 'active'
        }}
      >
        {callStatus === "inactive" && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "8px",
              paddingBottom: "8px",
              backgroundColor: "white",
              borderRadius: "50px",
              width: "100%",
              transition: "box-shadow 0.2s ease-in-out",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
              <p style={{ color: "#333333" }}>Have a quick question?</p>
              <p style={{ fontWeight: "500", color: "#333333" }}>
                {" "}
                Talk with <span style={{ color: "#644d9f" }}>Audree</span>
              </p>
            </div>
            <button
              onClick={start}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                backgroundColor: "#f5945c",
                color: "white",
                fontWeight: "500",
                borderRadius: "45px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#fec76f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f5945c")}
            >
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 330 330"
                xml:space="preserve"
                stroke="#ffffff"
                stroke-width="0.0033"
                style={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  background: "transparent",
                  pointerEvents: "none",
                }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M329.308,258.85c-3.018-16.771-11.092-32.112-23.348-44.368c-25.51-25.511-68.92-36.271-102.533-7.479 c-22.498,19.271-49.544-7.777-61.094-19.326c-11.558-11.559-38.605-38.604-19.335-61.102 c28.791-33.613,18.031-77.024-7.479-102.535C103.264,11.783,87.921,3.709,71.15,0.692C56.043-2.028,41.283,3.306,28.47,16.12 C6.887,37.699,1.906,52.765,0.261,73.018c-1.594,19.656,4.421,37.485,9.749,48.979c0,0,23.239,51.002,85.108,112.872 c61.869,61.87,112.885,85.121,112.885,85.121c11.494,5.328,29.322,11.344,48.98,9.748c20.252-1.646,35.316-6.626,56.896-28.207 C326.692,288.717,332.028,273.957,329.308,258.85z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          </div>
        )}

        {callStatus === "loading" && (
          <div style={{ paddingTop: "11px", paddingBottom: "11px" }}>
            <div
              onClick={stop}
              className="animate-spin"
              style={{
                backgroundColor: "#f5945c",
                height: "44px",
                width: "44px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#fec76f")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f5945c")}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  outline: "none",
                  border: "none",
                  boxShadow: "none",
                  background: "transparent",
                  pointerEvents: "none",
                }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
                    stroke="#ffffff"
                    stroke-width="3.55556"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
        )}

        {callStatus === "active" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "240px",
                height: "240px",
                borderRadius: "8px",
                marginTop: "10px",
                overflow: "hidden",
                backgroundImage:
                  "url('https://imgcdn.stablediffusionweb.com/2025/1/21/0358cfe8-b9a3-4a1b-8223-40c5616109ba.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgb(73, 83, 150, 0.7)",
                  height: "13%",
                  padding: "0.5rem 1.5rem",
                }}
              >
                <p>Audree</p>
                <p>00:00</p>
              </div>
            </div>

            <button
              onClick={stop}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#fec76f")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5945c")
              }
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "240px",
                padding: "0.5rem 1.5rem",
                backgroundColor: "#f5945c",
                color: "white",
                fontWeight: "500",
                marginTop: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                transition:
                  "background-color 0.2s, box-shadow 0.2s ease-in-out",
                boxShadow: `0 0 ${shadowSize * 2}px ${shadowSize}px #f5945c`,
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <path
                  d="M8 13.4782L8 12.8617C8 12.8617 8 11.3963 12 11.3963C16 11.3963 16 12.8617 16 12.8617V13.25C16 14.2064 16.7227 15.0192 17.7004 15.1625L19.7004 15.4556C20.9105 15.6329 22 14.7267 22 13.5429V11.4183C22 10.8313 21.8162 10.2542 21.3703 9.85601C20.2296 8.83732 17.4208 7 12 7C6.25141 7 3.44027 9.58269 2.44083 10.7889C2.1247 11.1704 2 11.6525 2 12.1414L2 14.0643C2 15.3623 3.29561 16.292 4.57997 15.9156L6.57997 15.3295C7.42329 15.0823 8 14.3305 8 13.4782Z"
                  fill="#ffffff"
                ></path>
              </svg>
              <p>End Call</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

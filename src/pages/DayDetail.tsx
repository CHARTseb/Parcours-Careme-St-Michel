import { useMemo } from "react";
import { useDays } from "../data/useDays";
import { Card } from "../components/Card";
import ReactMarkdown from "react-markdown";
import { cleanMd, mdComponents } from "../utils/markdown";
import DayNoteEditor from "../components/DayNoteEditor";

export default function DayDetail({
  id,
  onBack,
}: {
  id: number;
  onBack: () => void;
}) {
  const { days, error } = useDays();

  const day = useMemo(
    () => days.find((d) => d.id === id),
    [days, id]
  );

  if (error) {
    return <div style={{ padding: 20 }}>Erreur : {error}</div>;
  }

  if (!days.length) {
    return <div style={{ padding: 20 }}>Chargement…</div>;
  }

  if (!day) {
    return <div style={{ padding: 20 }}>Jour introuvable.</div>;
  }

  return (
    <div
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: 16,
      }}
    >
      <button
        onClick={onBack}
        style={{
          border: "1px solid rgba(0,0,0,.15)",
          background: "white",
          borderRadius: 12,
          padding: "8px 12px",
          cursor: "pointer",
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        ← Retour
      </button>

      <Card title={day.titre}>
        {/* Référence biblique */}
        {day.reference_biblique ? (
          <div
            style={{
              opacity: 0.9,
              marginBottom: 10,
            }}
          >
            <b>{day.reference_biblique}</b>
          </div>
        ) : null}

        {/* Texte biblique */}
        {day.texte_biblique ? (
          <div
            className="bibleText"
            style={{
              fontStyle: "italic",
              marginBottom: 14,
              opacity: 0.95,
            }}
          >
            {day.texte_biblique}
          </div>
        ) : null}

        {/* Consignes
            Le champ reste "paroisse" dans days.json */}
        {day.paroisse ? (
          <>
            <h3
              style={{
                margin: "18px 0 8px",
              }}
            >
              Consignes
            </h3>

            <div className="md bodyText">
              <ReactMarkdown components={mdComponents}>
                {cleanMd(day.paroisse)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Méditation */}
        {day.reflexion ? (
          <>
            <h3
              style={{
                margin: "18px 0 8px",
              }}
            >
              Méditation
            </h3>

            <div className="md bodyText">
              <ReactMarkdown components={mdComponents}>
                {cleanMd(day.reflexion)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Conversion */}
        {day.resolution ? (
          <>
            <h3
              style={{
                margin: "18px 0 8px",
              }}
            >
              Conversion
            </h3>

            <div className="md bodyText">
              <ReactMarkdown components={mdComponents}>
                {cleanMd(day.resolution)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Prière */}
        {day.priere ? (
          <>
            <h3
              style={{
                margin: "18px 0 8px",
              }}
            >
              Prière
            </h3>

            <div
              className="md bodyText"
              style={{
                fontStyle: "italic",
                opacity: 0.92,
                lineHeight: 1.7,
              }}
            >
              <ReactMarkdown components={mdComponents}>
                {cleanMd(day.priere)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Note personnelle */}
        <DayNoteEditor dayId={String(day.id)} />
      </Card>
    </div>
  );
}
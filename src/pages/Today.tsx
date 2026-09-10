import { useMemo } from "react";
import { useDays } from "../data/useDays";
import { Card } from "../components/Card";
import ReactMarkdown from "react-markdown";
import { cleanMd, mdComponents } from "../utils/markdown";
import DayNoteEditor from "../components/DayNoteEditor";

export default function Today({
  onOpenDetail,
}: {
  onOpenDetail: (id: number) => void;
}) {
  const { days, error } = useDays();

  const today = useMemo(() => {
    if (!days.length) return null;

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const todayDate = `${year}-${month}-${day}`;

    return days.find((d) => d.date === todayDate) ?? null;
  }, [days]);

  if (error) {
    return <div style={{ padding: 20 }}>Erreur : {error}</div>;
  }

  if (!days.length) {
    return <div style={{ padding: 20 }}>Chargement…</div>;
  }

  if (!today) {
    return (
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        <Card title="Aujourd’hui">
          <p>Aucun jour du parcours n’est prévu aujourd’hui.</p>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 820,
        margin: "0 auto",
      }}
    >
      <Card title={today.titre}>
        {/* Date */}
        {today.date ? (
          <div
            style={{
              opacity: 0.7,
              marginBottom: 10,
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {new Date(`${today.date}T12:00:00`).toLocaleDateString(
              "fr-FR",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>
        ) : null}

        {/* Référence biblique */}
        {today.reference_biblique ? (
          <div
            style={{
              opacity: 0.9,
              marginBottom: 10,
            }}
          >
            <b>{today.reference_biblique}</b>
          </div>
        ) : null}

        {/* Texte biblique */}
        {today.texte_biblique ? (
          <div
            className="bibleText"
            style={{
              fontStyle: "italic",
              marginBottom: 14,
              opacity: 0.95,
            }}
          >
            {today.texte_biblique}
          </div>
        ) : null}

        {/* Consignes
            Le champ reste "paroisse" dans days.json */}
        {today.paroisse ? (
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
                {cleanMd(today.paroisse)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Méditation */}
        {today.reflexion ? (
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
                {cleanMd(today.reflexion)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Conversion */}
        {today.resolution ? (
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
                {cleanMd(today.resolution)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Prière */}
        {today.priere ? (
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
                {cleanMd(today.priere)}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* Note personnelle */}
        <DayNoteEditor dayId={String(today.id)} />

        {/* Accès au détail */}
        <button
          onClick={() => onOpenDetail(today.id)}
          style={{
            width: "100%",
            marginTop: 20,
            border: "1px solid var(--border)",
            background: "var(--accentSoft)",
            color: "var(--text)",
            borderRadius: 14,
            padding: "12px 14px",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 15,
          }}
        >
          Ouvrir le détail du jour →
        </button>
      </Card>
    </div>
  );
}
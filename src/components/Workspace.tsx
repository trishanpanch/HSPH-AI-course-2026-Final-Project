"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Download,
  FileText,
  Info,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import {
  Adaptation,
  LessonDraft,
  Plan,
  canApprove,
  examples,
  needs,
  parseSource,
  planSchema,
  validateAdaptation,
  worksheetFingerprint,
} from "@/lib/worksheet";

const empty: LessonDraft = {
  source: "",
  goal: "",
  grade: "Grade 2",
  age: "7–8",
  needs: [],
  note: "",
  confirmed: false,
};
const steps = ["Worksheet", "Groups", "Plan", "Review", "Download"];
type PdfSnapshot = {
  blob: Blob;
  url: string;
  fingerprint: string;
  pages: string[];
};
export default function Workspace() {
  const [step, setStep] = useState(0);
  const [lesson, setLesson] = useState<LessonDraft>(empty);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [draft, setDraft] = useState<Adaptation | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [resolved, setResolved] = useState<string[]>([]);
  const [pdf, setPdf] = useState<PdfSnapshot | null>(null);
  const [reviewed, setReviewed] = useState(false);
  const [approved, setApproved] = useState<string | null>(null);
  const epoch = useRef(0);
  const controller = useRef<AbortController | null>(null);
  const top = useRef<HTMLDivElement>(null);
  useEffect(
    () => () => {
      if (pdf) URL.revokeObjectURL(pdf.url);
    },
    [pdf],
  );
  useEffect(() => {
    top.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (lesson.source) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [lesson.source]);
  function clearApproval() {
    setPdf(null);
    setReviewed(false);
    setApproved(null);
    setResolved([]);
  }
  function cancel() {
    epoch.current++;
    controller.current?.abort();
    setBusy(null);
    setError("");
  }
  function updateLesson(patch: Partial<LessonDraft>) {
    cancel();
    setLesson((old) => ({
      ...old,
      ...patch,
      ...("source" in patch ? { confirmed: false } : {}),
    }));
    setPlan(null);
    setDraft(null);
    clearApproval();
  }
  function updatePlan(patch: Partial<Plan>) {
    cancel();
    setPlan((old) => (old ? { ...old, ...patch } : old));
    setDraft(null);
    clearApproval();
  }
  function updateDraft(patch: Partial<Adaptation>) {
    cancel();
    setDraft((old) => (old ? { ...old, ...patch } : old));
    clearApproval();
  }
  function loadExample(which: keyof typeof examples) {
    if (
      lesson.source &&
      !window.confirm(
        "Replace the current worksheet with this fictional example?",
      )
    )
      return;
    updateLesson({ ...empty, ...examples[which] });
  }
  let parsed: ReturnType<typeof parseSource> | null = null,
    sourceError = "";
  try {
    if (lesson.source.trim()) parsed = parseSource(lesson.source);
  } catch (e) {
    sourceError = (e as Error).message;
  }
  const intakeReady =
    !!parsed &&
    lesson.goal.trim().length > 0 &&
    lesson.grade.trim().length > 0 &&
    lesson.age.trim().length > 0 &&
    lesson.confirmed;
  const canDownload =
    !!pdf &&
    !!draft &&
    approved === pdf.fingerprint &&
    pdf.fingerprint === worksheetFingerprint(draft);
  async function generate(mode: "plan" | "adapt") {
    if (!intakeReady || !lesson.needs.length) return;
    cancel();
    const id = epoch.current;
    const abort = new AbortController();
    controller.current = abort;
    setBusy(mode);
    setApproved(null);
    setPdf(null);
    setReviewed(false);
    setResolved([]);
    try {
      const response = await fetch(`${window.location.origin}/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson, ...(mode === "adapt" ? { plan } : {}) }),
        signal: abort.signal,
      });
      const value = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : {
            error:
              response.status === 401
                ? "The class password was not accepted. Refresh the page and sign in again."
                : "The service is unavailable or not configured. Your inputs are preserved.",
          };
      if (epoch.current !== id) return;
      if (!response.ok)
        throw new Error(
          value.error ||
            "The request could not be completed. Please try again.",
        );
      if (mode === "plan") {
        setPlan(planSchema.parse(value.data));
        setDraft(null);
        setStep(2);
      } else {
        setDraft(validateAdaptation(value.data, parseSource(lesson.source)));
        setStep(3);
      }
    } catch (e) {
      if (epoch.current === id && (e as Error).name !== "AbortError")
        setError((e as Error).message);
    } finally {
      if (epoch.current === id) setBusy(null);
    }
  }
  async function preparePdf() {
    if (!draft) return;
    cancel();
    const id = epoch.current;
    const snapshot = structuredClone(draft);
    setBusy("pdf");
    setApproved(null);
    setReviewed(false);
    setPdf(null);
    try {
      const { createWorksheetPdf } = await import("./WorksheetPdf");
      const blob = await createWorksheetPdf(snapshot);
      if (epoch.current !== id) return;
      const { renderPdfPages } = await import("@/lib/pdf-preview");
      const pages = await renderPdfPages(blob);
      if (epoch.current !== id) return;
      setPdf({
        blob,
        url: URL.createObjectURL(blob),
        fingerprint: worksheetFingerprint(snapshot),
        pages,
      });
    } catch {
      if (epoch.current === id)
        setError(
          "The PDF could not be prepared. Your worksheet is still here. Please try again.",
        );
    } finally {
      if (epoch.current === id) setBusy(null);
    }
  }
  function approve() {
    if (pdf && canApprove(draft, resolved, reviewed, pdf.fingerprint)) {
      setApproved(pdf.fingerprint);
      setStep(4);
    }
  }
  function download() {
    if (!canDownload || !pdf) return;
    const a = document.createElement("a");
    a.href = pdf.url;
    a.download = "CHLD-Adapt-worksheet.pdf";
    a.click();
  }
  const go = (n: number) => {
    cancel();
    setStep(n);
  };
  const busyButton = (label: string) => (
    <>
      <LoaderCircle className="spin" size={17} />
      {label}
    </>
  );
  return (
    <>
      <header className="site-header">
        <a href="/" className="brand" aria-label="CHLD Adapt home">
          <BookOpen size={23} strokeWidth={1.5} />
          CHLD Adapt
        </a>
        <span className="prototype">
          <span />
          Class prototype
        </span>
        <span className="header-note">Made for teachers. Reviewed by you.</span>
      </header>
      <nav className="steps" aria-label="Worksheet progress">
        {steps.map((name, i) => (
          <div
            className={`step ${step === i ? "active" : ""} ${step > i ? "complete" : ""}`}
            key={name}
          >
            <span className="step-number">
              {step > i ? <Check size={14} /> : i + 1}
            </span>
            <span>{name}</span>
            {i < 4 && <span className="step-line" />}
          </div>
        ))}
      </nav>
      <div className="session-note">
        <Info size={15} />
        <span>
          Work stays in this session. Download your approved worksheet before
          closing.
        </span>
      </div>
      <main
        ref={top}
        tabIndex={-1}
        className={`workspace ${step === 3 ? "wide" : ""}`}
      >
        {step > 0 && (
          <div className="goal-strip">
            <BookOpen size={18} />
            <div>
              <span>Shared learning goal</span>
              <p>{lesson.goal}</p>
            </div>
            <button className="text-button" onClick={() => go(0)}>
              Edit lesson
            </button>
          </div>
        )}
        <div className="page-heading">
          <div>
            <p className="eyebrow">
              Step {step + 1} of 5 ·{" "}
              {step === 0 ? "Begin with your lesson" : "Group A"}
            </p>
            <h1>
              {
                [
                  "Adapt a worksheet for your class.",
                  "What does this group need?",
                  "A thoughtful plan, before we begin.",
                  "Review, refine, make it yours.",
                  "Ready for your classroom.",
                ][step]
              }
            </h1>
            <p className="subtitle">
              {
                [
                  "Keep the learning goal. Adjust how learners access the work.",
                  "Choose one to three difficulties to focus on.",
                  "Check the proposed changes against what your learners need.",
                  "Compare with the original. You make the final teaching decisions.",
                  "Your approved worksheet is ready to download and print.",
                ][step]
              }
            </p>
          </div>
          {step === 3 && <span className="status">Draft · teacher review</span>}
          {step === 4 && (
            <span className="status approved">
              <CheckCircle2 size={16} />
              Approved
            </span>
          )}
        </div>
        {error && (
          <div role="alert" className="alert error">
            <strong>Let’s try that again.</strong>
            <p>{error}</p>
          </div>
        )}
        {step === 0 && (
          <>
            <section className="panel lesson-panel">
              <div className="section-heading">
                <BookOpen size={19} />
                <h2>The lesson we’re keeping</h2>
              </div>
              <div className="lesson-fields">
                <label className="goal-field">
                  Learning goal
                  <textarea
                    rows={3}
                    maxLength={600}
                    value={lesson.goal}
                    placeholder="What should learners be able to do?"
                    onChange={(e) => updateLesson({ goal: e.target.value })}
                  />
                </label>
                <div className="small-fields">
                  <label>
                    Grade
                    <input
                      maxLength={50}
                      value={lesson.grade}
                      onChange={(e) => updateLesson({ grade: e.target.value })}
                    />
                  </label>
                  <label>
                    Approximate age range
                    <input
                      maxLength={50}
                      value={lesson.age}
                      onChange={(e) => updateLesson({ age: e.target.value })}
                    />
                  </label>
                </div>
              </div>
              <p className="field-note">
                <ShieldCheck size={15} />
                This goal stays the same throughout the adaptation.
              </p>
            </section>
            <div className="source-heading">
              <div>
                <h2>Your original worksheet</h2>
                <p>
                  Paste a complete text-only worksheet. Keep each question on
                  its own numbered line.
                </p>
              </div>
              <div className="example-actions">
                <span>Try a fictional example</span>
                <button
                  className="small-button"
                  onClick={() => loadExample("reading")}
                >
                  Reading
                </button>
                <button
                  className="small-button"
                  onClick={() => loadExample("maths")}
                >
                  Mathematics
                </button>
              </div>
            </div>
            <div className="comparison intake-comparison">
              <section className="panel editor-panel">
                <div className="section-heading">
                  <FileText size={18} />
                  <h3>Paste and check your text</h3>
                  <span className="count">{lesson.source.length}/6000</span>
                </div>
                <label className="sr-only" htmlFor="source">
                  Worksheet text
                </label>
                <textarea
                  id="source"
                  className="source-input"
                  rows={18}
                  maxLength={6000}
                  value={lesson.source}
                  onChange={(e) => updateLesson({ source: e.target.value })}
                  placeholder={
                    "Worksheet title\n\nReading passage or instructions…\n\n1. First question\n2. Second question"
                  }
                />
                {sourceError && <p className="field-error">{sourceError}</p>}
                <p className="field-note">
                  Up to 12 questions. Use 1., 2., 3. to make every question easy
                  to check.
                </p>
              </section>
              <section className="source-preview panel">
                <div className="section-heading">
                  <BookOpen size={18} />
                  <h3>Check what’s included</h3>
                  {parsed && (
                    <span className="count">
                      {parsed.questions.length} questions
                    </span>
                  )}
                </div>
                {parsed ? (
                  <div className="paper">
                    <p className="paper-label">Original worksheet</p>
                    <div className="preserve passage">{parsed.context}</div>
                    {parsed.questions.map((q) => (
                      <div className="paper-question" key={q.id}>
                        <strong>{q.id.replace("Q", "")}.</strong>
                        <div className="preserve">{q.text}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-preview">
                    <FileText size={42} strokeWidth={1} />
                    <h3>Your worksheet starts here.</h3>
                    <p>
                      Paste your material, or try a fictional example to explore
                      the process.
                    </p>
                  </div>
                )}
              </section>
            </div>
            <div className="alert">
              <Info size={18} />
              <p>
                This version is for complete text-only worksheets. If an
                essential diagram, table or picture is needed to answer a
                question, choose another worksheet.
              </p>
            </div>
            <label className="confirmation panel">
              <input
                type="checkbox"
                checked={lesson.confirmed}
                disabled={!parsed}
                onChange={(e) => updateLesson({ confirmed: e.target.checked })}
              />
              <span>
                <strong>
                  I checked the source: all passages, instructions and questions
                  are complete.
                </strong>
                <small>
                  No essential diagram, table or visual has been omitted.
                </small>
              </span>
            </label>
            <div className="action-bar">
              <span className="muted">Your teaching goal leads the way.</span>
              <button
                className="primary"
                disabled={!intakeReady}
                onClick={() => go(1)}
              >
                Continue to groups
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="group-heading">
              <span className="group-tab">Group A</span>
              <span>{lesson.needs.length} of 3 difficulties selected</span>
            </div>
            <div className="needs-grid">
              {[...new Set(needs.map((n) => n.section))].map((section) => (
                <section className="panel needs-section" key={section}>
                  <h2>{section}</h2>
                  {needs
                    .filter((n) => n.section === section)
                    .map((n) => (
                      <label
                        className={`need-option ${lesson.needs.includes(n.label) ? "selected" : ""}`}
                        key={n.label}
                      >
                        <input
                          type="checkbox"
                          checked={lesson.needs.includes(n.label)}
                          disabled={
                            !lesson.needs.includes(n.label) &&
                            lesson.needs.length >= 3
                          }
                          onChange={(e) =>
                            updateLesson({
                              needs: e.target.checked
                                ? [...lesson.needs, n.label]
                                : lesson.needs.filter((v) => v !== n.label),
                            })
                          }
                        />
                        <span>
                          <strong>{n.label}</strong>
                          <small>{n.description}</small>
                        </span>
                      </label>
                    ))}
                </section>
              ))}
            </div>
            <section className="panel context-panel">
              <label>
                Anything else we should know about what is difficult?
                <span className="optional">Optional</span>
                <textarea
                  rows={3}
                  maxLength={1000}
                  value={lesson.note}
                  onChange={(e) => updateLesson({ note: e.target.value })}
                  placeholder="For example: Learners lose their place in long sets of instructions."
                />
              </label>
              <p className="field-note">
                Describe the worksheet difficulty. Leave out pupil names and
                personal histories.
              </p>
            </section>
            <div className="action-bar">
              <button className="secondary" onClick={() => go(0)}>
                <ArrowLeft size={16} />
                Back to worksheet
              </button>
              <button
                className="primary"
                disabled={!lesson.needs.length || !!busy}
                onClick={() => generate("plan")}
              >
                {busy ? (
                  busyButton("Preparing the plan…")
                ) : (
                  <>
                    Review adaptation plan
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
        {step === 2 && plan && (
          <>
            <div className="plan-layout">
              <section className="panel plan-main">
                <div className="section-heading">
                  <FileText size={18} />
                  <h2>Proposed adaptations</h2>
                  <span className="count">Group A</span>
                </div>
                <label>
                  Our approach
                  <textarea
                    rows={3}
                    maxLength={1200}
                    value={plan.summary}
                    onChange={(e) => updatePlan({ summary: e.target.value })}
                  />
                </label>
                <div className="strategy-list">
                  {plan.strategies.map((strategy, i) => (
                    <label key={i} className="strategy">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <textarea
                        aria-label={`Adaptation ${i + 1}`}
                        rows={2}
                        maxLength={400}
                        value={strategy}
                        onChange={(e) =>
                          updatePlan({
                            strategies: plan.strategies.map((v, j) =>
                              i === j ? e.target.value : v,
                            ),
                          })
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>
              <aside>
                <section className="panel">
                  <h2>What this group needs</h2>
                  <ul className="simple-list">
                    {lesson.needs.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  <button className="text-button" onClick={() => go(1)}>
                    Change needs
                  </button>
                </section>
                <div className="alert plan-notice">
                  <ShieldCheck size={22} />
                  <h3>
                    Same learning goal.
                    <br />A clearer way in.
                  </h3>
                  <p>
                    Keep every question and the thinking it requires. Review the
                    worksheet before giving it to learners.
                  </p>
                </div>
              </aside>
            </div>
            {plan.cautions.length > 0 && (
              <section className="alert">
                <div>
                  <h3>Points to consider</h3>
                  <ul>
                    {plan.cautions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
            <div className="action-bar">
              <button className="secondary" onClick={() => go(1)}>
                <ArrowLeft size={16} />
                Back to needs
              </button>
              <button
                className="primary"
                disabled={
                  !!busy ||
                  !plan.summary.trim() ||
                  plan.strategies.some((s) => !s.trim())
                }
                onClick={() => generate("adapt")}
              >
                {busy ? (
                  busyButton("Creating your worksheet…")
                ) : (
                  <>
                    Create worksheet
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </>
        )}
        {step === 3 && draft && (
          <>
            <div className="review-top">
              <span className="group-tab">
                Group A · {draft.questions.length} questions
              </span>
              <button
                className="text-button"
                disabled={!!busy}
                onClick={() => generate("adapt")}
              >
                <RefreshCw size={15} />
                Regenerate draft
              </button>
            </div>
            <div className="comparison review-comparison">
              <section className="panel">
                <div className="section-heading">
                  <FileText size={18} />
                  <h2>Original worksheet</h2>
                </div>
                <div className="paper original-paper preserve">
                  {lesson.source}
                </div>
              </section>
              <section className="panel editor-panel">
                <div className="section-heading">
                  <FileText size={18} />
                  <h2>Your editable adaptation</h2>
                </div>
                <label>
                  Worksheet title
                  <input
                    maxLength={140}
                    value={draft.title}
                    onChange={(e) => updateDraft({ title: e.target.value })}
                  />
                </label>
                <label>
                  Instructions
                  <textarea
                    rows={3}
                    maxLength={1200}
                    value={draft.instructions}
                    onChange={(e) =>
                      updateDraft({ instructions: e.target.value })
                    }
                  />
                </label>
                <label>
                  Passage and source context
                  <textarea
                    rows={6}
                    maxLength={7000}
                    value={draft.passage}
                    onChange={(e) => updateDraft({ passage: e.target.value })}
                  />
                </label>
                {draft.questions.map((q, i) => (
                  <label key={q.id}>
                    Question {q.id.replace("Q", "")}
                    <textarea
                      rows={3}
                      maxLength={1800}
                      value={q.text}
                      onChange={(e) =>
                        updateDraft({
                          questions: draft.questions.map((v, j) =>
                            i === j ? { ...v, text: e.target.value } : v,
                          ),
                        })
                      }
                    />
                  </label>
                ))}
              </section>
            </div>
            <section className="panel changes">
              <h2>What changed</h2>
              <ul>
                {draft.changes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
              <p className="muted">
                This explains the AI draft. Check your own edits against the
                original and the learning goal.
              </p>
            </section>
            <section className="panel concerns">
              <h2>Your teaching judgment</h2>
              <p>
                Check facts, wording, required reasoning and every question. The
                AI cannot judge whether this is right for your learners.
              </p>
              {draft.concerns.length ? (
                draft.concerns.map((c) => (
                  <label className="concern" key={c.id}>
                    <input
                      type="checkbox"
                      checked={resolved.includes(c.id)}
                      onChange={(e) => {
                        setApproved(null);
                        setResolved(
                          e.target.checked
                            ? [...resolved, c.id]
                            : resolved.filter((v) => v !== c.id),
                        );
                      }}
                    />
                    <span>
                      <strong>{c.message}</strong>
                      <small>
                        I have corrected this or confirmed that it preserves the
                        learning goal.
                      </small>
                    </span>
                  </label>
                ))
              ) : (
                <p className="field-note">
                  The AI flagged no specific concerns. Teacher review is still
                  required.
                </p>
              )}
            </section>
            <section className="panel pdf-section">
              <div className="section-heading">
                <FileText size={19} />
                <h2>Review the actual A4 PDF</h2>
                <span className="count">Print preview</span>
              </div>
              <p>
                Check that every question, passage and answer space is present
                and readable. Edits require a new preview and approval.
              </p>
              {pdf ? (
                <>
                  <div
                    className="pdf-pages"
                    aria-label="Actual A4 worksheet PDF preview"
                  >
                    {pdf.pages.map((page, i) => (
                      <figure key={i}>
                        <img
                          src={page}
                          alt={`Worksheet PDF page ${i + 1}`}
                          width={804}
                          height={1137}
                        />
                        <figcaption>
                          Page {i + 1} of {pdf.pages.length} · A4
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                  <label className="confirmation">
                    <input
                      type="checkbox"
                      checked={reviewed}
                      onChange={(e) => {
                        setReviewed(e.target.checked);
                        setApproved(null);
                      }}
                    />
                    <span>
                      <strong>
                        I reviewed this PDF and approve its content and layout
                        for the shared learning goal.
                      </strong>
                      <small>
                        All questions are present, the wording is appropriate,
                        and no answer or required skill has been changed.
                      </small>
                    </span>
                  </label>
                </>
              ) : (
                <button
                  className="secondary"
                  disabled={
                    !!busy ||
                    !draft.title.trim() ||
                    !draft.instructions.trim() ||
                    draft.questions.some((q) => !q.text.trim())
                  }
                  onClick={preparePdf}
                >
                  {busy === "pdf" ? (
                    busyButton("Preparing PDF…")
                  ) : (
                    <>
                      Prepare PDF preview
                      <FileText size={16} />
                    </>
                  )}
                </button>
              )}
            </section>
            <div className="action-bar">
              <button className="secondary" onClick={() => go(2)}>
                <ArrowLeft size={16} />
                Back to plan
              </button>
              <button
                className="primary"
                disabled={
                  !!busy ||
                  !canApprove(
                    draft,
                    resolved,
                    reviewed,
                    pdf?.fingerprint ?? null,
                  )
                }
                onClick={approve}
              >
                Approve this PDF
                <Check size={17} />
              </button>
            </div>
          </>
        )}
        {step === 4 && draft && pdf && (
          <>
            <section className="download-panel panel">
              <div className="download-icon">
                <CheckCircle2 size={42} strokeWidth={1.4} />
              </div>
              <h2>{draft.title}</h2>
              <p>One worksheet. Every question. Your approval.</p>
              <div className="download-details">
                <span>Group A</span>
                <span>A4 PDF</span>
                <span>{draft.questions.length} questions</span>
              </div>
              <button
                className="primary"
                disabled={!canDownload}
                onClick={download}
              >
                <Download size={18} />
                Download PDF
              </button>
              <p className="field-note">
                This downloads the exact PDF you reviewed.
              </p>
            </section>
            <div className="alert">
              <Info size={18} />
              <p>
                You can download this approved version again while the session
                is open. Save it now; the session is not stored.
              </p>
            </div>
            <div className="action-bar">
              <button className="secondary" onClick={() => go(3)}>
                <ArrowLeft size={16} />
                Back to review
              </button>
              <button
                className="text-button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Start a new worksheet? Download the current PDF first.",
                    )
                  ) {
                    cancel();
                    setLesson(empty);
                    setPlan(null);
                    setDraft(null);
                    clearApproval();
                    go(0);
                  }
                }}
              >
                Start another worksheet
                <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </main>
      <footer className="site-footer">
        <span className="brand">CHLD Adapt</span>
        <span>
          Building AI Solutions to Transform Health Care · HSPH class project
        </span>
        <span>Teacher-led. Session only.</span>
      </footer>
    </>
  );
}

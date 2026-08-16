import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useMemo, useState } from 'react'

type Stage =
  | 'entry'
  | 'issue'
  | 'site'
  | 'window'
  | 'contact'
  | 'review'
  | 'received'
  | 'brief'
  | 'hazard'

type SectionKey = Exclude<Stage, 'entry' | 'hazard'>

type RequestData = {
  issue: string
  issueNotes: string
  area: string
  photoCount: number
  accessNote: string
  window: string
  windowNote: string
  name: string
  phone: string
  email: string
  contactPreference: 'Text' | 'Email' | 'Call'
}

const tabs: Array<{ key: SectionKey; label: string }> = [
  { key: 'issue', label: 'ISSUE' },
  { key: 'site', label: 'SITE' },
  { key: 'window', label: 'WINDOW' },
  { key: 'contact', label: 'CONTACT' },
  { key: 'review', label: 'REVIEW' },
  { key: 'received', label: 'RECEIVED' },
  { key: 'brief', label: 'BRIEF' },
]

const issueOptions = [
  'Leaking fixture or pipe',
  'Clogged sink or drain',
  'Running toilet',
  'Low water pressure',
  'Fixture install or replacement',
  'Other non-emergency plumbing issue',
]

const areaOptions = ['Kitchen', 'Bathroom', 'Laundry', 'Basement', 'Other area']
const windowOptions = ['This week', 'Next week', 'Flexible']

const initialData: RequestData = {
  issue: '',
  issueNotes: '',
  area: '',
  photoCount: 0,
  accessNote: '',
  window: '',
  windowNote: '',
  name: '',
  phone: '',
  email: '',
  contactPreference: 'Text',
}

const previousStage: Partial<Record<Stage, Stage>> = {
  issue: 'entry',
  site: 'issue',
  window: 'site',
  contact: 'window',
  review: 'contact',
  received: 'review',
  brief: 'received',
  hazard: 'issue',
}

const stageSection: Partial<Record<Stage, SectionKey>> = {
  issue: 'issue',
  site: 'site',
  window: 'window',
  contact: 'contact',
  review: 'review',
  received: 'received',
  brief: 'brief',
}

function OptionButton({
  selected,
  onClick,
  children,
  helper,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  helper?: string
}) {
  return (
    <button
      type="button"
      className={`choice ${selected ? 'choice--selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="choice__mark" aria-hidden="true">
        <span />
      </span>
      <span className="choice__copy">
        <strong>{children}</strong>
        {helper ? <small>{helper}</small> : null}
      </span>
    </button>
  )
}

function FieldLabel({ children, optional = false }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="field-label">
      <span>{children}</span>
      {optional ? <small>OPTIONAL</small> : null}
    </label>
  )
}

function SummaryRow({ label, value, onEdit }: { label: string; value: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="summary-row">
      <div>
        <span className="summary-row__label">{label}</span>
        <div className="summary-row__value">{value}</div>
      </div>
      {onEdit ? (
        <button type="button" className="text-button" onClick={onEdit}>
          Edit
        </button>
      ) : null}
    </div>
  )
}

function MarginTabs({ active, reduceMotion }: { active?: SectionKey; reduceMotion: boolean }) {
  return (
    <aside className="margin-tabs" aria-label="Service request sections">
      {tabs.map((tab) => {
        const isActive = active === tab.key
        return (
          <div className={`margin-tab ${isActive ? 'margin-tab--active' : ''}`} key={tab.key} aria-current={isActive ? 'step' : undefined}>
            {isActive ? (
              <motion.span
                className="margin-tab__active"
                layoutId="margin-tab-transfer"
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 38 }}
              />
            ) : null}
            <span className="margin-tab__label">{tab.label}</span>
          </div>
        )
      })}
    </aside>
  )
}

export default function App() {
  const reduceMotion = useReducedMotion() ?? false
  const [stage, setStage] = useState<Stage>('entry')
  const [data, setData] = useState<RequestData>(initialData)
  const reference = 'RQS-84271'

  const activeSection = stageSection[stage]
  const canContinueIssue = Boolean(data.issue)
  const canContinueSite = Boolean(data.area)
  const canContinueWindow = Boolean(data.window)
  const canContinueContact = Boolean(data.name.trim() && (data.phone.trim() || data.email.trim()))

  const contactLine = useMemo(() => {
    if (data.contactPreference === 'Email') return data.email || 'Email not provided'
    return data.phone || data.email || 'Contact not provided'
  }, [data.contactPreference, data.email, data.phone])

  function update<K extends keyof RequestData>(key: K, value: RequestData[K]) {
    setData((current) => ({ ...current, [key]: value }))
  }

  function goBack() {
    const previous = previousStage[stage]
    if (previous) setStage(previous)
  }

  function restart() {
    setData(initialData)
    setStage('entry')
  }

  const pageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

  return (
    <main className="app-shell">
      <header className="top-note">
        <span className="top-note__eyebrow">SERVICE REQUEST · DEMO</span>
        <span className="top-note__truth">Request first. Availability confirmed later.</span>
      </header>

      <section className={`call-sheet ${stage === 'entry' || stage === 'hazard' ? 'call-sheet--plain' : ''}`}>
        {activeSection ? <MarginTabs active={activeSection} reduceMotion={reduceMotion} /> : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="screen"
            key={stage}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={pageTransition}
          >
            {stage !== 'entry' && stage !== 'received' ? (
              <button type="button" className="back-button" onClick={goBack} aria-label="Go back">
                ← Back
              </button>
            ) : null}

            {stage === 'entry' ? (
              <div className="entry-screen">
                <div className="registration-mark" aria-hidden="true">SR</div>
                <p className="kicker">MISSED CONTACT → SERVICE-READY REQUEST</p>
                <h1>We couldn't connect. Leave the useful part now.</h1>
                <p className="lede">
                  Share what you're noticing, where it is, and when access works for you. The service team can follow up without restarting the intake.
                </p>
                <div className="truth-block">
                  <strong>This does not book an appointment.</strong>
                  <span>The team still needs to confirm availability, scope, and next steps.</span>
                </div>
                <button type="button" className="primary-button" onClick={() => setStage('issue')}>
                  Start service request
                </button>
                <p className="microcopy">No account required · Non-emergency plumbing demo · Synthetic demo data only</p>
              </div>
            ) : null}

            {stage === 'issue' ? (
              <div>
                <p className="section-code">SERVICE CALL SHEET / ISSUE</p>
                <h1>What's the issue?</h1>
                <p className="lede lede--compact">Choose the closest non-emergency description. No diagnosis is made here.</p>
                <div className="choice-list">
                  {issueOptions.map((option) => (
                    <OptionButton key={option} selected={data.issue === option} onClick={() => update('issue', option)}>
                      {option}
                    </OptionButton>
                  ))}
                </div>
                <button type="button" className="boundary-link" onClick={() => setStage('hazard')}>
                  Water is rapidly flooding or the situation feels unsafe
                </button>
                <button type="button" className="primary-button" disabled={!canContinueIssue} onClick={() => setStage('site')}>
                  Continue
                </button>
              </div>
            ) : null}

            {stage === 'hazard' ? (
              <div className="hazard-screen">
                <p className="section-code section-code--boundary">OUTSIDE THIS REQUEST FLOW</p>
                <h1>Use urgent local help for an immediate hazard.</h1>
                <p className="lede">
                  This demo is only for non-emergency service requests. It does not assess safety, dispatch emergency service, or tell you a situation is safe.
                </p>
                <div className="boundary-panel">
                  <strong>If there is immediate danger, major uncontrolled flooding, fire, gas, or electrical risk:</strong>
                  <span>move to a safe place if needed and contact the appropriate local emergency or utility service.</span>
                </div>
                <button type="button" className="secondary-button" onClick={() => setStage('issue')}>
                  Back to non-emergency request
                </button>
              </div>
            ) : null}

            {stage === 'site' ? (
              <div>
                <p className="section-code">SERVICE CALL SHEET / SITE CONTEXT</p>
                <h1>Show us what you're noticing.</h1>
                <p className="lede lede--compact">Context helps the service team prepare. Photos are evidence, not a diagnosis.</p>

                <FieldLabel>Where is it?</FieldLabel>
                <div className="chip-grid">
                  {areaOptions.map((area) => (
                    <button
                      type="button"
                      key={area}
                      className={`chip ${data.area === area ? 'chip--selected' : ''}`}
                      onClick={() => update('area', area)}
                    >
                      {area}
                    </button>
                  ))}
                </div>

                <FieldLabel optional>Photos of the issue</FieldLabel>
                <div className="photo-strip" aria-label={`${data.photoCount} demo photos attached`}>
                  {Array.from({ length: data.photoCount }).map((_, index) => (
                    <div className="demo-photo" key={index} aria-label={`Demo context photo ${index + 1}`}>
                      <span className="demo-photo__line" />
                      <span className="demo-photo__basin" />
                      <small>PHOTO {index + 1}</small>
                    </div>
                  ))}
                  {data.photoCount < 3 ? (
                    <button type="button" className="add-photo" onClick={() => update('photoCount', data.photoCount + 1)}>
                      + Add demo photo
                    </button>
                  ) : null}
                </div>

                <FieldLabel optional>What are you noticing?</FieldLabel>
                <textarea
                  value={data.issueNotes}
                  onChange={(event) => update('issueNotes', event.target.value)}
                  placeholder="Example: Slow drip under the kitchen sink, noticed this morning."
                  maxLength={300}
                />
                <div className="counter">{data.issueNotes.length}/300</div>

                <FieldLabel optional>Access note</FieldLabel>
                <input
                  value={data.accessNote}
                  onChange={(event) => update('accessNote', event.target.value)}
                  placeholder="Example: Weekday mornings are easiest."
                />

                <button type="button" className="primary-button" disabled={!canContinueSite} onClick={() => setStage('window')}>
                  Continue
                </button>
              </div>
            ) : null}

            {stage === 'window' ? (
              <div>
                <p className="section-code">SERVICE CALL SHEET / ACCESS WINDOW</p>
                <h1>When could access work?</h1>
                <p className="lede lede--compact">
                  Choose a preferred window. <strong>This is not live availability and does not reserve a time.</strong>
                </p>
                <div className="choice-list">
                  {windowOptions.map((option) => (
                    <OptionButton
                      key={option}
                      selected={data.window === option}
                      onClick={() => update('window', option)}
                      helper={option === 'Flexible' ? 'The team can suggest a time later.' : 'Preference only · not reserved'}
                    >
                      {option}
                    </OptionButton>
                  ))}
                </div>
                <FieldLabel optional>Timing note</FieldLabel>
                <textarea
                  value={data.windowNote}
                  onChange={(event) => update('windowNote', event.target.value)}
                  placeholder="Example: Before noon is best."
                  maxLength={180}
                />
                <button type="button" className="primary-button" disabled={!canContinueWindow} onClick={() => setStage('contact')}>
                  Continue
                </button>
              </div>
            ) : null}

            {stage === 'contact' ? (
              <div>
                <p className="section-code">SERVICE CALL SHEET / CONTACT</p>
                <h1>How should we reach you?</h1>
                <p className="lede lede--compact">Contact details are used only to follow up about this request in the demo flow.</p>

                <FieldLabel>Name</FieldLabel>
                <input value={data.name} onChange={(event) => update('name', event.target.value)} placeholder="Jamie Lee" autoComplete="name" />
                <FieldLabel optional>Phone</FieldLabel>
                <input value={data.phone} onChange={(event) => update('phone', event.target.value)} placeholder="(415) 555-0198" inputMode="tel" />
                <FieldLabel optional>Email</FieldLabel>
                <input value={data.email} onChange={(event) => update('email', event.target.value)} placeholder="jamie@example.com" inputMode="email" />

                <FieldLabel>Preferred contact</FieldLabel>
                <div className="contact-methods">
                  {(['Text', 'Email', 'Call'] as const).map((method) => (
                    <button
                      type="button"
                      key={method}
                      className={`chip ${data.contactPreference === method ? 'chip--selected' : ''}`}
                      onClick={() => update('contactPreference', method)}
                    >
                      {method}
                    </button>
                  ))}
                </div>

                <div className="trust-note">
                  <span className="trust-note__mark">✓</span>
                  <span><strong>No hidden collection.</strong> The public demo does not require real personal data.</span>
                </div>

                <button type="button" className="primary-button" disabled={!canContinueContact} onClick={() => setStage('review')}>
                  Review request
                </button>
              </div>
            ) : null}

            {stage === 'review' ? (
              <div>
                <p className="section-code">SERVICE CALL SHEET / REVIEW</p>
                <h1>Review & confirm.</h1>
                <p className="lede lede--compact">Check the call sheet before sending it to the service team.</p>

                <div className="summary-sheet">
                  <SummaryRow label="Issue" value={<><strong>{data.issue}</strong>{data.issueNotes ? <span>{data.issueNotes}</span> : null}</>} onEdit={() => setStage('issue')} />
                  <SummaryRow
                    label="Site Context"
                    value={<><strong>{data.area}</strong><span>{data.photoCount ? `${data.photoCount} demo photo${data.photoCount > 1 ? 's' : ''}` : 'No photos attached'}</span>{data.accessNote ? <span>{data.accessNote}</span> : null}</>}
                    onEdit={() => setStage('site')}
                  />
                  <SummaryRow
                    label="Access Window"
                    value={<><strong>{data.window}</strong><span>Preferred · not reserved</span>{data.windowNote ? <span>{data.windowNote}</span> : null}</>}
                    onEdit={() => setStage('window')}
                  />
                  <SummaryRow
                    label="Contact"
                    value={<><strong>{data.name}</strong><span>{data.contactPreference}: {contactLine}</span></>}
                    onEdit={() => setStage('contact')}
                  />
                </div>

                <div className="truth-block truth-block--compact">
                  <strong>Sending this creates a request, not an appointment.</strong>
                  <span>The service team still needs to confirm scope, availability, and next steps.</span>
                </div>

                <button type="button" className="primary-button" onClick={() => setStage('received')}>
                  Confirm & send request
                </button>
              </div>
            ) : null}

            {stage === 'received' ? (
              <div className="received-screen">
                <motion.div
                  className="handoff-imprint"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 28, delay: 0.08 }}
                >
                  REQUEST RECEIVED
                </motion.div>
                <p className="section-code">HANDOFF MARK / {reference}</p>
                <h1>Your request is with the service team.</h1>
                <p className="lede">
                  <strong>This is not a booking.</strong> The team still needs to confirm availability, scope, and next steps.
                </p>
                <div className="reference-block">
                  <span>REFERENCE</span>
                  <strong>{reference}</strong>
                </div>
                <div className="next-step-list">
                  <div><span>01</span><p><strong>Request received</strong><br />Your structured context is ready for review.</p></div>
                  <div><span>02</span><p><strong>Service team reviews</strong><br />They decide what still needs clarification.</p></div>
                  <div><span>03</span><p><strong>Availability is confirmed later</strong><br />No time has been reserved yet.</p></div>
                </div>
                <button type="button" className="primary-button" onClick={() => setStage('brief')}>
                  View service-ready brief
                </button>
              </div>
            ) : null}

            {stage === 'brief' ? (
              <div>
                <p className="section-code">SERVICE-READY BRIEF / CUSTOMER COPY</p>
                <h1>What the service team receives.</h1>
                <p className="lede lede--compact">A structured handoff — not a diagnosis, quote, or confirmed appointment.</p>

                <div className="brief-card">
                  <div className="brief-card__header"><span>{reference}</span><span>REQUEST RECEIVED</span></div>
                  <SummaryRow label="Request type" value={<strong>{data.issue}</strong>} />
                  <SummaryRow label="Observed symptom" value={data.issueNotes || 'No additional note provided'} />
                  <SummaryRow label="Evidence" value={`${data.photoCount} demo photo${data.photoCount === 1 ? '' : 's'} attached`} />
                  <SummaryRow label="Service context" value={<><strong>{data.area}</strong><span>{data.accessNote || 'No access note provided'}</span></>} />
                  <SummaryRow label="Timing preference" value={<><strong>{data.window}</strong><span>{data.windowNote || 'No timing note provided'}</span><span>Preference only · not reserved</span></>} />
                  <SummaryRow label="Contact preference" value={<><strong>{data.contactPreference}</strong><span>{contactLine}</span></>} />
                </div>

                <div className="still-confirm">
                  <p className="section-code">STILL TO CONFIRM</p>
                  <ul>
                    <li>Exact service scope</li>
                    <li>Provider availability</li>
                    <li>Appointment date or arrival window</li>
                    <li>Price or quote, if applicable</li>
                  </ul>
                </div>

                <button type="button" className="secondary-button" onClick={restart}>
                  Start another demo request
                </button>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </section>

      <footer className="page-footer">
        <span>BLUE CARBON · MARGIN TABS</span>
        <span>Non-emergency demo · Request ≠ booking</span>
      </footer>
    </main>
  )
}

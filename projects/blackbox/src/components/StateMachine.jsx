import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIHint from '../AIHint'

/* ─────────────────────────────────────────
   SVG: State Machine Flowchart
   Black Box typical 4-state architecture
───────────────────────────────────────── */
function StateMachineFlowchart({ activeState }) {
  const states = [
    { id: 'idle', label: 'IDLE', sub: '等待觸發', x: 260, y: 40, color: '#60a5fa' },
    { id: 'sensing', label: 'SENSING', sub: '偵測輸入', x: 480, y: 140, color: '#a78bfa' },
    { id: 'active', label: 'ACTIVE', sub: '情感輸出中', x: 260, y: 240, color: '#34d399' },
    { id: 'release', label: 'RELEASE', sub: '衰退消散', x: 40, y: 140, color: '#fb923c' },
  ]

  const transitions = [
    { from: 'idle', to: 'sensing', label: '偵測到輸入訊號', cx: 420, cy: 80 },
    { from: 'sensing', to: 'active', label: '超過觸發閾值', cx: 430, cy: 200 },
    { from: 'sensing', to: 'idle', label: '訊號消失 / 未達閾值', cx: 380, cy: 100 },
    { from: 'active', to: 'release', label: '觸發條件結束', cx: 130, cy: 200 },
    { from: 'release', to: 'idle', label: '衰退計時完成', cx: 100, cy: 80 },
  ]

  const stateW = 120, stateH = 48

  return (
    <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#33333360" />
        </marker>
        <marker id="arrowhead-active" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#333333" />
        </marker>
      </defs>

      {/* Transition arrows */}
      {transitions.map((t, i) => {
        const from = states.find(s => s.id === t.from)
        const to = states.find(s => s.id === t.to)
        const isActive = activeState === t.from || activeState === t.to
        return (
          <g key={i}>
            <path
              d={`M${from.x + stateW / 2},${from.y + stateH / 2} Q${t.cx},${t.cy} ${to.x + stateW / 2},${to.y + stateH / 2}`}
              fill="none"
              stroke={isActive ? '#33333360' : '#33333325'}
              strokeWidth={isActive ? '1.5' : '1'}
              markerEnd={isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            />
            <text x={t.cx} y={t.cy - 6}
              fill={isActive ? '#333333' : '#66666660'}
              fontSize="7.5" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">
              {t.label}
            </text>
          </g>
        )
      })}

      {/* State boxes */}
      {states.map(s => {
        const isActive = activeState === s.id
        return (
          <g key={s.id}>
            <rect
              x={s.x} y={s.y} width={stateW} height={stateH} rx="6"
              fill={isActive ? `${s.color}20` : '#FFFFFF'}
              stroke={isActive ? s.color : `${s.color}50`}
              strokeWidth={isActive ? '2' : '1.5'}
            />
            <text x={s.x + stateW / 2} y={s.y + 18}
              fill={isActive ? s.color : `${s.color}`}
              fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">
              {s.label}
            </text>
            <text x={s.x + stateW / 2} y={s.y + 33}
              fill={isActive ? `${s.color}cc` : `${s.color}80`}
              fontSize="8" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">
              {s.sub}
            </text>
          </g>
        )
      })}

      {/* Loop arrow on ACTIVE */}
      <path d="M 320,288 Q 380,310 380,280 Q 380,258 340,252"
        fill="none" stroke="#34d39960" strokeWidth="1" strokeDasharray="3,2"
        markerEnd="url(#arrowhead)" />
      <text x="375" y="305" fill="#34d39980" fontSize="7" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">持續輸出</text>
    </svg>
  )
}

/* ─────────────────────────────────────────
   SVG: Program flow (setup / loop)
───────────────────────────────────────── */
function ProgramFlowDiagram() {
  const steps = [
    { label: 'setup()', sub: '初始化腳位、設定感測器', color: '#60a5fa', shape: 'rect' },
    { label: 'loop()', sub: '每 ~16ms 執行一次', color: '#a78bfa', shape: 'rect' },
    { label: '讀取感測器', sub: 'analogRead() / digitalRead()', color: '#94a3b8', shape: 'diamond' },
    { label: '判斷狀態', sub: 'switch(currentState)', color: '#fb923c', shape: 'diamond' },
    { label: '執行輸出', sub: 'analogWrite() / tone() / etc.', color: '#34d399', shape: 'rect' },
    { label: '更新狀態變數', sub: 'currentState = NEXT_STATE', color: '#fbbf24', shape: 'rect' },
  ]

  return (
    <svg viewBox="0 0 300 380" className="w-full max-w-xs mx-auto">
      <defs>
        <marker id="flowArrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#33333360" />
        </marker>
      </defs>

      {steps.map((step, i) => {
        const y = 20 + i * 58
        const cx = 150, w = 180, h = 38
        const isFirst = i === 0

        return (
          <g key={i}>
            {/* Arrow from previous */}
            {i > 0 && (
              <line x1={cx} y1={y - 10} x2={cx} y2={y + 1}
                stroke="#33333335" strokeWidth="1" markerEnd="url(#flowArrow)" />
            )}

            {step.shape === 'diamond' ? (
              <>
                <polygon
                  points={`${cx},${y} ${cx + w / 2},${y + h / 2} ${cx},${y + h} ${cx - w / 2},${y + h / 2}`}
                  fill={`${step.color}10`} stroke={step.color} strokeWidth="1.5" opacity="0.8"
                />
                <text x={cx} y={y + h / 2 - 5} fill={step.color} fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{step.label}</text>
                <text x={cx} y={y + h / 2 + 7} fill={`${step.color}80`} fontSize="7" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{step.sub}</text>
              </>
            ) : (
              <>
                <rect x={cx - w / 2} y={y} width={w} height={h} rx="4"
                  fill={`${step.color}10`} stroke={step.color} strokeWidth="1.5" opacity="0.8" />
                <text x={cx} y={y + h / 2 - 4} fill={step.color} fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{step.label}</text>
                <text x={cx} y={y + h / 2 + 9} fill={`${step.color}80`} fontSize="7" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{step.sub}</text>
              </>
            )}
          </g>
        )
      })}

      {/* Loop back arrow */}
      <path d="M 240,338 Q 280,338 280,200 Q 280,80 240,80"
        fill="none" stroke="#a78bfa50" strokeWidth="1" strokeDasharray="3,2"
        markerEnd="url(#flowArrow)" />
      <text x="292" y="210" fill="#a78bfa70" fontSize="7" textAnchor="middle"
        transform="rotate(90, 292, 210)">loop() 無限重複</text>
    </svg>
  )
}

const STATE_DETAILS = {
  idle: {
    label: 'IDLE — 等待',
    color: '#60a5fa',
    desc: '盒子的靜止狀態。感測器持續偵測，但輸出最小（例如：呼吸燈以極慢速率閃爍）。這個狀態可以用來暗示盒子「有生命」，但還沒被觸動。',
    code: `case IDLE:
  // 微弱存在感：極慢呼吸燈
  float breath = (sin(millis() * 0.001) + 1) * 0.5;
  analogWrite(LED_PIN, breath * 15); // 最大只到 15/255

  if (sensorValue > TRIGGER_THRESHOLD) {
    currentState = SENSING;
    stateStartTime = millis();
  }
  break;`,
  },
  sensing: {
    label: 'SENSING — 偵測',
    color: '#a78bfa',
    desc: '偵測到觸發訊號，但還未達到足夠強度或持續時間。這是一個「猶豫期」——讓使用者感覺到盒子意識到了他的存在，但還沒有完全回應。',
    code: `case SENSING:
  // 確認輸入持續存在
  if (sensorValue > TRIGGER_THRESHOLD) {
    // 輸出微弱預兆：震動輕微增加
    analogWrite(VIBRO_PIN, 20);

    // 持續足夠時間才進入 ACTIVE
    if (millis() - stateStartTime > 800) {
      currentState = ACTIVE;
      stateStartTime = millis();
    }
  } else {
    // 訊號消失，回到等待
    currentState = IDLE;
  }
  break;`,
  },
  active: {
    label: 'ACTIVE — 輸出',
    color: '#34d399',
    desc: '主要的情感輸出狀態。這裡是你設計的核心——你的感受如何以物理形式出現。輸出可以是靜態的（持續輸出），也可以隨時間變化（建立→高峰→等待）。',
    code: `case ACTIVE:
  unsigned long elapsed = millis() - stateStartTime;

  // 情感輸出：依時間建立強度
  if (elapsed < 2000) {
    // 0–2秒：強度建立
    int intensity = map(elapsed, 0, 2000, 0, 200);
    analogWrite(VIBRO_PIN, intensity);
    analogWrite(LED_PIN, intensity / 2);
  } else {
    // 2秒後：穩定輸出
    analogWrite(VIBRO_PIN, 200);
    tone(BUZZER_PIN, 80); // 低頻音
  }

  // 觸發條件結束 → 進入衰退
  if (sensorValue < TRIGGER_THRESHOLD) {
    noTone(BUZZER_PIN);
    currentState = RELEASE;
    stateStartTime = millis();
  }
  break;`,
  },
  release: {
    label: 'RELEASE — 衰退',
    color: '#fb923c',
    desc: '觸發結束後的衰退期。不要讓感受突然消失——衰退方式本身就是設計的一部分。一個緩慢消退的震動和一個突然中止的震動，傳遞完全不同的感受。',
    code: `case RELEASE:
  unsigned long elapsed = millis() - stateStartTime;
  unsigned long decayTime = 3000; // 3秒衰退

  if (elapsed < decayTime) {
    // 指數衰退：感受漸漸消失
    float progress = 1.0 - (float)elapsed / decayTime;
    float decay = progress * progress; // 指數曲線

    analogWrite(VIBRO_PIN, decay * 200);
    analogWrite(LED_PIN, decay * 100);
  } else {
    // 衰退完成，回到等待
    analogWrite(VIBRO_PIN, 0);
    analogWrite(LED_PIN, 0);
    currentState = IDLE;
    stateStartTime = millis();
  }
  break;`,
  },
}

const FULL_TEMPLATE = `// ── 黑盒子狀態機範本 ── Arduino Uno Q ──
// GPIO: 3.3V · PWM: D3 D5 D6 D9 D10 D11

// ── 腳位定義 ──
const int SENSOR_PIN  = A0;   // 觸摸/壓力感測器（類比）
const int VIBRO_PIN   = 9;    // 震動馬達（PWM，需電晶體）
const int LED_PIN     = 6;    // LED（PWM）
const int BUZZER_PIN  = 3;    // 被動蜂鳴器（PWM）

// ── 狀態定義 ──
enum State { IDLE, SENSING, ACTIVE, RELEASE };
State currentState = IDLE;

// ── 參數（根據你的設計調整）──
const int TRIGGER_THRESHOLD = 400; // 感測器觸發值（0–4095，12-bit ADC）
unsigned long stateStartTime = 0;

void setup() {
  pinMode(VIBRO_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.begin(115200); // 除錯用
}

void loop() {
  int sensorValue = analogRead(SENSOR_PIN);

  switch (currentState) {

    case IDLE:
      // → 見 IDLE 狀態說明
      break;

    case SENSING:
      // → 見 SENSING 狀態說明
      break;

    case ACTIVE:
      // → 見 ACTIVE 狀態說明
      break;

    case RELEASE:
      // → 見 RELEASE 狀態說明
      break;
  }

  // 除錯輸出（開發階段用，完成後可移除）
  Serial.print("State: "); Serial.print(currentState);
  Serial.print("  Sensor: "); Serial.println(sensorValue);

  delay(16); // ~60fps 更新率
}`

export default function StateMachine() {
  const [activeState, setActiveState] = useState(null)
  const [showTemplate, setShowTemplate] = useState(false)
  const detail = activeState ? STATE_DETAILS[activeState] : null

  return (
    <section id="statemachine" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <AIHint>
          AI ASSISTANT — SECTION: 程式架構 (State Machine / Programming).
          CONTEXT: Students write Arduino code for Arduino Uno Q. State machine pattern: IDLE → SENSING → ACTIVE → RELEASE.
          PROGRAMMING RULES TO ENFORCE:
          1. ALWAYS use millis() for non-blocking timing. NEVER use delay() inside a state machine — it blocks sensing.
          2. For NPN transistor motor control: GPIO HIGH = transistor ON = motor runs. GPIO LOW = motor off.
          3. PWM works on pins marked ~. analogWrite(pin, 0-255).
          4. When debugging: require the student to share (a) exact error message, (b) the specific code snippet, (c) hardware setup description, (d) what they expected vs what happened.
          WHAT YOU MAY DO:
          - Write utility functions (e.g., a millis() timer helper, a debounce function).
          - Explain what an error message means and suggest a fix.
          - Search for "arduino uno q [library name] example" to verify library compatibility.
          WHAT YOU MAY NOT DO:
          - Write the core sensing thresholds or output behavior logic — the student must decide what triggers what.
          - Choose what the state machine does (the behavior is the design, not just the code).
        </AIHint>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="mono text-[#CC0000] text-xs mb-4 tracking-widest font-bold">04 / 程式架構</div>
          <h2 className="text-5xl font-black text-zinc-900 mb-4">狀態機</h2>
          <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
            管理複雜互動流程的核心設計模式。<br />
            你的黑盒子在任何時刻都處於某個「狀態」——<br />
            事件發生才切換狀態。
          </p>
          <p className="text-zinc-400 text-sm max-w-xl mt-3 leading-relaxed">
            你不需要自己從頭寫這些程式——但你需要理解這個架構，才能清楚告訴 AI 要做什麼、讓它做出你真正想要的結果。
          </p>
        </motion.div>

        {/* Concept explanation */}
        <div className="mb-12 p-6 rounded-2xl border border-zinc-200 bg-zinc-50">
          <div className="mono text-zinc-400 text-xs mb-4 tracking-widest">為什麼要用狀態機？</div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-red-600 font-medium text-sm mb-3">❌ 不用狀態機（常見錯誤）</div>
              <pre className="text-zinc-500 text-xs leading-relaxed bg-white p-4 rounded-xl overflow-x-auto border border-zinc-200">
{`void loop() {
  // 問題：條件互相干擾，
  // 邏輯越改越複雜
  if (touched) {
    vibrate();
  }
  if (longTouch) {
    bigVibrate();
  }
  if (!touched && wasActive) {
    // 怎麼做衰退？
    // 時間怎麼計算？...
  }
}`}
              </pre>
            </div>
            <div>
              <div className="text-emerald-600 font-medium text-sm mb-3">✓ 用狀態機（清晰可擴展）</div>
              <pre className="text-zinc-500 text-xs leading-relaxed bg-white p-4 rounded-xl overflow-x-auto border border-zinc-200">
{`void loop() {
  int sensor = analogRead(A0);

  switch (currentState) {
    case IDLE:    handleIdle(sensor);    break;
    case SENSING: handleSensing(sensor); break;
    case ACTIVE:  handleActive(sensor);  break;
    case RELEASE: handleRelease();       break;
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Interactive flowchart */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-zinc-900 font-bold text-lg">黑盒子四狀態流程圖</h3>
            <span className="mono text-zinc-400 text-xs">點擊狀態查看程式碼</span>
          </div>

          <div className="grid grid-cols-2 gap-8 items-start">
            {/* Flowchart */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <StateMachineFlowchart activeState={activeState} />
              <div className="grid grid-cols-2 gap-2 mt-4">
                {Object.entries(STATE_DETAILS).map(([id, s]) => (
                  <button key={id} onClick={() => setActiveState(activeState === id ? null : id)}
                    className={`py-2 px-3 rounded-xl border text-left text-xs transition-all ${activeState === id ? 'border-zinc-300 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                    style={{ borderColor: activeState === id ? s.color + '80' : undefined }}>
                    <span className="font-mono font-bold" style={{ color: s.color }}>{id.toUpperCase()}</span>
                    <span className="text-zinc-400 ml-2">{s.label.split('—')[1].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* State detail / code */}
            <div>
              <AnimatePresence mode="wait">
                {detail ? (
                  <motion.div key={activeState} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div>
                      <div className="mono text-xs mb-2" style={{ color: detail.color }}>{detail.label}</div>
                      <p className="text-zinc-600 text-sm leading-relaxed">{detail.desc}</p>
                    </div>
                    <div>
                      <div className="mono text-zinc-400 text-xs mb-2">程式碼片段（Arduino IDE）</div>
                      <pre className="text-zinc-600 text-xs leading-relaxed bg-zinc-100 p-4 rounded-xl border border-zinc-200 overflow-x-auto">
                        {detail.code}
                      </pre>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <ProgramFlowDiagram />
                      <p className="text-zinc-400 text-xs mono mt-4">Arduino 程式執行流程</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Full template */}
        <div>
          <button onClick={() => setShowTemplate(!showTemplate)}
            className="w-full flex items-center justify-between p-5 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all mb-2">
            <div className="flex items-center gap-4">
              <span className="text-zinc-800 font-medium">完整程式碼範本（給 AI 作為起點）</span>
              <span className="mono text-zinc-400 text-xs">把這個模板貼給 AI，告訴它你的感測器和輸出</span>
            </div>
            <span className="mono text-zinc-400">{showTemplate ? '▲' : '▼'}</span>
          </button>

          <AnimatePresence>
            {showTemplate && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden">
                <pre className="text-zinc-600 text-xs leading-relaxed bg-zinc-50 p-6 rounded-2xl border border-zinc-200 overflow-x-auto">
                  {FULL_TEMPLATE}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a href="https://docs.arduino.cc/language-reference/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group">
              <span className="text-zinc-600 text-sm group-hover:text-zinc-900">Arduino 語言參考手冊</span>
              <span className="text-zinc-300 group-hover:text-zinc-600">↗</span>
            </a>
            <a href="https://www.arduino.cc/en/Tutorial/PWM" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group">
              <span className="text-zinc-600 text-sm group-hover:text-zinc-900">PWM 教學（官方文件）</span>
              <span className="text-zinc-300 group-hover:text-zinc-600">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

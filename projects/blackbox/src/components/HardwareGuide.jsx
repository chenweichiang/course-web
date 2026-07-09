import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIHint from '../AIHint'

/* ─────────────────────────────────────────
   SVG: Arduino Uno Q Board (top-down view)
   Source: docs.arduino.cc/hardware/uno-q/
   GPIO: 3.3V (MCU = STM32U585 @ 160MHz)
───────────────────────────────────────── */
function UnoQBoard() {
  const pwmPins = [3, 5, 6, 9, 10, 11]
  const digitalPins = [
    { n: 0, sub: 'RX' }, { n: 1, sub: 'TX' }, { n: 2, sub: 'INT' },
    { n: 3, sub: '~INT' }, { n: 4, sub: '' }, { n: 5, sub: '~' },
    { n: 6, sub: '~' }, { n: 7, sub: '' }, { n: 8, sub: '' },
    { n: 9, sub: '~' }, { n: 10, sub: '~ SS' },
    { n: 11, sub: '~ MOSI' }, { n: 12, sub: 'MISO' }, { n: 13, sub: 'SCK LED' },
  ]
  const analogPins = [
    { label: 'A0' }, { label: 'A1' }, { label: 'A2' },
    { label: 'A3' }, { label: 'A4', sub: 'SDA' }, { label: 'A5', sub: 'SCL' },
  ]
  const powerPins = ['IOREF', 'RESET', '3.3V', '5V', 'GND', 'GND', 'VIN']

  const pinSpacing = 22
  const boardLeft = 60, boardTop = 20, boardW = 580, boardH = 340

  return (
    <svg viewBox="0 0 700 380" className="w-full max-w-3xl mx-auto">
      {/* Board body */}
      <rect x={boardLeft} y={boardTop} width={boardW} height={boardH}
        rx="10" fill="#EBF5EE" stroke="#4A8A5A" strokeWidth="1.5" />

      {/* ── LED Matrix (8×13, distinctive Uno Q feature) ── */}
      <rect x={boardLeft + 140} y={boardTop + 18} width={180} height={70}
        rx="4" fill="#DCF0E2" stroke="#5A9A6A" strokeWidth="1" />
      <text x={boardLeft + 230} y={boardTop + 12} fill="#4A8A5A" fontSize="7" textAnchor="middle" fontFamily="monospace">8×13 LED Matrix</text>
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 13 }, (_, col) => (
          <circle key={`${row}-${col}`}
            cx={boardLeft + 152 + col * 13}
            cy={boardTop + 30 + row * 7}
            r="2.5"
            fill={(row + col) % 7 === 0 ? '#22c55e' : '#C0DCC8'}
            opacity={(row + col) % 7 === 0 ? 0.8 : 1}
          />
        ))
      )}

      {/* WiFi/BT antenna hint */}
      <rect x={boardLeft + boardW - 100} y={boardTop + 18} width={90} height={45}
        rx="3" fill="#E8F4EC" stroke="#5A9A6A" strokeWidth="1" />
      <text x={boardLeft + boardW - 55} y={boardTop + 36} fill="#4A7A5A" fontSize="7" textAnchor="middle" fontFamily="monospace">WiFi 5</text>
      <text x={boardLeft + boardW - 55} y={boardTop + 48} fill="#4A7A5A" fontSize="7" textAnchor="middle" fontFamily="monospace">BT 5.1</text>

      {/* RGB LEDs */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx={boardLeft + 350 + i * 18} cy={boardTop + 100}
          r="6" fill={['#ef444430','#22c55e30','#3b82f630','#f59e0b30'][i]}
          stroke={['#ef4444','#22c55e','#3b82f6','#f59e0b'][i]}
          strokeWidth="1" />
      ))}
      <text x={boardLeft + 386} y={boardTop + 116} fill="#3A7A5A" fontSize="7" textAnchor="middle" fontFamily="monospace">4× RGB LED</text>

      {/* MCU chip */}
      <rect x={boardLeft + 170} y={boardTop + 110} width={110} height={80}
        rx="4" fill="#F0F0F0" stroke="#AAAAAA" strokeWidth="1.5" />
      <text x={boardLeft + 225} y={boardTop + 145} fill="#444444" fontSize="9" textAnchor="middle" fontFamily="monospace">STM32U585</text>
      <text x={boardLeft + 225} y={boardTop + 158} fill="#666666" fontSize="7" textAnchor="middle" fontFamily="monospace">Cortex-M33 @ 160MHz</text>
      <text x={boardLeft + 225} y={boardTop + 170} fill="#666666" fontSize="7" textAnchor="middle" fontFamily="monospace">2MB Flash / 786KB RAM</text>

      {/* MPU chip */}
      <rect x={boardLeft + 310} y={boardTop + 140} width={120} height={60}
        rx="4" fill="#F0F0F0" stroke="#AAAAAA" strokeWidth="1.5" />
      <text x={boardLeft + 370} y={boardTop + 167} fill="#555566" fontSize="8" textAnchor="middle" fontFamily="monospace">QRB2210</text>
      <text x={boardLeft + 370} y={boardTop + 180} fill="#555566" fontSize="7" textAnchor="middle" fontFamily="monospace">Cortex-A53 @ 2GHz</text>

      {/* USB-C connector */}
      <rect x={boardLeft - 14} y={boardTop + 55} width={18} height={26}
        rx="4" fill="#AAAAAA" stroke="#999999" strokeWidth="1" />
      <text x={boardLeft - 5} y={boardTop + 95} fill="#888888" fontSize="7" textAnchor="middle">USB-C</text>

      {/* Qwiic connector */}
      <rect x={boardLeft - 10} y={boardTop + boardH - 60} width={14} height={14}
        rx="2" fill="#FEF3C7" stroke="#f59e0b" strokeWidth="1" />
      <text x={boardLeft + 8} y={boardTop + boardH - 42} fill="#B45309" fontSize="6.5" textAnchor="start">Qwiic</text>

      {/* ── Left column: Digital pins D0–D13 ── */}
      {digitalPins.map((pin, i) => {
        const y = boardTop + 38 + i * pinSpacing
        const isPwm = pwmPins.includes(pin.n)
        const color = pin.n === 13 ? '#fbbf24' : isPwm ? '#34d399' : '#60a5fa'
        return (
          <g key={pin.n}>
            <line x1={boardLeft} y1={y} x2={boardLeft + 20} y2={y}
              stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
            <circle cx={boardLeft} cy={y} r="5"
              fill="#EBF5EE" stroke={color} strokeWidth="1.5" />
            <text x={boardLeft - 8} y={y + 4}
              fill={color} fontSize="9.5" textAnchor="end" fontFamily="monospace">
              D{pin.n}
            </text>
            {pin.sub && (
              <text x={boardLeft - 8} y={y + 14}
                fill={color} fontSize="6.5" textAnchor="end" fontFamily="monospace" opacity="0.55">
                {pin.sub}
              </text>
            )}
          </g>
        )
      })}

      {/* ── Right column: Power pins ── */}
      {powerPins.map((label, i) => {
        const y = boardTop + 38 + i * pinSpacing
        const colors = { 'IOREF': '#6b7280', 'RESET': '#ef4444', '3.3V': '#f97316', '5V': '#dc2626', 'GND': '#374151', 'VIN': '#dc2626' }
        const color = colors[label] || '#6b7280'
        return (
          <g key={label + i}>
            <line x1={boardLeft + boardW - 20} y1={y} x2={boardLeft + boardW} y2={y}
              stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
            <circle cx={boardLeft + boardW} cy={y} r="5"
              fill="#EBF5EE" stroke={color} strokeWidth="1.5" />
            <text x={boardLeft + boardW + 8} y={y + 4}
              fill={color} fontSize="9.5" textAnchor="start" fontFamily="monospace">{label}</text>
          </g>
        )
      })}

      {/* Separator */}
      <line x1={boardLeft + boardW + 2} y1={boardTop + 38 + 7 * pinSpacing - 4}
        x2={boardLeft + boardW + 50} y2={boardTop + 38 + 7 * pinSpacing - 4}
        stroke="#4A8A5A" strokeWidth="0.5" />

      {/* ── Right column: Analog pins A0–A5 ── */}
      {analogPins.map((pin, i) => {
        const y = boardTop + 38 + (7 + i) * pinSpacing + 10
        const color = pin.sub ? '#a78bfa' : '#fb923c'
        return (
          <g key={pin.label}>
            <line x1={boardLeft + boardW - 20} y1={y} x2={boardLeft + boardW} y2={y}
              stroke={color} strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
            <circle cx={boardLeft + boardW} cy={y} r="5"
              fill="#EBF5EE" stroke={color} strokeWidth="1.5" />
            <text x={boardLeft + boardW + 8} y={y + 4}
              fill={color} fontSize="9.5" textAnchor="start" fontFamily="monospace">{pin.label}</text>
            {pin.sub && (
              <text x={boardLeft + boardW + 8} y={y + 14}
                fill={color} fontSize="6.5" textAnchor="start" fontFamily="monospace" opacity="0.55">{pin.sub}</text>
            )}
          </g>
        )
      })}

      {/* ── 3.3V GPIO warning banner ── */}
      <rect x={boardLeft + 60} y={boardTop + boardH - 36} width={320} height={28}
        rx="4" fill="#FEF9C3" stroke="#b45309" strokeWidth="1" />
      <text x={boardLeft + 220} y={boardTop + boardH - 22} fill="#92400E"
        fontSize="9" textAnchor="middle" fontFamily="monospace">
        ⚠ GPIO 邏輯電壓：3.3V（非傳統 Uno 的 5V）
      </text>
      <text x={boardLeft + 220} y={boardTop + boardH - 11} fill="#B45309"
        fontSize="7.5" textAnchor="middle">
        接 5V 感測器前務必確認電壓相容性
      </text>

      {/* Legend */}
      <g transform={`translate(${boardLeft + 450}, ${boardTop + boardH - 36})`}>
        {[
          { color: '#34d399', label: 'PWM (~)' },
          { color: '#60a5fa', label: 'Digital I/O' },
          { color: '#fb923c', label: 'Analog In' },
          { color: '#a78bfa', label: 'I²C' },
        ].map((item, i) => (
          <g key={i} transform={`translate(0, ${i * 12})`}>
            <circle cx="0" cy="0" r="3.5" fill={item.color} opacity="0.8" />
            <text x="7" y="4" fill="#555555" fontSize="7.5">{item.label}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ─────────────────────────────────────────
   SVG: Raspberry Pi 5 GPIO (40-pin, 3.3V)
   Source: raspberrypi.com/documentation
───────────────────────────────────────── */
function RpiBoard() {
  const rows = [
    [{ l: '3.3V', c: '#f97316' }, { l: '5V', c: '#dc2626' }],
    [{ l: 'GPIO2 SDA', c: '#a78bfa' }, { l: '5V', c: '#dc2626' }],
    [{ l: 'GPIO3 SCL', c: '#a78bfa' }, { l: 'GND', c: '#374151' }],
    [{ l: 'GPIO4', c: '#60a5fa' }, { l: 'GPIO14 TX', c: '#94a3b8' }],
    [{ l: 'GND', c: '#374151' }, { l: 'GPIO15 RX', c: '#94a3b8' }],
    [{ l: 'GPIO17', c: '#60a5fa' }, { l: 'GPIO18 PWM', c: '#34d399' }],
    [{ l: 'GPIO27', c: '#60a5fa' }, { l: 'GND', c: '#374151' }],
    [{ l: 'GPIO22', c: '#60a5fa' }, { l: 'GPIO23', c: '#60a5fa' }],
    [{ l: '3.3V', c: '#f97316' }, { l: 'GPIO24', c: '#60a5fa' }],
    [{ l: 'GPIO10 MOSI', c: '#fb923c' }, { l: 'GND', c: '#374151' }],
  ]
  return (
    <svg viewBox="0 0 460 310" className="w-full max-w-lg mx-auto">
      <rect x="60" y="10" width="280" height="270" rx="6" fill="#EBF5EE" stroke="#4A8A6A" strokeWidth="1.5" />
      <text x="200" y="24" fill="#3A7A5A" fontSize="8" textAnchor="middle" fontFamily="monospace">Raspberry Pi 5 — 40-pin GPIO Header</text>
      {/* USB/HDMI ports schematic */}
      {[40, 64, 88].map(y => (
        <rect key={y} x="340" y={y} width="20" height="18" rx="2" fill="#CCCCCC" stroke="#AAAAAA" strokeWidth="0.5" />
      ))}
      <text x="370" y="95" fill="#777777" fontSize="7" fontFamily="monospace">USB/HDMI</text>
      {rows.map(([left, right], i) => {
        const y = 40 + i * 22
        return (
          <g key={i}>
            <circle cx="115" cy={y} r="5" fill="#EBF5EE" stroke={left.c} strokeWidth="1.5" />
            <text x="107" y={y + 4} fill={left.c} fontSize="7.5" textAnchor="end" fontFamily="monospace">{left.l}</text>
            <circle cx="285" cy={y} r="5" fill="#EBF5EE" stroke={right.c} strokeWidth="1.5" />
            <text x="293" y={y + 4} fill={right.c} fontSize="7.5" textAnchor="start" fontFamily="monospace">{right.l}</text>
            <text x="153" y={y + 4} fill="#888888" fontSize="6.5" textAnchor="end">{i * 2 + 1}</text>
            <text x="247" y={y + 4} fill="#888888" fontSize="6.5" textAnchor="start">{i * 2 + 2}</text>
          </g>
        )
      })}
      <text x="73" y="265" fill="#92400E" fontSize="7" fontFamily="monospace">⚠ 3.3V GPIO · 16mA/pin · 50mA 總預算 · 無內建 ADC</text>
      {/* RP1 chip */}
      <rect x="160" y="180" width="80" height="50" rx="3" fill="#F0F0F0" stroke="#1c3a24" strokeWidth="1" />
      <text x="200" y="202" fill="#444444" fontSize="7.5" textAnchor="middle" fontFamily="monospace">BCM2712</text>
      <text x="200" y="215" fill="#666666" fontSize="6.5" textAnchor="middle" fontFamily="monospace">Cortex-A76 @ 2.4GHz</text>
      <text x="200" y="226" fill="#666666" fontSize="6.5" textAnchor="middle" fontFamily="monospace">+ RP1 Southbridge</text>
    </svg>
  )
}

/* ─────────────────────────────────────────
   SVG: Dual-brain architecture of Uno Q
───────────────────────────────────────── */
function DualBrainDiagram() {
  return (
    <svg viewBox="0 0 520 200" className="w-full max-w-2xl mx-auto">
      {/* MCU box */}
      <rect x="20" y="30" width="180" height="120" rx="8" fill="#EBF5EE" stroke="#34d399" strokeWidth="1.5" />
      <text x="110" y="55" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace">MCU (STM32U585)</text>
      <text x="110" y="72" fill="#3A8A5A" fontSize="8" textAnchor="middle" fontFamily="monospace">Cortex-M33 · 160MHz</text>
      <text x="110" y="88" fill="#3A8A5A" fontSize="8" textAnchor="middle" fontFamily="monospace">2MB Flash / 786KB RAM</text>
      <rect x="30" y="100" width="160" height="38" rx="4" fill="#DCF0E5" stroke="#6ABD8A" strokeWidth="1" />
      <text x="110" y="116" fill="#22c55e" fontSize="8" textAnchor="middle">Arduino IDE (C/C++)</text>
      <text x="110" y="130" fill="#4A9A6A" fontSize="7" textAnchor="middle">GPIO · PWM · ADC · I²C · SPI</text>

      {/* MPU box */}
      <rect x="320" y="30" width="180" height="120" rx="8" fill="#EBF0F8" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="410" y="55" fill="#60a5fa" fontSize="10" textAnchor="middle" fontFamily="monospace">MPU (QRB2210)</text>
      <text x="410" y="72" fill="#3A5A9A" fontSize="8" textAnchor="middle" fontFamily="monospace">Cortex-A53 · 2GHz · 4-core</text>
      <text x="410" y="88" fill="#3A5A9A" fontSize="8" textAnchor="middle" fontFamily="monospace">2GB/4GB RAM · 16/32GB eMMC</text>
      <rect x="330" y="100" width="160" height="38" rx="4" fill="#DCE8F8" stroke="#6A90CA" strokeWidth="1" />
      <text x="410" y="116" fill="#3b82f6" fontSize="8" textAnchor="middle">Debian Linux · App Lab</text>
      <text x="410" y="130" fill="#5A80C6" fontSize="7" textAnchor="middle">Python · WiFi · AI · Camera</text>

      {/* Bridge arrow */}
      <path d="M200,90 L320,90" stroke="#33333340" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr)" />
      <path d="M320,90 L200,90" stroke="#33333340" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr2)" />
      <rect x="224" y="78" width="72" height="24" rx="4" fill="#F0F0F5" stroke="#CCCCCC" strokeWidth="1" />
      <text x="260" y="88" fill="#666666" fontSize="7" textAnchor="middle" fontFamily="monospace">Router</text>
      <text x="260" y="98" fill="#666666" fontSize="7" textAnchor="middle" fontFamily="monospace">Bridge RPC</text>

      {/* This course label */}
      <rect x="20" y="168" width="180" height="22" rx="4" fill="#EBF5EE" stroke="#A0DDB8" strokeWidth="1" />
      <text x="110" y="183" fill="#2A9A5A" fontSize="8" textAnchor="middle">← 本課程主要使用這側</text>
      <rect x="320" y="168" width="180" height="22" rx="4" fill="#EBF0F8" stroke="#B0C8F0" strokeWidth="1" />
      <text x="410" y="183" fill="#6090D0" fontSize="8" textAnchor="middle">選修：WiFi/AI 整合</text>

      {/* Arrow defs */}
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#33333360" />
        </marker>
        <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M6,0 L0,3 L6,6 Z" fill="#33333360" />
        </marker>
      </defs>
    </svg>
  )
}

/* ─────────────────────────────────────────
   Wiring diagram SVGs
───────────────────────────────────────── */
function WiringVibration() {
  return (
    <svg viewBox="0 0 360 200" className="w-full">
      {/* Board */}
      <rect x="10" y="30" width="80" height="120" rx="4" fill="#EBF5EE" stroke="#4A8A5A" strokeWidth="1.5" />
      <text x="50" y="50" fill="#3A8A50" fontSize="8" textAnchor="middle" fontFamily="monospace">Uno Q</text>
      {[['D9 ~', '#34d399', 75], ['GND', '#374151', 97], ['3.3V', '#f97316', 119]].map(([l, c, y]) => (
        <g key={l}>
          <circle cx="90" cy={y} r="4" fill="#EBF5EE" stroke={c} strokeWidth="1.5" />
          <text x="78" y={y + 4} fill={c} fontSize="7.5" textAnchor="end" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {/* NPN transistor */}
      <rect x="155" y="78" width="26" height="34" rx="3" fill="#F0F0F0" stroke="#fb923c" strokeWidth="1.5" />
      <text x="168" y="92" fill="#fb923c" fontSize="6.5" textAnchor="middle">NPN</text>
      <text x="168" y="103" fill="#fb923c" fontSize="6.5" textAnchor="middle">2N2222</text>
      {/* Flyback diode */}
      <line x1="215" y1="68" x2="280" y2="68" stroke="#fbbf24" strokeWidth="1" />
      <polygon points="222,63 232,68 222,73" fill="#fbbf24" />
      <text x="248" y="62" fill="#fbbf24" fontSize="6.5" textAnchor="middle">1N4007</text>
      {/* Motor */}
      <ellipse cx="255" cy="95" rx="28" ry="18" fill="#EBF0F8" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="255" y="91" fill="#60a5fa" fontSize="7" textAnchor="middle">振動</text>
      <text x="255" y="102" fill="#60a5fa" fontSize="7" textAnchor="middle">馬達</text>
      {/* Wires */}
      <path d="M90,75 L148,75 L155,88" stroke="#34d399" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <path d="M90,97 L148,97 L155,104" stroke="#6b7280" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <path d="M90,119 L128,119 L128,68 L215,68" stroke="#f97316" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <path d="M181,83 L227,83" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
      <path d="M227,107 L181,107" stroke="#6b7280" strokeWidth="1.5" fill="none" />
      <text x="10" y="190" fill="#92400E" fontSize="7">⚠ 馬達電流大，必須透過電晶體，不可直接接 GPIO（3.3V · 限 8mA/pin）</text>
    </svg>
  )
}

function WiringLED() {
  return (
    <svg viewBox="0 0 320 170" className="w-full">
      <rect x="10" y="25" width="80" height="100" rx="4" fill="#EBF5EE" stroke="#4A8A5A" strokeWidth="1.5" />
      <text x="50" y="44" fill="#3A8A50" fontSize="8" textAnchor="middle" fontFamily="monospace">Uno Q</text>
      {[['D6 ~', '#34d399', 68], ['GND', '#374151', 90]].map(([l, c, y]) => (
        <g key={l}>
          <circle cx="90" cy={y} r="4" fill="#EBF5EE" stroke={c} strokeWidth="1.5" />
          <text x="78" y={y + 4} fill={c} fontSize="7.5" textAnchor="end" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {/* Resistor */}
      <rect x="132" y="62" width="30" height="12" rx="2" fill="#F0F0F0" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="147" y="55" fill="#fbbf24" fontSize="7" textAnchor="middle">470Ω</text>
      {/* LED */}
      <polygon points="185,60 205,72 185,84" fill="#EBF0F8" stroke="#60a5fa" strokeWidth="1.5" />
      <line x1="205" y1="60" x2="205" y2="84" stroke="#60a5fa" strokeWidth="2" />
      <text x="195" y="100" fill="#60a5fa" fontSize="7.5" textAnchor="middle">LED</text>
      {/* Wires */}
      <path d="M90,68 L132,68" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4,2" />
      <path d="M162,68 L185,72" stroke="#34d399" strokeWidth="1.5" />
      <path d="M205,72 L240,72 L240,90 L90,90" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4,2" />
      {/* Note: R4 note */}
      <text x="10" y="150" fill="#92400E" fontSize="7">GPIO 3.3V · 8mA/pin → 建議 470Ω（R3 Uno 可用 220Ω，但 Uno Q 電流更小）</text>
    </svg>
  )
}

/* ─────────────────────────────────────────
   Component catalogue (Uno Q specific)
───────────────────────────────────────── */
const COMPONENTS = [
  {
    name: '震動馬達（Coin ERM Motor）',
    category: '輸出', color: '#60a5fa',
    voltage: '3V / 5V',
    pin: 'D3 / D9 / D10（PWM ~）',
    compatible: true,
    note: '需要 NPN 電晶體（2N2222）或 N-channel MOSFET 驅動。Uno Q GPIO 限 8mA，馬達電流遠超此值。',
    rpiNote: '同樣需要電晶體驅動。RPi.GPIO 或 gpiozero MotorRobot。',
    wiring: 'vibration',
  },
  {
    name: 'LED / WS2812B 燈條',
    category: '輸出', color: '#fbbf24',
    voltage: '3.3V 邏輯（5V 電源）',
    pin: 'D6（PWM 調光） / D6（WS2812B 資料線）',
    compatible: true,
    note: 'Uno Q GPIO 限 8mA，一般 LED 需接 470Ω 限流電阻（比傳統 Uno 的 220Ω 阻值更大）。WS2812B 5V 燈條的資料線邏輯電壓 ≥ 0.7×VDD，可能需要 3.3V→5V 電位轉換器。',
    rpiNote: 'Python 使用 rpi_ws281x 函式庫，需要 root 權限。',
    wiring: 'led',
  },
  {
    name: '被動蜂鳴器（Passive Buzzer）',
    category: '輸出', color: '#34d399',
    voltage: '3.3V–5V',
    pin: 'D3 / D5 / D6（PWM，用 tone() 函式）',
    compatible: true,
    note: '被動式需要 PWM 方波驅動，頻率決定音調。Uno Q 3.3V 訊號足以驅動被動蜂鳴器。主動式只需 HIGH/LOW 訊號。',
    rpiNote: 'Python 使用 GPIO.PWM() 或 pigpio 函式庫。',
    wiring: null,
  },
  {
    name: '電容觸摸感測器（TTP223）',
    category: '輸入', color: '#a78bfa',
    voltage: '2.5V–5.5V',
    pin: '任意 digitalRead() 腳位',
    compatible: true,
    note: 'TTP223 工作電壓 2.5–5.5V，與 Uno Q 3.3V 完全相容。觸摸 = HIGH，離開 = LOW。適合作為「隱藏」觸發介面。',
    rpiNote: '同樣接 GPIO 數位腳位，gpiozero Button 類別可用。',
    wiring: null,
  },
  {
    name: '超音波測距（HC-SR04）',
    category: '輸入', color: '#fb923c',
    voltage: '5V（VCC）⚠',
    pin: 'Trig: D12 / Echo: D11',
    compatible: false,
    note: '⚠ HC-SR04 的 ECHO 腳位輸出 5V 訊號，Uno Q GPIO 為 3.3V！直接連接可能損壞主板。必須使用電壓分壓電路（10kΩ + 20kΩ）將 Echo 降至 3.3V，或改用 3.3V 版本感測器（如 VL53L0X ToF）。',
    rpiNote: '⚠ RPi GPIO 同樣只接受 3.3V，需要相同的電壓分壓電路。',
    wiring: null,
  },
  {
    name: '伺服馬達（SG90）',
    category: '輸出', color: '#f472b6',
    voltage: '4.8V–6V（獨立電源）',
    pin: 'D9 / D10（PWM ~）',
    compatible: true,
    note: 'SG90 訊號線接受 3.3V 邏輯，與 Uno Q 相容。電源務必使用獨立 5V（不要從板子的 5V 腳取，容易造成電壓不穩）。使用 Servo.h 函式庫。',
    rpiNote: 'gpiozero Servo() 或 pigpio servoBlaster。需獨立電源。',
    wiring: null,
  },
]

const SPECS = {
  unoq: {
    rows: [
      ['微控制器（MCU）', 'STMicroelectronics STM32U585（Arm® Cortex®-M33）'],
      ['微處理器（MPU）', 'Qualcomm Dragonwing™ QRB2210（Cortex®-A53 × 4 @ 2.0GHz）'],
      ['MCU 時脈', '160 MHz'],
      ['MCU Flash', '2 MB'],
      ['MCU RAM', '786 KB'],
      ['MPU RAM / 儲存', '2GB or 4GB LPDDR4X · 16GB or 32GB eMMC'],
      ['GPIO 邏輯電壓', '⚠ 3.3V（非傳統 Uno 的 5V）'],
      ['數位 I/O', '14 pins（含 6 個 PWM：D3 D5 D6 D9 D10 D11）'],
      ['類比輸入', '6 個（12-bit ADC）'],
      ['每腳最大電流', '8 mA'],
      ['無線連接', 'Wi-Fi® 5（2.4/5GHz）+ Bluetooth® 5.1'],
      ['特殊介面', 'Qwiic I2C · MIPI CSI/DSI · 8×13 LED 矩陣'],
      ['USB 接頭', 'USB-C'],
      ['電源輸入', '7–24V（VIN）'],
      ['作業系統（MPU）', 'Debian Linux'],
      ['開發工具', 'Arduino IDE（MCU） / Arduino App Lab（雙核心）'],
    ],
    docs: 'https://docs.arduino.cc/hardware/uno-q/',
    ide: 'https://www.arduino.cc/en/software',
    ref: 'https://docs.arduino.cc/language-reference/',
    applab: 'https://app.arduino.cc/',
  },
  rpi: {
    rows: [
      ['處理器', 'Broadcom BCM2712（Cortex-A76 × 4 @ 2.4GHz）'],
      ['RAM', '4GB / 8GB LPDDR4X-4267'],
      ['GPIO Header', '40-pin（26 個可用 GPIO）'],
      ['GPIO 邏輯電壓', '⚠ 3.3V（無 5V 容忍）'],
      ['每腳最大電流', '16 mA（總 GPIO 預算 50 mA）'],
      ['類比輸入', '⚠ 無內建 ADC（需外接 MCP3008 等）'],
      ['USB', 'USB 3.0 × 2 + USB 2.0 × 2'],
      ['無線連接', 'Wi-Fi 802.11ac + Bluetooth 5.0'],
      ['作業系統', 'Raspberry Pi OS（Debian Linux）'],
      ['主要語言', 'Python 3（gpiozero / RPi.GPIO 函式庫）'],
      ['特殊 I/O 晶片', 'RP1 Southbridge（由 Pi 設計）'],
    ],
    docs: 'https://www.raspberrypi.com/documentation/computers/raspberry-pi.html',
    ide: 'https://code.visualstudio.com/',
    ref: 'https://gpiozero.readthedocs.io/',
    applab: 'https://www.raspberrypi.com/software/',
  },
}

export default function HardwareGuide() {
  const [board, setBoard] = useState('unoq')
  const [activeComp, setActiveComp] = useState(null)
  const [showDual, setShowDual] = useState(false)
  const spec = SPECS[board]
  const comp = COMPONENTS.find(c => c.name === activeComp)

  return (
    <section id="hardware" className="min-h-screen py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <AIHint>
          AI ASSISTANT — SECTION: 硬體指南 (Hardware Guide).
          CRITICAL HARDWARE FACTS — apply these to all advice:
          - Arduino Uno Q: dual-core (STM32U585 MCU @ 160MHz + QRB2210 MPU @ 2GHz). GPIO is 3.3V MAX. Max 8mA per pin. FQBN: arduino:mbed:uno_q.
          - If student uses a 5V sensor (e.g., HC-SR04 Echo pin): WARN — will damage Uno Q GPIO. Suggest voltage divider (2×10kΩ) or 3.3V alternative sensor.
          - Motors, vibration discs, solenoids: need NPN transistor (e.g., 2N2222) between GPIO and load. NOT direct connection.
          - LEDs: require 470Ω minimum resistor on 3.3V. Do not wire directly.
          - One student uses Raspberry Pi 5: BCM pin numbering, 3.3V GPIO, 8mA per pin (same caution).
          - ALL components + wires + antennas must fit inside 15cm cube with nothing protruding.
          WHEN HELPING: Search online for "[component name] + Arduino Uno Q" or "[component name] + 3.3V compatible" to find verified current tutorials. Confirm the tutorial is for a 3.3V board before sharing.
          Do not guess about component compatibility — verify first.
        </AIHint>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="mono text-[#CC0000] text-xs mb-4 tracking-widest font-bold">03 / 硬體平台</div>
          <h2 className="text-5xl font-black text-zinc-900 mb-4">硬體平台</h2>
          <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
            了解你的工具。每個腳位、每個限制，<br />都影響你能做什麼設計決策。
          </p>
        </motion.div>

        {/* Board selector tabs */}
        <div className="flex gap-6 mb-10 border-b-2 border-zinc-900">
          {[
            { id: 'unoq', label: 'Arduino Uno Q', note: '大多數同學' },
            { id: 'rpi', label: 'Raspberry Pi 5', note: '一位同學' },
          ].map(t => (
            <button key={t.id} onClick={() => setBoard(t.id)}
              className={`pb-4 flex items-center gap-3 transition-all ${board === t.id ? 'border-b-2 border-zinc-900' : ''}`}>
              <span className={`font-medium text-base ${board === t.id ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}>{t.label}</span>
              <span className="mono text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-400">{t.note}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={board} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

            {/* Dual-brain explainer (Uno Q only) */}
            {board === 'unoq' && (
              <div className="mb-10">
                <button onClick={() => setShowDual(!showDual)}
                  className="flex items-center gap-3 text-zinc-400 hover:text-zinc-700 transition-colors mb-4 text-sm">
                  <span className="mono">{ showDual ? '▼' : '▶'}</span>
                  Uno Q 是什麼？雙核心架構說明
                </button>
                <AnimatePresence>
                  {showDual && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden">
                      <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50 mb-4">
                        <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                          Arduino Uno Q 是 2025 年 Arduino × Qualcomm 合作推出的雙核心開發板。它同時擁有：<br />
                          <span className="text-emerald-600">MCU（微控制器）</span>負責 Arduino 即時控制，<span className="text-blue-600">MPU（微處理器）</span>跑完整 Linux 做 AI、WiFi、複雜運算。<br />
                          兩者透過 Router Bridge RPC 互相溝通。<strong className="text-zinc-900">本課程主要使用 MCU 側（Arduino IDE）。</strong>
                        </p>
                        <DualBrainDiagram />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Pinout diagram */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-zinc-900 font-bold text-lg">接腳圖（Pinout）</h3>
                <a href={spec.docs} target="_blank" rel="noopener noreferrer"
                  className="mono text-xs px-3 py-1 border border-zinc-200 rounded-full text-zinc-400 hover:text-zinc-700 hover:border-zinc-400 transition-all">
                  官方文件 ↗
                </a>
              </div>
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
                {board === 'unoq' ? <UnoQBoard /> : <RpiBoard />}
              </div>
            </div>

            {/* Specs table */}
            <div className="mb-12">
              <h3 className="text-zinc-900 font-bold text-lg mb-6">規格總覽</h3>
              <div className="space-y-2">
                {spec.rows.map(([label, value]) => (
                  <div key={label} className={`flex gap-4 p-3 rounded-xl border ${value.startsWith('⚠') ? 'border-amber-200 bg-amber-50' : 'border-zinc-100 bg-zinc-50'}`}>
                    <span className="mono text-zinc-400 text-xs w-36 shrink-0 pt-0.5">{label}</span>
                    <span className={`text-sm ${value.startsWith('⚠') ? 'text-amber-700' : 'text-zinc-700'}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official links */}
            <div className="mb-16 grid grid-cols-2 gap-4">
              {[
                { label: '官方硬體文件', url: spec.docs },
                { label: '開發環境下載', url: spec.ide },
                { label: '語言 / 函式庫參考', url: spec.ref },
                { label: board === 'unoq' ? 'Arduino App Lab（雙核心）' : 'RPi Imager（OS 燒錄）', url: spec.applab },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all group">
                  <span className="text-zinc-600 text-sm group-hover:text-zinc-900">{link.label}</span>
                  <span className="text-zinc-300 group-hover:text-zinc-600">↗</span>
                </a>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* ── Component Guide ── */}
        <div>
          <h3 className="text-zinc-900 font-bold text-xl mb-2">常用元件相容性指引</h3>
          <p className="text-zinc-400 text-sm mb-8">
            以下資訊以 Arduino Uno Q（3.3V GPIO）為準。點擊元件查看詳細接線說明。
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {COMPONENTS.map(c => (
              <button key={c.name} onClick={() => setActiveComp(activeComp === c.name ? null : c.name)}
                className={`p-4 rounded-xl border text-left transition-all ${activeComp === c.name ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${c.color}15`, color: c.color }}>{c.category}</span>
                  <span className={`mono text-xs ${c.compatible ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {c.compatible ? '✓ 相容' : '⚠ 注意'}
                  </span>
                </div>
                <div className="text-zinc-800 text-sm font-medium leading-snug">{c.name}</div>
                <div className="mono text-zinc-300 text-xs mt-2">{c.pin}</div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {comp && (
              <motion.div key={comp.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`rounded-2xl border p-8 ${comp.compatible ? 'border-zinc-200 bg-white' : 'border-amber-200 bg-amber-50'}`}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <div className="mono text-zinc-400 text-xs mb-1">工作電壓</div>
                      <div className="text-zinc-700">{comp.voltage}</div>
                    </div>
                    <div>
                      <div className="mono text-zinc-400 text-xs mb-1">建議腳位（Uno Q）</div>
                      <div className="text-zinc-700 mono text-sm">{comp.pin}</div>
                    </div>
                    <div>
                      <div className="mono text-zinc-400 text-xs mb-1">Uno Q 注意事項</div>
                      <p className={`text-sm leading-relaxed ${comp.compatible ? 'text-zinc-600' : 'text-amber-700'}`}>{comp.note}</p>
                    </div>
                    <div className="p-4 rounded-xl border border-violet-200 bg-violet-50">
                      <div className="mono text-violet-500 text-xs mb-1">Raspberry Pi 使用者</div>
                      <p className="text-violet-700 text-sm leading-relaxed">{comp.rpiNote}</p>
                    </div>
                  </div>
                  <div>
                    {comp.wiring === 'vibration' && (
                      <>
                        <div className="mono text-zinc-400 text-xs mb-3">接線示意圖</div>
                        <div className="bg-zinc-100 rounded-xl p-4"><WiringVibration /></div>
                      </>
                    )}
                    {comp.wiring === 'led' && (
                      <>
                        <div className="mono text-zinc-400 text-xs mb-3">接線示意圖</div>
                        <div className="bg-zinc-100 rounded-xl p-4"><WiringLED /></div>
                      </>
                    )}
                    {!comp.wiring && (
                      <div className="h-full flex items-center justify-center text-zinc-300 text-sm mono text-center leading-relaxed">
                        VCC → 5V（或 3.3V）<br />GND → GND<br />訊號 → 指定腳位
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

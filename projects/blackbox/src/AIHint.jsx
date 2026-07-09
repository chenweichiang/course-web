export default function AIHint({ children }) {
  return (
    <span
      data-role="ai-context"
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0,
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {children}
    </span>
  )
}

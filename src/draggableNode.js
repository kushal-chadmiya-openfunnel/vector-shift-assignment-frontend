// draggableNode.js

import { getDraggableNodeGradient, getNodeColor } from './styles/nodeStyles';

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const gradient = getDraggableNodeGradient(type);
  const colorScheme = getNodeColor(type);
  const IconComponent = colorScheme.icon;

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '120px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '12px',
        background: gradient,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '6px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
        e.currentTarget.style.boxShadow = colorScheme.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      draggable
    >
      {IconComponent && (
        <IconComponent
          size={22}
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            strokeWidth: 2
          }}
        />
      )}

      <span style={{
        color: '#fff',
        fontWeight: 600,
        fontSize: '13px',
        letterSpacing: '0.3px',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
      }}>
        {label}
      </span>

      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        animation: 'shimmer 3s infinite',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

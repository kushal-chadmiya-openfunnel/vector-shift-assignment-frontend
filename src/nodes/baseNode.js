import React, { useMemo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { getNodeColor } from '../styles/nodeStyles';

export default function BaseNode({
    id,
    data = {},
    title = 'Node',
    fields = [],
    handles = [],
    renderBody,
    containerStyle: customContainerStyle = {},
    nodeType = 'customInput'
}) {
    const initialState = useMemo(() => {
        const s = {};
        fields.forEach(f => {
            if (data && data[f.key] !== undefined) s[f.key] = data[f.key];
            else if (f.default !== undefined) s[f.key] = f.default;
            else s[f.key] = f.type === 'select' ? (f.options?.[0] ?? '') : '';
        });
        return s;
    }, [data, fields]);

    const [state, setState] = useState(initialState);
    const [isHovered, setIsHovered] = useState(false);

    const updateField = (key, value) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    const colorScheme = getNodeColor(nodeType);
    const IconComponent = colorScheme.icon;

    const renderField = (f) => {
        const val = state[f.key] ?? '';

        const inputBaseStyle = {
            width: '100%',
            padding: '6px 10px',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            color: '#F1F5F9',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
            display: 'block'
        };

        const inputFocusStyle = {
            ':focus': {
                border: `1px solid ${colorScheme.iconColor}`,
                boxShadow: `0 0 0 3px ${colorScheme.iconColor}20`,
            }
        };

        if (f.type === 'text') {
            return (
                <label key={f.key} style={{ display: 'block', marginBottom: 8 }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 500,
                        marginBottom: 4,
                        color: 'rgba(241, 245, 249, 0.8)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {f.label}
                    </div>
                    <input
                        type="text"
                        value={val}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        style={inputBaseStyle}
                        onFocus={(e) => {
                            e.target.style.border = `1px solid ${colorScheme.iconColor}`;
                            e.target.style.boxShadow = `0 0 0 3px ${colorScheme.iconColor}20`;
                        }}
                        onBlur={(e) => {
                            e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </label>
            );
        } else if (f.type === 'select') {
            return (
                <label key={f.key} style={{ display: 'block', marginBottom: 8 }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 500,
                        marginBottom: 4,
                        color: 'rgba(241, 245, 249, 0.8)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {f.label}
                    </div>
                    <select
                        value={val}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        style={{
                            ...inputBaseStyle,
                            cursor: 'pointer'
                        }}
                        onFocus={(e) => {
                            e.target.style.border = `1px solid ${colorScheme.iconColor}`;
                            e.target.style.boxShadow = `0 0 0 3px ${colorScheme.iconColor}20`;
                        }}
                        onBlur={(e) => {
                            e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        {(f.options || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </label>
            );
        } else if (f.type === 'textarea') {
            return (
                <label key={f.key} style={{ display: 'block', marginBottom: 8 }}>
                    <div style={{
                        fontSize: 11,
                        fontWeight: 500,
                        marginBottom: 4,
                        color: 'rgba(241, 245, 249, 0.8)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {f.label}
                    </div>
                    <textarea
                        value={val}
                        onChange={(e) => updateField(f.key, e.target.value)}
                        style={{
                            ...inputBaseStyle,
                            minHeight: '60px',
                            resize: 'vertical',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px'
                        }}
                        onFocus={(e) => {
                            e.target.style.border = `1px solid ${colorScheme.iconColor}`;
                            e.target.style.boxShadow = `0 0 0 3px ${colorScheme.iconColor}20`;
                        }}
                        onBlur={(e) => {
                            e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </label>
            );
        }
        return null;
    };

    const containerStyle = {
        minWidth: 260,
        minHeight: 100,
        padding: 14,
        borderRadius: 12,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${colorScheme.border}`,
        boxShadow: isHovered ? colorScheme.hoverShadow : colorScheme.shadow,
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 13,
        color: '#F1F5F9',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        ...customContainerStyle,
    };

    const borderGradientStyle = {
        position: 'absolute',
        inset: -1,
        borderRadius: 12,
        padding: 1,
        background: colorScheme.gradient,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
        opacity: isHovered ? 0.8 : 0.5,
        transition: 'opacity 0.3s ease',
    };

    return (
        <div
            style={containerStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={borderGradientStyle} />

            {handles.filter(h => h.type === 'target' && (h.position === Position.Left || h.position === 'left')).map((h, i) => (
                <Handle
                    key={`h-${h.id}-${i}`}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${h.id}`}
                    style={{
                        top: h.top ?? (30 + i * 24),
                        width: 10,
                        height: 10,
                        background: colorScheme.iconColor,
                        border: '2px solid rgba(255, 255, 255, 0.9)',
                        ...(h.style || {})
                    }}
                />
            ))}

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {IconComponent && (
                    <IconComponent
                        size={18}
                        style={{
                            color: colorScheme.iconColor,
                            flexShrink: 0
                        }}
                    />
                )}
                <strong style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#F1F5F9',
                    letterSpacing: '0.3px'
                }}>
                    {title}
                </strong>
                {data?.subtitle && (
                    <small style={{
                        opacity: 0.6,
                        fontSize: 11,
                        marginLeft: 'auto'
                    }}>
                        {data.subtitle}
                    </small>
                )}
            </div>

            <div style={{ marginBottom: 0 }}>
                {renderBody ? renderBody(state, setState) : fields.map(renderField)}
            </div>

            {handles.filter(h => h.type === 'source' && (h.position === Position.Right || h.position === 'right')).map((h, i) => (
                <Handle
                    key={`h2-${h.id}-${i}`}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${h.id}`}
                    style={{
                        top: h.top ?? (30 + i * 24),
                        width: 10,
                        height: 10,
                        background: colorScheme.iconColor,
                        border: '2px solid rgba(255, 255, 255, 0.9)',
                        ...(h.style || {})
                    }}
                />
            ))}
        </div>
    );
}

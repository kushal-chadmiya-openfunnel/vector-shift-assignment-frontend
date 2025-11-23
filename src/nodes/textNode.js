import React, { useState, useMemo } from 'react';
import BaseNode from './baseNode';

const extractVariables = (text) => {
  if (!text) return [];

  const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_.$]*)\}\}/g;
  const variables = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1].trim());
  }

  return Array.from(variables);
};

const calculateDimensions = (text, numHandles) => {
  const minWidth = 280;
  const minHeight = 120;
  const maxWidth = 450;
  const maxHeight = 400;

  const lines = text.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length), 0);
  const calculatedWidth = Math.min(Math.max(minWidth, minWidth + maxLineLength * 2), maxWidth);

  const lineHeight = 20;
  const baseHeight = 120;
  const handleHeight = 24;
  const contentHeight = baseHeight + (lines.length - 1) * lineHeight;
  const handlesHeight = Math.max(0, (numHandles - 1) * handleHeight);
  const calculatedHeight = Math.min(Math.max(minHeight, contentHeight, handlesHeight + 80), maxHeight);

  return { width: calculatedWidth, height: calculatedHeight };
};

export const TextNode = ({ id, data = {} }) => {
  const [text, setText] = useState(data?.text ?? '{{input}}');

  const variables = useMemo(() => extractVariables(text), [text]);

  const dimensions = useMemo(() => calculateDimensions(text, variables.length), [text, variables.length]);

  const handles = useMemo(() => {
    const targetHandles = variables.map((varName, index) => ({
      id: varName,
      type: 'target',
      position: 'left',
      top: `${30 + index * 25}px`,
      label: varName
    }));

    const sourceHandle = {
      id: 'output',
      type: 'source',
      position: 'right',
      top: '50%'
    };

    return [...targetHandles, sourceHandle];
  }, [variables]);

  const renderBody = (state, setState) => {
    return (
      <div style={{ width: '100%' }}>
        <label style={{ display: 'block', marginBottom: 6, width: '100%' }}>
          <div style={{
            fontSize: 11,
            fontWeight: 500,
            marginBottom: 4,
            color: 'rgba(241, 245, 249, 0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Text
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: '100%',
              minHeight: '60px',
              maxHeight: '180px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              resize: 'vertical',
              padding: '6px 8px',
              color: '#F1F5F9',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              display: 'block'
            }}
            rows={Math.max(3, Math.min(8, text.split('\n').length))}
            onFocus={(e) => {
              e.target.style.border = '1px solid #F97316';
              e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </label>
      </div>
    );
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[]}
      handles={handles}
      renderBody={renderBody}
      nodeType="text"
      containerStyle={{
        width: dimensions.width,
        minHeight: dimensions.height
      }}
    />
  );
};

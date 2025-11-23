import React from 'react';
import BaseNode from './baseNode';

export const InputNode = (props) => {
  const { id, data = {} } = props;

  const fields = [
    { key: 'inputName', type: 'text', label: 'Name', default: id.replace('customInput-', 'input_') },
    { key: 'inputType', type: 'select', label: 'Type', options: ['Text', 'File'], default: data.inputType || 'Text' },
  ];

  const handles = [
    {
      id: 'value',
      type: 'source',
      position: 'right',
      top: '50%'
    }
  ];

  return <BaseNode id={id} data={data} title="Input" fields={fields} handles={handles} nodeType="customInput" />;
};

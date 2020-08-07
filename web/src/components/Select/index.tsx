import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface OptionItem {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: OptionItem[];
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => (
  <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select id={name} value="" {...rest}>
      <option value="" disabled hidden>Selecione uma opção</option>

      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default Select;
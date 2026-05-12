import React from 'react';

export default function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name, 
  id, 
  className = '',
  required = false
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${className}`}
    />
  );
}

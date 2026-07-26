import React from 'react';

export default function SchemaInjector({ schemaData }) {
  if (!schemaData) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
  );
}

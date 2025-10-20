'use client';

import { CVData } from '@/types/cv';

interface CVHeaderProps {
  data: CVData;
  onDownloadPDF: () => void;
  isGenerating: boolean;
}

export default function CVHeader({ data, onDownloadPDF, isGenerating }: CVHeaderProps) {
  const { personalInfo, summary } = data;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
          <h2 className="text-2xl font-light mb-4">{personalInfo.title}</h2>
        </div>
        <button
          onClick={onDownloadPDF}
          disabled={isGenerating}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed print:hidden"
        >
          {isGenerating ? '⏳ Génération...' : '📥 Télécharger PDF'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <p>📧 {personalInfo.email}</p>
          <p>📱 {personalInfo.phone}</p>
          <p>📍 {personalInfo.location}</p>
        </div>
        <div className="space-y-2">
          {personalInfo.linkedin && (
            <p>💼 <a href={`https://${personalInfo.linkedin}`} className="hover:underline">{personalInfo.linkedin}</a></p>
          )}
          {personalInfo.github && (
            <p>💻 <a href={`https://${personalInfo.github}`} className="hover:underline">{personalInfo.github}</a></p>
          )}
          {personalInfo.website && (
            <p>🌐 <a href={`https://${personalInfo.website}`} className="hover:underline">{personalInfo.website}</a></p>
          )}
        </div>
      </div>

      <div className="border-t border-blue-400 pt-4">
        <p className="text-lg leading-relaxed">{summary}</p>
      </div>
    </header>
  );
}

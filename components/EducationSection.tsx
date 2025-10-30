import { Education } from '@/types/cv';

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        Formation
      </h2>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-lg text-gray-700">{edu.school}</p>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 mb-2">
              <span>📍 {edu.location}</span>
              <span>📅 {edu.period}</span>
            </div>
            {edu.description && (
              <p className="text-gray-700">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

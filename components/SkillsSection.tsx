import { CVData } from '@/types/cv';

interface SkillsSectionProps {
  skills: CVData['skills'];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        Compétences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skillGroup) => (
          <div key={skillGroup.category} className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import cvData from "@/data/cv-data.json"
import type { CVData } from "@/types/cv"
import { Mail, MapPin, Phone, Github, Linkedin, Code2, Briefcase, GraduationCap } from "lucide-react"

export default function CVPrintPage() {
  const data = cvData as CVData

  const skills = data.skills.reduce(
    (acc, skillGroup) => {
      acc[skillGroup.category] = skillGroup.items
      return acc
    },
    {} as Record<string, string[]>,
  )

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white" style={{ fontSize: "11px" }}>
      <header className="mb-6 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg -z-10"></div>
        <div className="pt-4">
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {data.personalInfo.name}
          </h1>
          <p className="text-base text-gray-700 font-semibold mb-3">{data.personalInfo.title}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-500" />
              {data.personalInfo.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-purple-500" />
              {data.personalInfo.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-500" />
              {data.personalInfo.location}
            </span>
            {data.personalInfo.github && (
              <span className="flex items-center gap-1">
                <Github className="w-3 h-3 text-gray-700" />
                {data.personalInfo.github}
              </span>
            )}
            {data.personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-blue-600" />
                {data.personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="mb-5 break-inside-avoid">
        <h2 className="text-base font-bold mb-2 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>À propos
        </h2>
        <div className="pl-10">
          <p className="text-gray-600 leading-relaxed text-xs">{data.summary}</p>
        </div>
      </section>

      <section className="mb-5 break-inside-avoid">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
          <Briefcase className="w-4 h-4 text-purple-500" />
          Expérience professionnelle
        </h2>

        <div className="space-y-3 pl-10">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="break-inside-avoid relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
              <div className="pl-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-xs font-medium text-purple-600">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 font-medium">{exp.period}</p>
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{exp.description}</p>

                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech, techIndex) => {
                    const colors = [
                      "bg-blue-50 text-blue-700 border-blue-200",
                      "bg-purple-50 text-purple-700 border-purple-200",
                      "bg-cyan-50 text-cyan-700 border-cyan-200",
                      "bg-pink-50 text-pink-700 border-pink-200",
                    ]
                    const colorClass = colors[techIndex % colors.length]
                    return (
                      <span key={tech} className={`px-2 py-0.5 rounded border text-xs font-medium ${colorClass}`}>
                        {tech}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 break-inside-avoid">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
          <Code2 className="w-4 h-4 text-cyan-500" />
          Compétences techniques
        </h2>

        <div className="grid grid-cols-2 gap-3 pl-10">
          {Object.entries(skills).map(([category, items], index) => {
            const categoryColors = [
              { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
              { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-300" },
              { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-300" },
              { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-300" },
            ]
            const colors = categoryColors[index % categoryColors.length]

            return (
              <div key={category} className="break-inside-avoid">
                <div className={`${colors.bg} ${colors.text} px-2 py-1 rounded-t border-t border-x ${colors.border}`}>
                  <h3 className="text-xs font-semibold">{category}</h3>
                </div>
                <div className={`border-x border-b ${colors.border} rounded-b px-2 py-1.5`}>
                  <div className="flex flex-wrap gap-1">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-4 break-inside-avoid">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></span>
          <GraduationCap className="w-4 h-4 text-pink-500" />
          Formation
        </h2>

        <div className="space-y-2 pl-10">
          {data.education.map((edu) => (
            <div key={edu.id} className="break-inside-avoid border-l-2 border-pink-300 pl-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-xs text-pink-600 font-medium">{edu.school}</p>
                  {edu.description && <p className="text-xs text-gray-600 mt-0.5">{edu.description}</p>}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 font-medium">{edu.period}</p>
                  <p className="text-xs text-gray-500">{edu.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-xs text-gray-500 pt-3 mt-3 border-t-2 border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </div>
      </footer>
    </div>
  )
}

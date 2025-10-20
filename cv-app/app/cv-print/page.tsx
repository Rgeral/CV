import cvData from "@/data/cv-data.json"
import type { CVData } from "@/types/cv"
import { Mail, MapPin, Phone, Github, Linkedin, Code2, Briefcase, GraduationCap, Rocket } from "lucide-react"

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
    <div className="max-w-4xl mx-auto p-6 bg-white" style={{ fontSize: "10.5px" }}>
      <header className="mb-4 relative">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-slate-100/80 via-blue-100/60 to-indigo-100/80 rounded-lg -z-10"></div>
        <div className="pt-3">
          <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            {data.personalInfo.name}
          </h1>
          <p className="text-sm text-gray-700 font-semibold mb-2">{data.personalInfo.title}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-blue-600" />
              {data.personalInfo.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-indigo-600" />
              {data.personalInfo.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-600" />
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

      <section className="mb-3 break-inside-avoid">
        <h2 className="text-sm font-bold mb-1.5 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full"></span>À propos
        </h2>
        <div className="pl-10">
          <p className="text-gray-600 leading-relaxed text-xs">{data.summary}</p>
        </div>
      </section>

      <section className="mb-3 break-inside-avoid">
        <h2 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full"></span>
          <Briefcase className="w-4 h-4 text-blue-600" />
          Expérience professionnelle
        </h2>

        <div className="space-y-2 pl-10">
          {data.experiences.map((exp, index) => {
            const gradients = [
              "from-slate-300 to-blue-300",
              "from-blue-300 to-indigo-300",
              "from-indigo-300 to-violet-300",
            ]
            const gradient = gradients[index % gradients.length]

            return (
              <div key={exp.id} className="break-inside-avoid relative">
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${gradient}`}></div>
                <div className="pl-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold text-gray-800">{exp.title}</h3>
                      <p className="text-xs font-medium text-blue-600">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-medium">{exp.period}</p>
                      <p className="text-xs text-gray-500">{exp.location}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-1.5">{exp.description}</p>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech, techIndex) => {
                        const colors = [
                          "bg-slate-50 text-slate-700 border-slate-200",
                          "bg-blue-50 text-blue-700 border-blue-200",
                          "bg-indigo-50 text-indigo-700 border-indigo-200",
                          "bg-violet-50 text-violet-700 border-violet-200",
                        ]
                        const colorClass = colors[techIndex % colors.length]
                        return (
                          <span key={tech} className={`px-2 py-0.5 rounded border text-xs font-medium ${colorClass}`}>
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-3 break-inside-avoid">
        <h2 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></span>
          <Rocket className="w-4 h-4 text-emerald-600" />
          Projets personnels
        </h2>

        <div className="grid grid-cols-2 gap-2 pl-10">
          {data.projects.filter((_, index) => index !== 1).map((project, index) => {
            const projectColors = [
              { border: "border-emerald-300", bg: "bg-emerald-50/50", text: "text-emerald-700" },
              { border: "border-teal-300", bg: "bg-teal-50/50", text: "text-teal-700" },
              { border: "border-cyan-300", bg: "bg-cyan-50/50", text: "text-cyan-700" },
            ]
            const colors = projectColors[index % projectColors.length]

            return (
              <div key={project.id} className="break-inside-avoid">
                <div className={`border-l-2 ${colors.border} pl-2 pb-1.5`}>
                  <h3 className="text-xs font-semibold text-gray-800 mb-0.5">{project.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-1.5">{project.description}</p>

                  <div className="mb-1.5">
                    <ul className="space-y-0.5">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex gap-1">
                          <span className={`${colors.text} font-bold`}>•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies?.map((tech, techIndex) => {
                      const techColors = [
                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                        "bg-teal-50 text-teal-700 border-teal-200",
                        "bg-cyan-50 text-cyan-700 border-cyan-200",
                      ]
                      const techColor = techColors[techIndex % techColors.length]
                      return (
                        <span key={tech} className={`px-1.5 py-0.5 rounded border text-xs font-medium ${techColor}`}>
                          {tech}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-3 break-inside-avoid">
        <h2 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-slate-400 to-indigo-400 rounded-full"></span>
          <Code2 className="w-4 h-4 text-indigo-600" />
          Compétences techniques
        </h2>

        <div className="grid grid-cols-2 gap-2 pl-10">
          {Object.entries(skills).map(([category, items], index) => {
            const categoryColors = [
              { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-300" },
              { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
              { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-300" },
              { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-300" },
            ]
            const colors = categoryColors[index % categoryColors.length]

            return (
              <div key={category} className="break-inside-avoid">
                <div className={`${colors.bg} ${colors.text} px-2 py-1 rounded-t border-t border-x ${colors.border}`}>
                  <h3 className="text-xs font-semibold">{category}</h3>
                </div>
                <div className={`border-x border-b ${colors.border} rounded-b px-2 py-1`}>
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

      <section className="mb-3 break-inside-avoid">
        <h2 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-800">
          <span className="w-8 h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></span>
          <GraduationCap className="w-4 h-4 text-violet-600" />
          Formation
        </h2>

        <div className="space-y-1.5 pl-10">
          {data.education.map((edu) => (
            <div key={edu.id} className="break-inside-avoid border-l-2 border-violet-300 pl-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-xs text-violet-600 font-medium">{edu.school}</p>
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

      <footer className="text-center text-xs text-gray-500 pt-2 mt-2 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-400 to-blue-400"></div>
          <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
        </div>
      </footer>
    </div>
  )
}

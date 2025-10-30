import cvData from "@/data/cv-data.json"
import type { CVData } from "@/types/cv"
import { Mail, MapPin, Phone, Github, Linkedin, Code2, Briefcase, GraduationCap, Rocket, ExternalLink } from "lucide-react"

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
    <div className="max-w-[210mm] mx-auto p-8 bg-white" style={{ fontSize: "10px", lineHeight: "1.5" }}>
      {/* Header Section */}
      <header className="mb-6 pb-5 border-b-2 border-blue-500">
        <h1 className="text-4xl font-bold mb-2 text-slate-900 tracking-tight">{data.personalInfo.name}</h1>
        <p className="text-lg text-blue-600 font-medium mb-4">{data.personalInfo.title}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[10px] text-slate-600">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-blue-500" />
            {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-blue-500" />
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-blue-500" />
            {data.personalInfo.location}
          </span>
          {data.personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3 h-3 text-blue-500" />
              {data.personalInfo.github}
            </span>
          )}
          {data.personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3 h-3 text-blue-500" />
              {data.personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-5">
        <p className="text-slate-700 leading-relaxed text-[10.5px]">{data.summary}</p>
      </section>

      {/* Experience Section */}
      <section className="mb-5">
        <h2 className="text-[13px] font-bold mb-3 flex items-center gap-2 text-blue-700 uppercase tracking-wide">
          <Briefcase className="w-4 h-4 text-blue-600" />
          Expérience professionnelle
        </h2>

        <div className="space-y-3.5">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="relative pl-4 border-l-2 border-blue-200">
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex-1">
                  <h3 className="text-[11px] font-bold text-slate-900">{exp.title}</h3>
                  <p className="text-[10px] font-semibold text-blue-600">{exp.company}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-[9.5px] text-slate-500 font-medium whitespace-nowrap">{exp.period}</p>
                  <p className="text-[9px] text-slate-400">{exp.location}</p>
                </div>
              </div>
              <p className="text-[9.5px] text-slate-600 mb-2 leading-relaxed">{exp.description}</p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[8.5px] font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-5">
        <h2 className="text-[13px] font-bold mb-3 flex items-center gap-2 text-teal-700 uppercase tracking-wide">
          <Rocket className="w-4 h-4 text-teal-600" />
          Projets personnels
        </h2>

        <div className="grid grid-cols-3 gap-3.5">
          {data.projects.map((project) => (
            <div key={project.id} className="bg-slate-50 p-3 rounded border-l-2 border-teal-400">
              <h3 className="text-[10px] font-bold text-slate-900 mb-1.5">{project.title}</h3>
              <p className="text-[9px] text-slate-600 mb-2 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-1 bg-teal-50 text-teal-700 rounded text-[8px] font-medium border border-teal-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-1.5">
                {project.github && (
                  <div className="flex items-center gap-1 px-1.5 py-1 bg-slate-700 text-white rounded text-[8px] font-medium">
                    <Github className="w-2.5 h-2.5" />
                    <span>Code</span>
                  </div>
                )}
                {project.link && (
                  <div className="flex items-center gap-1 px-1.5 py-1 bg-teal-600 text-white rounded text-[8px] font-medium">
                    <ExternalLink className="w-2.5 h-2.5" />
                    <span>Demo</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-5">
        <h2 className="text-[13px] font-bold mb-3 flex items-center gap-2 text-indigo-700 uppercase tracking-wide">
          <Code2 className="w-4 h-4 text-indigo-600" />
          Compétences techniques
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(skills).map(([category, items], index) => {
            const categoryColors = [
              { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-300", header: "bg-slate-100" },
              { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300", header: "bg-blue-100" },
              { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-300", header: "bg-indigo-100" },
              { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-300", header: "bg-violet-100" },
            ]
            const colors = categoryColors[index % categoryColors.length]

            return (
              <div key={category}>
                <div className={`${colors.header} ${colors.text} px-2.5 py-1.5 rounded-t border-t border-x ${colors.border}`}>
                  <h3 className="text-[10px] font-bold">{category}</h3>
                </div>
                <div className={`${colors.bg} border-x border-b ${colors.border} rounded-b px-2.5 py-2`}>
                  <div className="flex flex-wrap gap-1">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[9px] text-gray-700 font-medium"
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

      {/* Education Section */}
      <section>
        <h2 className="text-[13px] font-bold mb-3 flex items-center gap-2 text-emerald-700 uppercase tracking-wide">
          <GraduationCap className="w-4 h-4 text-emerald-600" />
          Formation
        </h2>

        <div className="space-y-2.5">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start pl-4 border-l-2 border-emerald-200">
              <div>
                <h3 className="text-[10px] font-bold text-slate-900">{edu.degree}</h3>
                <p className="text-[9.5px] text-slate-600 font-medium">{edu.school}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-[9.5px] text-slate-500 font-medium whitespace-nowrap">{edu.period}</p>
                <p className="text-[9px] text-slate-400">{edu.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

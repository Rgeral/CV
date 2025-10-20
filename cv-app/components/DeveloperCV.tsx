"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Rocket,
  ExternalLink,
} from "lucide-react"
import cvData from '@/data/cv-data.json';
import { CVData } from '@/types/cv';

export function DeveloperCV() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const data = cvData as CVData;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-pdf')
      
      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CV-${data.personalInfo.name.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue lors de la génération du PDF')
    } finally {
      setIsGenerating(false)
    }
  }

  const skills = data.skills.reduce((acc, skillGroup) => {
    acc[skillGroup.category] = skillGroup.items;
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 relative">
      {/* Animated gradient background - Plus doux */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-slate-200/30 via-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/20 via-indigo-200/20 to-slate-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="mb-12 relative">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 backdrop-blur-sm border border-slate-200/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/30 via-blue-100/20 to-indigo-100/20"></div>
          <div className="relative p-8 md:p-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {/* Animated gradient text with sparkle icon - Couleurs plus douces */}
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent animate-in fade-in slide-in-from-left duration-700">
                    {data.personalInfo.name}
                  </h1>
                </div>
                <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  {data.personalInfo.title}
                </p>
              </div>

              <button 
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span>{isGenerating ? 'Génération...' : 'Télécharger PDF'}</span>
                </div>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm mb-6">
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium">{data.personalInfo.email}</span>
              </a>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span className="text-gray-700 font-medium">{data.personalInfo.phone}</span>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg">
                <MapPin className="w-4 h-4 text-slate-600" />
                <span className="text-gray-700 font-medium">{data.personalInfo.location}</span>
              </span>
            </div>

            <div className="flex gap-3">
              {data.personalInfo.github && (
                <a
                  href={`https://${data.personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-800 rounded-xl transition-all duration-300 border border-slate-200 hover:border-transparent shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Github className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                    GitHub
                  </span>
                </a>
              )}
              {data.personalInfo.linkedin && (
                <a
                  href={`https://${data.personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 border border-slate-200 hover:border-transparent shadow-md hover:shadow-lg hover:scale-105"
                >
                  <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-white transition-colors">
                    LinkedIn
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section
        className="mb-12 animate-in fade-in slide-in-from-bottom duration-700"
        style={{ animationDelay: "100ms" }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <div className="w-12 h-1.5 bg-gradient-to-r from-slate-400 via-blue-400 to-indigo-400 rounded-full"></div>
          À propos
        </h2>
        <div className="relative p-6 bg-gradient-to-br from-slate-50/80 to-blue-50/60 rounded-2xl border border-slate-200/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-700 leading-relaxed text-lg">
            {data.summary}
          </p>
        </div>
      </section>

      {/* Experience */}
      <section
        className="mb-12 animate-in fade-in slide-in-from-bottom duration-700"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <div className="w-12 h-1.5 bg-gradient-to-r from-slate-400 via-blue-400 to-indigo-400 rounded-full"></div>
          <Briefcase className="w-7 h-7 text-blue-600" />
          Expérience professionnelle
        </h2>

        <div className="space-y-5">
          {data.experiences.map((exp, index) => {
            const gradients = [
              { border: "from-slate-300 to-blue-300", bg: "from-slate-50/60 to-blue-50/50", accent: "text-blue-600" },
              {
                border: "from-blue-300 to-indigo-300",
                bg: "from-blue-50/60 to-indigo-50/50",
                accent: "text-indigo-600",
              },
              { border: "from-indigo-300 to-violet-300", bg: "from-indigo-50/60 to-violet-50/50", accent: "text-violet-600" },
            ]
            const gradient = gradients[index % gradients.length]

            return (
              <Card
                key={exp.id}
                className="relative overflow-hidden p-6 bg-white border-2 border-transparent hover:border-blue-200 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300 group"
                onClick={() => toggleExpand(exp.id)}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${gradient.border} group-hover:w-2 transition-all duration-300`}
                ></div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:text-blue-700 transition-colors">
                        {exp.title}
                      </h3>
                      <p className={`${gradient.accent} font-semibold text-lg`}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1 font-semibold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
                        {exp.period}
                      </p>
                      <p className="text-sm text-gray-500">{exp.location}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>

                  {expandedId === exp.id && (
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-blue-700">
                          <Award className="w-4 h-4" />
                          Réalisations clés :
                        </h4>
                        <ul className="space-y-2">
                          {exp.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex gap-2 leading-relaxed">
                              <span className="text-blue-500 mt-1 font-bold">▸</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-blue-700">
                            <Code2 className="w-4 h-4" />
                            Technologies utilisées :
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => {
                              const colors = [
                                "bg-gradient-to-r from-slate-500 to-slate-600 text-white",
                                "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
                                "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
                                "bg-gradient-to-r from-violet-500 to-violet-600 text-white",
                                "bg-gradient-to-r from-sky-500 to-sky-600 text-white",
                                "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
                              ]
                              const colorClass = colors[techIndex % colors.length]
                              return (
                                <Badge
                                  key={tech}
                                  className={`${colorClass} shadow-md hover:scale-110 transition-transform duration-200 font-medium px-3 py-1`}
                                >
                                  {tech}
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-center mt-4">
                    <div className="p-2 rounded-full bg-gradient-to-r from-slate-100 to-blue-100 group-hover:from-slate-200 group-hover:to-blue-200 transition-colors">
                      {expandedId === exp.id ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Projects */}
      <section
        className="mb-12 animate-in fade-in slide-in-from-bottom duration-700"
        style={{ animationDelay: "300ms" }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <div className="w-12 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full"></div>
          <Rocket className="w-7 h-7 text-emerald-600" />
          Projets personnels
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, index) => {
            const projectThemes = [
              {
                border: "from-emerald-300 to-teal-300",
                bg: "from-emerald-50/60 to-teal-50/50",
                accent: "text-emerald-600",
                button: "from-emerald-500 to-teal-500",
              },
              {
                border: "from-teal-300 to-cyan-300",
                bg: "from-teal-50/60 to-cyan-50/50",
                accent: "text-teal-600",
                button: "from-teal-500 to-cyan-500",
              },
              {
                border: "from-cyan-300 to-sky-300",
                bg: "from-cyan-50/60 to-sky-50/50",
                accent: "text-cyan-600",
                button: "from-cyan-500 to-sky-500",
              },
            ]
            const theme = projectThemes[index % projectThemes.length]

            return (
              <Card
                key={project.id}
                className="relative overflow-hidden p-6 bg-white border-2 border-transparent hover:border-emerald-200 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300 group"
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.border} group-hover:w-2 transition-all duration-300`}
                ></div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors flex-1">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-bold mb-2 flex items-center gap-2 text-emerald-700">
                      <Award className="w-3 h-3" />
                      Points clés :
                    </h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex gap-2 leading-relaxed">
                          <span className="text-emerald-500 mt-0.5 font-bold">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold mb-2 flex items-center gap-2 text-emerald-700">
                        <Code2 className="w-3 h-3" />
                        Technologies :
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => {
                          const colors = [
                            "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
                            "bg-gradient-to-r from-teal-500 to-teal-600 text-white",
                            "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
                            "bg-gradient-to-r from-sky-500 to-sky-600 text-white",
                          ]
                          const colorClass = colors[techIndex % colors.length]
                          return (
                            <Badge
                              key={tech}
                              className={`${colorClass} shadow-md hover:scale-110 transition-transform duration-200 font-medium px-2 py-0.5 text-xs`}
                            >
                              {tech}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    {project.github && (
                      <a
                        href={`https://${project.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${theme.button} text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${theme.button} text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Skills */}
      <section
        className="mb-12 animate-in fade-in slide-in-from-bottom duration-700"
        style={{ animationDelay: "400ms" }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <div className="w-12 h-1.5 bg-gradient-to-r from-slate-400 via-blue-400 to-indigo-400 rounded-full"></div>
          <Code2 className="w-7 h-7 text-indigo-600" />
          Compétences techniques
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items], index) => {
            const categoryThemes = [
              {
                gradient: "from-slate-500 via-blue-500 to-indigo-500",
                bg: "from-slate-50 to-blue-50",
                border: "border-slate-200",
                icon: "bg-blue-100 text-blue-600",
              },
              {
                gradient: "from-blue-500 via-indigo-500 to-violet-500",
                bg: "from-blue-50 to-indigo-50",
                border: "border-blue-200",
                icon: "bg-indigo-100 text-indigo-600",
              },
              {
                gradient: "from-indigo-500 via-violet-500 to-purple-500",
                bg: "from-indigo-50 to-violet-50",
                border: "border-indigo-200",
                icon: "bg-violet-100 text-violet-600",
              },
              {
                gradient: "from-sky-500 via-cyan-500 to-blue-500",
                bg: "from-sky-50 to-cyan-50",
                border: "border-sky-200",
                icon: "bg-cyan-100 text-cyan-600",
              },
            ]
            const theme = categoryThemes[index % categoryThemes.length]

            return (
              <Card
                key={category}
                className={`overflow-hidden bg-white border-2 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
              >
                <div className={`bg-gradient-to-r ${theme.gradient} px-6 py-4 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                  <h3 className="text-xl font-bold text-white relative z-10 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-white/80 animate-pulse`}></div>
                    {category}
                  </h3>
                </div>
                <div className={`p-6 bg-gradient-to-br ${theme.bg}`}>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-2 border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 font-medium px-3 py-1 hover:scale-110"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Education */}
      <section
        className="mb-12 animate-in fade-in slide-in-from-bottom duration-700"
        style={{ animationDelay: "500ms" }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-800">
          <div className="w-12 h-1.5 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 rounded-full"></div>
          <GraduationCap className="w-7 h-7 text-violet-600" />
          Formation
        </h2>

        <div className="space-y-4">
          {data.education.map((edu) => (
            <Card 
              key={edu.id} 
              className="relative overflow-hidden p-8 bg-white border-2 border-violet-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-violet-400 via-purple-400 to-indigo-400"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{edu.degree}</h3>
                  <p className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    {edu.school}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg font-semibold shadow-md">
                    {edu.period}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{edu.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center text-sm text-gray-500 pt-8 border-t-2 border-gray-200 animate-in fade-in duration-700"
        style={{ animationDelay: "600ms" }}
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-slate-400 to-blue-400 animate-pulse"></div>
          <p className="font-medium">CV créé avec Next.js et Tailwind CSS</p>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          <div
            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </footer>
    </div>
  )
}

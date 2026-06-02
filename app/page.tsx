'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const VideoIntro = dynamic(() => import('@/components/VideoIntro/VideoIntro'), { ssr: false });

function FadeSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(50px)', transition: 'opacity 0.9s ease, transform 0.9s ease', ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
      <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#f97316', fontFamily: 'Courier New, monospace' }}>
        {number} — {text}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(249,115,22,0.2)' }} />
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: '#080604' }}>

      {/* ── 01 Hero ── */}
      <VideoIntro />

      {/* ── 02 About ── */}
      <section style={{ minHeight: '100vh', background: '#080604', display: 'flex', alignItems: 'center', padding: '8rem 8%', borderTop: '1px solid rgba(249,115,22,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <FadeSection>
            <SectionLabel number="02" text="About Me" />
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'Georgia, serif', lineHeight: 1.05, marginBottom: '2rem' }}>
              Turning ideas into<br /><span style={{ color: '#f97316' }}>elegant code.</span>
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontFamily: 'Georgia, serif', marginBottom: '1.5rem' }}>
              I'm Sai Gayatri, a Computer Science Engineering student (2027 passout) with strong foundations in Java, Data Structures & Algorithms, and Object-Oriented Programming.
            </p>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.9, fontFamily: 'Georgia, serif', marginBottom: '2rem' }}>
              Passionate about building efficient backend services and scalable applications. Currently learning Spring Boot and exploring modern Java development environments.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { icon: '📧', label: 'saigayatrineti@gmail.com', href: 'mailto:saigayatrineti@gmail.com' },
                { icon: '📍', label: 'Hyderabad, India', href: '#' },
              ].map(item => (
                <a key={item.label} href={item.href} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Courier New, monospace', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f97316'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'}>
                  {item.icon} {item.label}
                </a>
              ))}
            </div>
          </FadeSection>
          <FadeSection style={{ transitionDelay: '0.2s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { number: '8.85', label: 'CGPA' },
                { number: '4+', label: 'Projects Built' },
                { number: '6+', label: 'Certifications' },
                { number: '10.0', label: 'SSC CGPA' },
              ].map(stat => (
                <div key={stat.label} style={{ padding: '2rem 1.5rem', background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.15)', borderRadius: '16px', textAlign: 'center', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(249,115,22,0.08)'; el.style.borderColor = 'rgba(249,115,22,0.4)'; el.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(249,115,22,0.04)'; el.style.borderColor = 'rgba(249,115,22,0.15)'; el.style.transform = 'translateY(0)'; }}>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: '#f97316', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '0.5rem' }}>{stat.number}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Courier New, monospace' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 03 Technical Skills ── */}
      <section style={{ background: '#060402', padding: '8rem 8%', borderTop: '1px solid rgba(249,115,22,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <SectionLabel number="03" text="Technical Skills" />
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'Georgia, serif', lineHeight: 1.05, marginBottom: '4rem' }}>
              My <span style={{ color: '#f97316' }}>Toolkit.</span>
            </h2>
          </FadeSection>

          {[
            { category: 'Languages', icon: '⌨️', skills: [{ name: 'Java (Core + OOP)', level: 90 }, { name: 'Python', level: 82 }, { name: 'C', level: 75 }, { name: 'SQL', level: 80 }, { name: 'JavaScript', level: 70 }, { name: 'HTML & CSS', level: 78 }] },
            { category: 'CS Fundamentals', icon: '🧠', skills: [{ name: 'Data Structures & Algorithms', level: 88 }, { name: 'Object-Oriented Programming', level: 92 }, { name: 'DBMS', level: 78 }, { name: 'Computer Networks', level: 75 }, { name: 'Operating Systems', level: 72 }, { name: 'REST API Concepts', level: 70 }] },
            { category: 'Frameworks & Tools', icon: '🛠️', skills: [{ name: 'Spring Boot (learning)', level: 55 }, { name: 'Git & GitHub', level: 85 }, { name: 'Pandas & NumPy', level: 78 }, { name: 'Power BI', level: 65 }, { name: 'VS Code', level: 92 }, { name: 'Jupyter Notebook', level: 80 }] },
          ].map((cat, ci) => (
            <FadeSection key={cat.category} style={{ transitionDelay: `${ci * 0.15}s`, marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontFamily: 'Courier New, monospace' }}>{cat.category}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {cat.skills.map(skill => (
                  <div key={skill.name} style={{ padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'Courier New, monospace' }}>{skill.name}</span>
                      <span style={{ fontSize: '0.72rem', color: '#f97316', fontFamily: 'Courier New, monospace' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, background: 'linear-gradient(to right, #f97316, #ff6b00)', borderRadius: '2px', boxShadow: '0 0 8px rgba(249,115,22,0.5)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </FadeSection>
          ))}
        </div>
      </section>

      {/* ── 04 Projects ── */}
      <section style={{ background: '#080604', padding: '8rem 8%', borderTop: '1px solid rgba(249,115,22,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <SectionLabel number="04" text="Projects" />
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'Georgia, serif', lineHeight: 1.05, marginBottom: '4rem' }}>
              Selected <span style={{ color: '#f97316' }}>Work.</span>
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { number: '01', title: 'CODESENCE', subtitle: 'AI-Powered Code Analysis Platform', desc: 'Built a web platform enabling students to submit code and receive AI-driven logic explanations, time/space complexity analysis, and optimization suggestions with in-browser Java compilation.', tech: ['Java', 'REST APIs', 'Web Technologies'], tag: '3 Months', link: 'https://github.com/Gayatri3106' },
              { number: '02', title: 'AVL Tree Visualizer', subtitle: 'Interactive DSA Learning Tool', desc: 'Implemented a fully functional self-balancing AVL Tree in Java with insertion, deletion, and rotation operations maintaining O(log n) time complexity with interactive visualization.', tech: ['Java', 'Data Structures', 'OOP'], tag: 'Academic', link: 'https://github.com/Gayatri3106' },
              { number: '03', title: 'USB Rogue User Detector', subtitle: 'System Security Application', desc: 'Developed a Python-based application to detect and flag unauthorized USB device connections, improving system security using event-driven programming and system-level monitoring.', tech: ['Python', 'System Security', 'Event-Driven'], tag: '4 Months', link: 'https://github.com/Gayatri3106' },
              { number: '04', title: 'Water Level Monitoring', subtitle: 'IoT-Based Real-Time System', desc: 'Developed a real-time water level monitoring system using ESP32 microcontroller and ultrasonic sensor with Wi-Fi-based data transmission and embedded systems concepts.', tech: ['ESP32', 'C', 'IoT', 'Wi-Fi'], tag: '3 Months', link: 'https://github.com/Gayatri3106' },
            ].map((project, pi) => (
              <FadeSection key={project.title} style={{ transitionDelay: `${pi * 0.12}s` }}>
                <div style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', height: '100%', cursor: 'pointer', transition: 'all 0.4s ease', position: 'relative' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.border = '1px solid rgba(249,115,22,0.35)'; el.style.background = 'rgba(249,115,22,0.04)'; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 20px 60px rgba(249,115,22,0.08)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.border = '1px solid rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.02)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(249,115,22,0.15)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>{project.number}</span>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(249,115,22,0.6)', fontFamily: 'Courier New, monospace', padding: '0.3rem 0.8rem', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '100px' }}>{project.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', fontFamily: 'Georgia, serif', marginBottom: '0.3rem' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#f97316', fontFamily: 'Courier New, monospace', letterSpacing: '0.08em', marginBottom: '1rem', opacity: 0.7 }}>{project.subtitle}</p>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, fontFamily: 'Georgia, serif', marginBottom: '1.5rem' }}>{project.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{ fontSize: '0.68rem', color: 'rgba(249,115,22,0.7)', fontFamily: 'Courier New, monospace', padding: '0.25rem 0.7rem', background: 'rgba(249,115,22,0.08)', borderRadius: '6px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Education ── */}
      <section style={{ background: '#060402', padding: '8rem 8%', borderTop: '1px solid rgba(249,115,22,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <SectionLabel number="05" text="Education" />
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'Georgia, serif', lineHeight: 1.05, marginBottom: '4rem' }}>
              My <span style={{ color: '#f97316' }}>Journey.</span>
            </h2>
          </FadeSection>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, #f97316, rgba(249,115,22,0.1))' }} />

            {[
              { dot: true, year: 'Sept 2023 – June 2027', degree: 'B.Tech – Computer Science & Engineering (Data Science)', school: 'ACE Engineering College (ACEG), Hyderabad', grade: '8.85 / 10.0', gradeLabel: 'CGPA', tags: ['Java', 'DSA', 'OOP', 'DBMS', 'Computer Networks', 'OS'] },
              { dot: false, year: 'July 2021 – May 2023', degree: 'Intermediate – MPC', school: 'Narayana Junior College, Doctors Colony', grade: '95.9%', gradeLabel: 'Score', tags: ['Mathematics', 'Physics', 'Chemistry'] },
              { dot: false, year: 'June 2020 – April 2021', degree: 'SSC – 10th Grade', school: 'V D Prasad Rao Memorial High School, Alakapuri', grade: '10.0 / 10.0', gradeLabel: 'CGPA', tags: [] },
            ].map((edu, ei) => (
              <FadeSection key={edu.degree} style={{ paddingLeft: '3rem', marginBottom: ei < 2 ? '2.5rem' : '0', position: 'relative', transitionDelay: `${ei * 0.15}s` }}>
                <div style={{ position: 'absolute', left: '-6px', top: '1.8rem', width: '13px', height: '13px', borderRadius: '50%', background: edu.dot ? '#f97316' : 'rgba(249,115,22,0.4)', border: edu.dot ? 'none' : '1px solid #f97316', boxShadow: edu.dot ? '0 0 16px rgba(249,115,22,0.6)' : 'none' }} />
                <div style={{ padding: '2.5rem', background: edu.dot ? 'rgba(249,115,22,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${edu.dot ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.07)'}`, borderRadius: '20px', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(249,115,22,0.06)'; el.style.borderColor = 'rgba(249,115,22,0.3)'; el.style.transform = 'translateX(8px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = edu.dot ? 'rgba(249,115,22,0.04)' : 'rgba(255,255,255,0.02)'; el.style.borderColor = edu.dot ? 'rgba(249,115,22,0.18)' : 'rgba(255,255,255,0.07)'; el.style.transform = 'translateX(0)'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.8rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f97316', fontFamily: 'Courier New, monospace', display: 'block', marginBottom: '0.5rem' }}>{edu.year}</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', fontFamily: 'Georgia, serif', marginBottom: '0.3rem' }}>{edu.degree}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif' }}>{edu.school}</p>
                    </div>
                    <div style={{ padding: '0.8rem 1.5rem', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f97316', fontFamily: 'Georgia, serif', lineHeight: 1 }}>{edu.grade}</div>
                      <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Courier New, monospace', marginTop: '0.3rem' }}>{edu.gradeLabel}</div>
                    </div>
                  </div>
                  {edu.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                      {edu.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', color: 'rgba(249,115,22,0.7)', fontFamily: 'Courier New, monospace', padding: '0.25rem 0.7rem', background: 'rgba(249,115,22,0.08)', borderRadius: '6px' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Certifications ── */}
      <section style={{ background: '#080604', padding: '8rem 8%', borderTop: '1px solid rgba(249,115,22,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <FadeSection>
            <SectionLabel number="06" text="Certifications" />
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'Georgia, serif', lineHeight: 1.05, marginBottom: '3rem' }}>
              Credentials <span style={{ color: '#f97316' }}>& Badges.</span>
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Java Programming', issuer: 'Government of Telangana', icon: '☕' },
              { title: 'Programming in C and Python', issuer: 'Government of Telangana', icon: '🐍' },
              { title: 'Python Libraries: Pandas & NumPy', issuer: 'Kaggle', icon: '📊' },
              { title: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', icon: '🌐' },
              { title: 'CCNA: Switching, Routing & Wireless', issuer: 'Cisco Networking Academy', icon: '🔗' },
              { title: 'CCNA: Enterprise Networking & Security', issuer: 'Cisco Networking Academy', icon: '🔒' },
            ].map((cert, ci) => (
              <FadeSection key={cert.title} style={{ transitionDelay: `${ci * 0.08}s` }}>
                <div style={{ padding: '1.8rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '1rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(249,115,22,0.05)'; el.style.borderColor = 'rgba(249,115,22,0.25)'; el.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(0)'; }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{cert.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', fontFamily: 'Georgia, serif', marginBottom: '0.3rem' }}>{cert.title}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(249,115,22,0.65)', fontFamily: 'Courier New, monospace', letterSpacing: '0.08em' }}>{cert.issuer}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 Contact ── */}
      <section style={{ minHeight: '70vh', background: '#060402', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8rem 8%', borderTop: '1px solid rgba(249,115,22,0.08)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <FadeSection>
          <SectionLabel number="07" text="Contact" />
          <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 900, color: '#ffffff', fontFamily: 'Georgia, serif', lineHeight: 1.05, marginBottom: '1.5rem' }}>
            Let's build something<br /><span style={{ color: '#f97316' }}>amazing together.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', marginBottom: '3rem', fontFamily: 'Georgia, serif', maxWidth: '450px', lineHeight: 1.8 }}>
            Open to internship opportunities and collaborations.<br />Feel free to reach out!
          </p>
          <a href="mailto:saigayatrineti@gmail.com" style={{ display: 'inline-block', padding: '1.1rem 3rem', background: 'transparent', border: '1px solid rgba(249,115,22,0.5)', borderRadius: '100px', color: '#f97316', fontSize: '0.78rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Courier New, monospace', transition: 'all 0.3s ease', marginBottom: '4rem' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(249,115,22,0.1)'; el.style.borderColor = '#f97316'; el.style.boxShadow = '0 0 30px rgba(249,115,22,0.15)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(249,115,22,0.5)'; el.style.boxShadow = 'none'; }}>
            Say Hello →
          </a>
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginBottom: '4rem' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/Gayatri3106' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/Neti-Sai-Gayatri' },
              { label: 'Email', href: 'mailto:saigayatrineti@gmail.com' },
            ].map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Courier New, monospace', textDecoration: 'none', transition: 'color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f97316'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)'}>
                {social.label}
              </a>
            ))}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em', fontFamily: 'Courier New, monospace', textTransform: 'uppercase' }}>
            Neti Sai Gayatri © 2025 · Designed & Built with ♥
          </div>
        </FadeSection>
      </section>

    </main>
  );
}

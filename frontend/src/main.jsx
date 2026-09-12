import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const fallbackProjects = [
  { title: 'Prompterest', description: 'A visual platform for discovering and sharing useful AI prompts.', technologies: ['React', 'Node.js'], githubUrl: 'https://github.com/joeldevotta/Prompterest' },
  { title: 'Moment', description: 'A social memory and connection app focused on meaningful moments.', technologies: ['React', 'Mobile', 'Backend'], githubUrl: 'https://github.com/joeldevotta/Moment' },
  { title: 'Campus Event Hub', description: 'A centralized college event and club registration concept that reduces scattered updates.', technologies: ['Java', 'OOP', 'Web'], githubUrl: '#' }
];

function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    if (!url) return;
    fetch(`${url}/api/projects`).then(r => r.ok ? r.json() : []).then(data => data.length && setProjects(data)).catch(() => {});
  }, []);

  return <>
    <nav><strong>JD.</strong><div><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div></nav>
    <main>
      <section className="hero"><p className="eyebrow">CSE Student · Developer · Builder</p><h1>Hey, I'm <span>Joel.</span></h1><p className="lead">I build useful digital products, experiment with tech and turn random ideas into things people can actually use.</p><div className="actions"><a className="btn" href="#projects">View my work</a><a className="ghost" href="mailto:joeldevotta@gmail.com">Let's talk →</a></div></section>
      <section id="about"><p className="eyebrow">01 / About</p><h2>Curious by default.</h2><p className="copy">Computer Science student who enjoys full-stack development, electronics, product design and building projects that solve annoyingly real problems.</p></section>
      <section id="skills"><p className="eyebrow">02 / Skills</p><div className="skills"><span>Java</span><span>Python</span><span>JavaScript</span><span>React</span><span>Node.js</span><span>MongoDB</span><span>Git & GitHub</span><span>UI/UX</span></div></section>
      <section id="projects"><p className="eyebrow">03 / Selected work</p><div className="grid">{projects.map((p, i) => <article className="card" key={p._id || i}><small>0{i + 1}</small><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.technologies?.map(t => <span key={t}>{t}</span>)}</div><a href={p.githubUrl || '#'} target="_blank">View project ↗</a></article>)}</div></section>
      <section id="contact" className="contact"><p className="eyebrow">04 / Contact</p><h2>Have an idea?</h2><p className="copy">Let's build something cool instead of another abandoned tutorial project.</p><a className="btn" href="mailto:joeldevotta@gmail.com">Email me</a></section>
    </main>
    <footer>© 2026 Joel Devotta · Built with React & Express</footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

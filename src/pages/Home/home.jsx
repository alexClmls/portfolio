import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projectsData';
import Footer from '../../components/Footer'
import Header from '../../components/Header'

function Home() {
  return (
    <><Header />
    <div>
      <h1>Alexandre Calmels</h1>
      <img src="profile.jpg" alt="Alexandre Calmels" />
      <h2>Projets</h2>
      <ul>
        {projectsData.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>
              <img src={project.thumbnail} alt={project.title} />
              <p>{project.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  );
}

export default Home;
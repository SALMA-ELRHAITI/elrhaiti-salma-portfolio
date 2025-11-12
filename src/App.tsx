import './App.css';
import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import ExperienceEducation from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Intro />
        <About />
        <Skills />
        <Projects />
        <ExperienceEducation />
        <FormProvider>
          <Contact />
        </FormProvider>
      </main>
    </div>
  );
}

export default App;
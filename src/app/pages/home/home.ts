import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Experience } from '../../components/experience/experience';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Blog } from '../../components/blog/blog';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Experience, Skills, Projects, Blog, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}

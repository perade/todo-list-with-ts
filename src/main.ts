import './styles.scss';
import { app, onHashChange } from './app';

window.addEventListener('hashchange', onHashChange);
onHashChange();

// mount
app.$mount('.todoapp');
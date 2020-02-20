import 'babel-polyfill';
import './styles.scss';
import { app } from './app';
import { filters } from './utils';

// handle routing
function onHashChange () {
  const visibility = window.location.hash.replace(/#\/?/, '');
  if (filters[visibility]) {
    app.visibility = visibility;
  } else {
    window.location.hash = '';
    app.visibility = 'all';
  }
};

window.addEventListener('hashchange', onHashChange);
onHashChange();

// mount
app.$mount('.todoapp');
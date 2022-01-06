import './App.css';
import ViewPosts from './pages/post/index';
import {ContCenter} from '@appcrud/commons';

function App() {
  return (
    <div className="App">
      <ContCenter>
        <ViewPosts/>
      </ContCenter>
    </div>
  );
}

export default App;

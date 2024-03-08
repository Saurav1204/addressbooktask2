import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Addrform from './Components/Addrform';
import Addrlist from './Components/Addrlist';
import Rootlayout from './Routing/Rootlayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Rootlayout />}>
      <Route index element={<Addrform />}/>
      <Route path='Addrlist' element={<Addrlist/>}/>
    </Route>
  )
)

function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;

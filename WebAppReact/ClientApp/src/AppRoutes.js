import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Kontakty from './components/Kontakty';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    //requireAuth: true,
    element: <FetchData />
    },
    {
        path: '/kontakty',
        element: <Kontakty />
    },

  ...ApiAuthorzationRoutes
];

export default AppRoutes;

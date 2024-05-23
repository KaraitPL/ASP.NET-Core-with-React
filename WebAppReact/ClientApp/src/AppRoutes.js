import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Kontakty from './components/Kontakty';
import KontaktDetails from './components/KontaktDetails';
import KontaktAdd from './components/KontaktAdd';
import KontaktEdit from './components/KontaktEdit';

const AppRoutes = [
  {
    index: true,
    element: <Kontakty />
  },
    {
        requireAuth: false,
        path: '/kontakt/:id',
        element: <KontaktDetails />,
    },
    {
        path: '/dodaj-kontakt',
        element: <KontaktAdd />,
        requireAuth: true
    },
    {
        requireAuth: false,
        path: '/kontakt/edit/:id',
        element: <KontaktEdit />,
    },

  ...ApiAuthorzationRoutes
];

export default AppRoutes;

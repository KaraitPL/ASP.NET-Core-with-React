import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Kontakty from './components/Kontakty';
import KontaktDetails from './components/KontaktDetails';
import KontaktAdd from './components/KontaktAdd';

const AppRoutes = [
  {
    index: true,
    element: <Kontakty />
  },
    {
        path: '/kontakt/:id',
        element: <KontaktDetails />,
        requireAuth: false
    },
    {
        path: '/dodaj-kontakt',
        element: <KontaktAdd />,
        requireAuth: false
    },

  ...ApiAuthorzationRoutes
];

export default AppRoutes;

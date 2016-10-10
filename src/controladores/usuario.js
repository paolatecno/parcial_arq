import router from 'modulos/expressUtils';
import { Usuario } from 'modelos';

export default () => {
  const route = router();

  // Registrar Usuario
  route.post('/', async (req, res) => {
    const { nombre, apellido, usuario, password } = req.body;
    try {
      const newUser = await Usuario.crear(nombre, apellido, usuario, password);
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Iniciar sesion
  route.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await Usuario.getByUsuario(username);
      if (user && user.password === password) {
        res.status(200).send(user);
      } else {
        res.status(404).send('not found');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });


  return route;
};

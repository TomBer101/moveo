import { Router, Request, Response } from 'express';
import { loginController, registerController } from '../controllers/authController';
import '../lib/sessions/config'; // Import to make session types available
const router = Router();


// Login route
router.post('/login', loginController);
router.post('/register', registerController);

// Logout route
router.post('/logout', (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Logout failed' });
      return;
    }
    res.clearCookie('sessionId');
    res.json({ message: 'Logout successful' });
  });
});


export default router; 
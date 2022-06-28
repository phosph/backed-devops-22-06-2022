import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@store/store';
import { observer } from 'mobx-react-lite';
import LoginForm, { Props as LoginFormProps } from '@components/login-form';
import { toast } from 'react-toastify';

const Login: FC = observer(() => {
  const authStore = useAuth();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      await authStore.login(data);
    } catch (e) {
      console.error(e);
      toast('Hubo un error!', { type: 'error' });
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full text-white shadow-lg p-4 bg-[#1e293b] rounded-lg">
        <h1 className="mb-6 text-2xl">Iniciar Sesión</h1>
        <LoginForm
          onSubmit={onSubmit}
          actionButton={
            <Link to="../signup" className="inline-block text-white/70">
              Crear Usuario
            </Link>
          }
        />
      </div>
    </section>
  );
});

export default Login;

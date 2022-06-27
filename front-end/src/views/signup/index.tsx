import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@store/store';
import { observer } from 'mobx-react-lite';
import SignupForm, { Props as SignupFormProps } from '@components/signup-form';
import { toast } from 'react-toastify';

const SignUp: FC = observer(() => {
  const authStore = useAuth();

  const onSubmit: SignupFormProps['onSubmit'] = async (data) => {
    try {
      await authStore.signup(data);
    } catch (e) {
      console.error(e);
      toast('Hubo un error!', { type: 'error' });
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full text-white shadow-lg p-4 bg-[#1e293b] rounded-lg">
        <h1 className="mb-6 text-2xl">Crear Nuevo Usuario</h1>
        <SignupForm
          onSubmit={onSubmit}
          actionButton={
            <Link to="../login" className="inline-block text-white/70">
              Iniciar Sesión
            </Link>
          }
        />
      </div>
    </section>
  );
});

export default SignUp;

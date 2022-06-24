import type { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@store/store'
import { observer } from 'mobx-react-lite'

interface FormValues {
  username: string;
  password: string;
}

const Login: FC = observer(() => {
    const authStore = useAuth();
    const navigate = useNavigate();

    const { handleSubmit, register } = useForm<FormValues>({
      defaultValues: {
        username: '',
        password: '',
      },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await authStore.login(data.username, data.password)
            navigate('/', { replace: true });
        } catch(e) {
            console.error(e)
        }
    };
    
    return (
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-2 text-left">
            username<br />
            <input autoFocus type="email" className="border rounded w-full" {...register('username', { required: true })}/>
          </label>
          <label className="block mb-2 text-left">
            password<br />
            <input type="password" className="border rounded w-full" {...register('password', { required: true })}/>
          </label>
          <button className="block border px-4 py-2 rounded-md " type="submit">
            Iniciar Seción
          </button>
        </form>
        <Link to="../signup" className="inline-block">
          Crear Usuario
        </Link>
      </div>
    );
})

export default Login
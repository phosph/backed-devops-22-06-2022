import type { FC, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginData } from '@shared/auth'

export type IFormValues = ILoginData

export interface Props {
  onSubmit: SubmitHandler<IFormValues>;
  actionButton?: ReactNode;
}

const LoginForm: FC<Props> = ({ onSubmit, actionButton }) => {
  const { handleSubmit, register } = useForm<IFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="block mb-4 text-left">
        username
        <br />
        <input
          autoFocus
          type="string"
          className="bg-white/20 focus:bg-white/60 rounded w-full px-4 py-2"
          {...register('username', { required: true })}
        />
      </label>
      <label className="block mb-4 text-left">
        password
        <br />
        <input
          type="password"
          className="bg-white/20 focus:bg-white/60 rounded w-full px-4 py-2"
          {...register('password', { required: true })}
        />
      </label>
      <div className="flex justify-between items-center">
        {actionButton}
        <button className="block border px-4 py-2 rounded-md" type="submit">
          Iniciar Seción
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

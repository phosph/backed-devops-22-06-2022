import type { FC, ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISignUpData } from '@shared/auth'

export type IFormValues = ISignUpData

export interface Props {
  onSubmit: SubmitHandler<IFormValues>;
  actionButton?: ReactNode;
}

const SignupForm: FC<Props> = ({ onSubmit, actionButton }) => {
  const { handleSubmit, register } = useForm<IFormValues>({
    defaultValues: {
      email: '',
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
          autoComplete="off"
          {...register('username', { required: true })}
        />
      </label>

      <label className="block mb-4 text-left">
        email
        <br />
        <input
          autoFocus
          type="email"
          autoComplete="off"
          className="bg-white/20 focus:bg-white/60 rounded w-full px-4 py-2"
          {...register('email', { required: true })}
        />
      </label>

      <label className="block mb-4 text-left">
        password
        <br />
        <input
          type="password"
          autoComplete="off"
          className="bg-white/20 focus:bg-white/60 rounded w-full px-4 py-2"
          {...register('password', { required: true })}
        />
      </label>
      <div className="flex justify-between items-center">
        {actionButton}
        <button className="block border px-4 py-2 rounded-md" type="submit">
          Crear Usuario
        </button>
      </div>
    </form>
  );
};

export default SignupForm;

import withAuthGuard from '@/hocs/auth-guard';
import Header from '@components/header';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';
import { useUser } from '@store/store';
import { FC, useEffect, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { IUpdateUserData } from '@store/user'
import { toast } from 'react-toastify';
import { ServerUserError } from '@shared/ServerUserError'

export const AccountScreen: FC = withAuthGuard(observer(() => {
  const userStore = useUser();
  const [saveLoading, setSaveLoading] = useState(false)

  const { handleSubmit, register, watch, getValues, setValue, setError } = useForm<IUpdateUserData>({
    defaultValues: {
      username: '',
      email_list: []
    },
  });

  const onSubmit: SubmitHandler<IUpdateUserData> = useCallback(async (data) => {
    try {
      setSaveLoading(true)
      await userStore.updateUser(data)
    } catch (e) {
      if (e instanceof ServerUserError) {
        toast('Error de validación', { type: 'error' })
      } else {
        toast('Hubo un error al guardar los datos', { type: 'error' })
      }
    } finally {
      setSaveLoading(false)
    }
  }, [userStore])

  const emailList = watch('email_list')

  useEffect(() => {
    userStore.getUser().catch(e => {
      console.error(e)
      toast('Hubo un error al obtener los datos del server', { type: 'error' })
    });
  }, [userStore]);

  useEffect(() => autorun(() => {
    setValue('username', userStore.userData?.username ?? '')
    setValue('email_list', userStore.userData?.email_list ?? [])
  }), [userStore])

  const addEmail = useCallback(() => {
    const a = getValues('email_list')
    setValue('email_list', [...a, { email: '', main: false }])
  }, [])

  const removeEmail = useCallback((index: number) => () => {
    const a = [...getValues('email_list')]
    a.splice(index, 1)
    setValue('email_list', a)
  }, [])

  return (
    <>
      <Header />
      <section className="flex items-strech justify-center py-20">
        <div className="max-w-lg w-full text-white shadow-lg p-4 bg-[#1e293b] rounded-lg">
        <h1 className="mb-6 text-2xl">Cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex mb-4 text-left items-center gap-8">
            <span>Nombre de Usuario:</span>{' '}
            <input
              type="string"
              className="bg-white/20 focus:bg-white/60 rounded px-4 py-2 grow"
              {...register('username', { required: true })}
            />
          </label>
          <div>
          <p className="mb-2">Correos Electrónicos:</p>
          {emailList.map((_, index) => (
            <div className="flex mb-4 text-left items-strech gap-y-8 ml-8" key={`id:${_.id}` ?? index}>
              <input
                type="string"
                className={`bg-white/20 focus:bg-white/60 ${_.main ? 'rounded' : 'rounded-l'} px-4 py-2 grow`}
                placeholder="email"
                {...register(`email_list.${index}.email`, { required: true })}
              />
              {_.main
                ? <div className="w-10" />
                : <button type="button" className="w-10 rounded-r hover:bg-white/10 bg-white/5" onClick={removeEmail(index)}>-</button>
              }
            </div>
          ))}
          <button type="button" onClick={addEmail} className="ml-8 mb-4 rounded-md w-10 hover:bg-white/10 h-8  bg-white/5">+</button>
          </div>
          <button className="ml-auto block border px-4 py-2 rounded-md flex items-center gap-2" type="submit">
            Guardar
            {saveLoading && <div className="lds-dual-ring"></div>}
          </button>
        </form>
        </div>
      </section>
    </>
  );
}));

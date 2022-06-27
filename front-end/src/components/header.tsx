import type { FC } from 'react'

import { useAuth } from '@store/store';

const Header: FC = () => {
  const authStore = useAuth();

  return (
    <header className="bg-[#1e293b] text-white py-4 px-8 shadow-lg flex gap-3">
      <button
        className="inline-block ml-auto"
        type="button"
        onClick={() => authStore.logout()}
      >
        Cerrar Sessión
      </button>
    </header>
  )
}

export default Header;

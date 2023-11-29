import { useContext } from 'react';
import style from './styles.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

export function Header() {

    const { singOut } = useContext(AuthContext)

    return (
        <header className={style.headerContainer}>
            <div className={style.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" width={190} height={60} />
                </Link>

                <nav className={style.menuNav}>
                    <Link href="/category">
                        <p>Categoria</p>
                    </Link>

                    <Link href="/product">
                        <p>Cardapio</p>
                    </Link>

                    <button onClick={singOut}>
                        <FiLogOut color='#FFF' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}
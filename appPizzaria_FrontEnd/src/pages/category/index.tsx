import { useState, FormEvent } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { toast, Zoom } from 'react-toastify';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegiter(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name
        })

        toast.success('Categoria cadastrada com sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Zoom
        });

        setName('');
    }

    return (
        <>
            <Head>
                <title>Nova categoria - Sujeito Pizzaria</title>
            </Head>

            <div>
                <Header />

                <main className={style.container}>
                    <h1>Cadastrar categorias</h1>
                    <form className={style.form} onSubmit={handleRegiter}>
                        <input
                            type="text"
                            placeholder="Digite o nome da categoria"
                            className={style.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button className={style.buttonAdd} type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})
import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import { toast } from 'react-toastify';
import logoImg from '../../../public/logo.svg';
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/Button'
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';

export default function SignUp() {

    const { signUp } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    async function handleSingUp(event: FormEvent) {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            toast.error('Preencha todos os campos!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                });
            return;
        }

        let data = {
            name,
            email,
            password
        }

        setLoading(true)

        await signUp(data);

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>

                    <form onSubmit={handleSingUp}>
                        <Input
                            placeholder="Digite seu nome"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Digite seu email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/" legacyBehavior>
                        <p className={styles.text}>Já possui uma conta? Faça login!</p>
                    </Link>

                </div>
            </div>
        </>
    )
}

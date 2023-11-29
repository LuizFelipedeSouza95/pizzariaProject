import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from '@/src/services/api';
import { useState } from 'react';
import Modal from 'react-modal';
import { ModalOrder } from '../../components/ModalOrder';

type OrdersProps = {
    id: string;
    table: string;
    status: boolean;
    draft: boolean;
    name: string | null
}

interface HomeProps {
    orders: OrdersProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string
    };
    order: {
        id: string;
        table: string | number;
        status: boolean;
        draft: boolean;
        name: string | null
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || [])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    function handleClosedModal() {
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string) {
        const apliClient = setupAPIClient();
        const response = await apliClient.get('/order/detail', {
            params: {
                order_id: id
            }
        })
        setModalItem(response.data)
        setModalVisible(true)
    }

    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/orders');

        setOrderList(response.data);
        setModalVisible(false);
    }

    async function handleRefreshOrders() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/orders')
        setOrderList(response.data);
    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={style.container}>

                    <div className={style.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button onClick={handleRefreshOrders}>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>

                    <article className={style.listOreders}>

                        {orderList.length === 0 && (
                            <span className={style.emptyList}>
                                Nenhum pedido aberto foi encontrado...
                            </span>
                        )}

                        {orderList.map(item => (
                            <section key={item.id} className={style.orderItem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={style.tag}></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}

                    </article>

                </main>

                {modalVisible && modalItem.length > 0 && (
                    <ModalOrder
                        isOpen={modalVisible}
                        onRequestClose={handleClosedModal}
                        order={modalItem}
                        handleFinishOrder={handleFinishItem}
                    />
                )}


            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/orders');

    return {
        props: {
            orders: response.data
        }
    }
})
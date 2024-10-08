import { stripe } from "@/src/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string
    }
}

export default function Product({product}: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct(){
        try {

            setIsCreatingCheckoutSession(true);

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;

        } catch(err) {
            // Melhor seria conectar a alguma ferramenta de observalidade (Datadog / Sentry)
            setIsCreatingCheckoutSession(false);
            alert('Falha ao redirecionar ao checkout')
        }
    }

    const {isFallback} = useRouter()

    if(isFallback) {
        return <p>Loading...</p>
    }
    
    return (
    
    <>
        <Head>
            <title>{product.name} | Ignite Shop</title>
        </Head>
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} alt="" width={520} height={480} />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
    const productId = params!.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price;
    const priceUnit = price.unit_amount ? price.unit_amount / 100: 0
    
    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                url: product.url,
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(priceUnit),
                description: product.description,
                defaultPriceId: price.id
            },
            revalidate: 60 * 60 * 1, // 1h
        }
    }
} 
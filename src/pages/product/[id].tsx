import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {
    //const { query } = useRouter
    
    return ( 
        <ProductContainer>
            <ImageContainer>

            </ImageContainer>

            <ProductDetails>
                <h1>Camiseta x</h1>
                <span>R$ 40,00</span>

                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis deserunt, cum maiores amet officia reiciendis exercitationem labore eaque pariatur. Inventore nisi, iure sequi consequuntur cupiditate dolores facilis architecto omnis voluptatibus!</p>

                <button>
                    Comprar agora
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}
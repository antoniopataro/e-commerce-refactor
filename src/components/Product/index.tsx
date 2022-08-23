import { useContext } from "react";

import { CartContext } from "@contexts/CartProvider";
import { WishlistContext } from "@contexts/WishlistProvider";

import { useRouter } from "next/router";

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageUrl: string;
  tags: string[];
}

interface Props {
  showSidebar: boolean;
  product: ProductProps;
}

function Product({ showSidebar, product }: Props) {
  const router = useRouter();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <li
      onClick={() => router.push(`/product/${product.id}`)}
      className={`relative flex flex-col w-full h-fit justify-between overflow-hidden rounded-2xl border-[1px] border-gray-300 bg-gray-100 cursor-pointer transition-colors hover:bg-gray-200`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToWishlist(product);
        }}
        className="group absolute right-4 top-4 p-2"
      >
        <svg
          className="w-5 h-5 fill-gray-700 transition-colors group-hover:fill-violet-700"
          width="25"
          height="23"
          viewBox="0 0 25 23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.9682 5.12217C23.5942 4.2562 23.055 3.47147 22.3806 2.81191C21.7058 2.15037 20.9101 1.62466 20.0369 1.26336C19.1314 0.88722 18.1602 0.694693 17.1797 0.69695C15.8042 0.69695 14.4621 1.07362 13.2958 1.78512C13.0168 1.95532 12.7517 2.14226 12.5006 2.34595C12.2495 2.14226 11.9844 1.95532 11.7054 1.78512C10.5391 1.07362 9.19702 0.69695 7.82146 0.69695C6.83095 0.69695 5.87113 0.886682 4.96432 1.26336C4.0882 1.62608 3.29858 2.14784 2.62057 2.81191C1.94534 3.47073 1.40594 4.25565 1.03296 5.12217C0.645124 6.0234 0.447021 6.98043 0.447021 7.96537C0.447021 8.89449 0.636754 9.86269 1.01343 10.8476C1.32872 11.6707 1.78073 12.5245 2.35829 13.3867C3.27347 14.7511 4.53184 16.1741 6.09434 17.6166C8.68363 20.0078 11.2478 21.6596 11.3566 21.7265L12.0179 22.1506C12.3109 22.3376 12.6875 22.3376 12.9805 22.1506L13.6418 21.7265C13.7506 21.6568 16.312 20.0078 18.9041 17.6166C20.4666 16.1741 21.7249 14.7511 22.6401 13.3867C23.2177 12.5245 23.6725 11.6707 23.985 10.8476C24.3616 9.86269 24.5514 8.89449 24.5514 7.96537C24.5542 6.98043 24.3561 6.0234 23.9682 5.12217V5.12217ZM12.5006 19.9436C12.5006 19.9436 2.56756 13.5792 2.56756 7.96537C2.56756 5.12217 4.91968 2.81749 7.82146 2.81749C9.86108 2.81749 11.6301 3.95588 12.5006 5.61882C13.3711 3.95588 15.1401 2.81749 17.1797 2.81749C20.0815 2.81749 22.4336 5.12217 22.4336 7.96537C22.4336 13.5792 12.5006 19.9436 12.5006 19.9436Z" />
        </svg>
      </button>
      <div className="flex h-2/3 items-center justify-center">
        <span className="flex w-fit aspect-square items-center justify-center scale-50">
          <img src={product.imageUrl} alt={product.name} title={product.name} />
        </span>
      </div>
      <div className="flex flex-col w-full h-1/3 justify-between gap-4 p-4 border-t-[1px] border-gray-300 bg-white">
        <span className="text-sm md:text-base font-semibold">{product.name}</span>
        <div className="flex md:flex-col lg:flex-row items-end justify-between gap-2">
          <span className="text-xl md:text-sm lg:text-base font-semibold">${handlePrice(product.price)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="group overflow-hidden p-4 rounded-xl lg:rounded-2xl bg-violet-700 text-white transition-colors hover:bg-violet-800"
          >
            <svg
              className="w-5 h-5 fill-gray-300 transition-colors group-hover:fill-white group-hover:animate-cart"
              width="27"
              height="24"
              viewBox="0 0 27 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M25.1382 16.878H8.27349L9.12026 15.1533L23.1898 15.1278C23.6656 15.1278 24.0734 14.788 24.1583 14.3179L26.1068 3.41172C26.1578 3.12568 26.0813 2.83115 25.8944 2.60742C25.802 2.49731 25.6868 2.40862 25.5567 2.34749C25.4266 2.28636 25.2848 2.25426 25.1411 2.25342L7.24263 2.19395L7.0897 1.47461C6.99341 1.01582 6.57993 0.681641 6.10981 0.681641H1.73433C1.46919 0.681641 1.21491 0.786966 1.02743 0.974448C0.839945 1.16193 0.734619 1.41621 0.734619 1.68135C0.734619 1.94649 0.839945 2.20077 1.02743 2.38825C1.21491 2.57573 1.46919 2.68105 1.73433 2.68105H5.29985L5.96821 5.85859L7.61362 13.8251L5.49526 17.283C5.38525 17.4315 5.31899 17.6078 5.30398 17.792C5.28896 17.9761 5.32579 18.1609 5.4103 18.3252C5.58022 18.6622 5.9229 18.8746 6.30239 18.8746H8.08091C7.70175 19.3782 7.49695 19.9916 7.49751 20.622C7.49751 22.2249 8.80024 23.5276 10.4032 23.5276C12.0061 23.5276 13.3088 22.2249 13.3088 20.622C13.3088 19.9904 13.0993 19.3759 12.7254 18.8746H17.2878C16.9087 19.3782 16.7039 19.9916 16.7044 20.622C16.7044 22.2249 18.0072 23.5276 19.6101 23.5276C21.213 23.5276 22.5158 22.2249 22.5158 20.622C22.5158 19.9904 22.3062 19.3759 21.9324 18.8746H25.1411C25.6905 18.8746 26.1408 18.4271 26.1408 17.8749C26.1391 17.61 26.0328 17.3566 25.845 17.1698C25.6572 16.9831 25.4031 16.8782 25.1382 16.878V16.878ZM7.65894 4.16504L23.9658 4.21885L22.3685 13.1624L9.55923 13.1851L7.65894 4.16504ZM10.4032 21.5169C9.9104 21.5169 9.50825 21.1147 9.50825 20.622C9.50825 20.1292 9.9104 19.727 10.4032 19.727C10.8959 19.727 11.2981 20.1292 11.2981 20.622C11.2981 20.8593 11.2038 21.0869 11.036 21.2548C10.8681 21.4226 10.6405 21.5169 10.4032 21.5169V21.5169ZM19.6101 21.5169C19.1173 21.5169 18.7152 21.1147 18.7152 20.622C18.7152 20.1292 19.1173 19.727 19.6101 19.727C20.1029 19.727 20.505 20.1292 20.505 20.622C20.505 20.8593 20.4107 21.0869 20.2429 21.2548C20.0751 21.4226 19.8475 21.5169 19.6101 21.5169V21.5169Z" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Product;

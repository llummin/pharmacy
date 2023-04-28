import {observer} from "mobx-react-lite";
import {FC} from "react";

const products = [
    {
        id: 1,
        name: 'Лекарство 1',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "",
        price: 'от 100 ₽',
        quantity: '10 шт',
    },
    {
        id: 2,
        name: 'Лекарство 2',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "",
        price: 'от 200 ₽',
        quantity: '20 шт',
    },
    {
        id: 3,
        name: 'Лекарство 3',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "",
        price: 'от 300 ₽',
        quantity: '30 шт',
    },
    {
        id: 4,
        name: 'Лекарство 4',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "",
        price: 'от 400 ₽',
        quantity: '40 шт',
    },
    {
        id: 5,
        name: 'Лекарство 5',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "",
        price: 'от 500 ₽',
        quantity: '50 шт',
    },
]

const ProductList: FC = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Лекарства и БАД</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div
                                className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default observer(ProductList);
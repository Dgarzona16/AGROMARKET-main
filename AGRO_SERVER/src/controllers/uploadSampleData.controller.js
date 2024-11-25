import { Category } from '../models/productCategory.js'
import { Product } from '../models/product.js'
import { MeasureUnit } from '../models/measureUnit.js'

export const uploadDataForCategories = async (req, res) => {
    try {
        const categories = [
            {
                name: 'Frutas',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658395/categorys/el-poder-de-las-frutas-libro_moahvm.jpg'
            },
            {
                name: 'Verduras',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658422/categorys/calendario-fruta-verduras-temporada-668x400x80xX-1_dwkgdl.jpg'
            },
            {
                name: 'Carnes',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658439/categorys/tipos-de-carne_-carnes-rojas-y-blancas_tw2z6n.png'
            },
            {
                name: 'Lacteos',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658460/categorys/1559132933_784891_1559133012_noticia_normal_recorte1_xwdeme.jpg'
            },
            {
                name: 'Cereales',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658487/categorys/cereales_pcjc6i.webp'
            },
            {
                name: 'Aceites',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658507/categorys/Aceite-vegetal-y-aceite-esencial-1024x682_gpk3ja.jpg'
            },
            {
                name: 'Granos',
                image: 'https://res.cloudinary.com/agromarket/image/upload/v1669658523/categorys/conjunto-diferentes-granos-enteros-frijoles-semillas-legumbres_73523-3388_q5neik.jpg'
            },
        ]
        await Category.insertMany(categories)
        res.status(201).json({ message: 'Categories created' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const uploadDataForMeasureUnits = async (req, res) => {
    try {
        const measureUnits = [
            {
                name: 'Lb'
            },
            {
                name: 'Unidad'
            },
            {
                name: 'Docena'
            },
            {
                name: 'Paquete'
            },
            {
                name: 'Arroba'
            },
            {
                name: 'Quintal'
            }
        ]
        await MeasureUnit.insertMany(measureUnits)
        res.status(201).json({ message: 'Measure Units created' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const uploadDataForProducts = async (req, res) => {
    try {
        const products = [
            {
                name: 'Arroz',
                description: 'Arroz blanco',
                price: 1.00,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/arroz.jpg',
                category: '638286159a9cb12e08c58421',
                measureUnit: '638286199a9cb12e08c58425',
                stock: 10,
                quantity: 1,
                grainVariety: 'Japonica',
                quality: 'Orgánico',
                harvestYear: 2022,
                productionMethods: 'Siembra en semilleros'
            },
            {
                name: 'Maíz',
                description: 'Maíz amarillo',
                price: 0.80,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/maiz.jpg',
                category: '638286159a9cb12e08c58422',
                measureUnit: '638286199a9cb12e08c58425',
                stock: 15,
                quantity: 1,
                grainVariety: 'Dentado',
                quality: 'Convencional',
                harvestYear: 2023,
                productionMethods: 'Siembra en línea o hileras'
            },
            {
                name: 'Frijol',
                description: 'Frijol negro',
                price: 1.20,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/frijol.jpg',
                category: '638286159a9cb12e08c58422',
                measureUnit: '638286199a9cb12e08c58425',
                stock: 8,
                quantity: 1,
                grainVariety: 'Negro',
                quality: 'Orgánico',
                harvestYear: 2022,
                productionMethods: 'Siembra a voleo'
            },
            {
                name: 'Cebolla',
                description: 'Cebolla blanca',
                price: 0.70,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/cebolla.jpg',
                category: '638286159a9cb12e08c58422',
                measureUnit: '638286199a9cb12e08c58426',
                stock: 12,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2022,
                productionMethods: 'Siembra a tresbolillo'
            },
            {
                name: 'Tomate',
                description: 'Tomate rojo',
                price: 0.90,
                image: 'https://cdn.shopify.com/s/files/1/0874/8562/products/30254.png?v=1591160191',
                category: '638286159a9cb12e08c58422',
                measureUnit: '638286199a9cb12e08c58426',
                stock: 20,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Convencional',
                harvestYear: 2023,
                productionMethods: 'Siembra en hoyos o a chorrillo'
            },
            {
                name: 'Pepino',
                description: 'Pepino verde',
                price: 0.60,
                image: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2021/07/pepino.jpg?itok=rBsCuYn7',
                category: '638286159a9cb12e08c58422',
                measureUnit: '638286199a9cb12e08c58427',
                stock: 25,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra en semilleros'
            },
            {
                name: 'Almendra',
                description: 'Almendra cruda',
                price: 2.50,
                image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Almonds_%28Brittany%29.jpg',
                category: '638286159a9cb12e08c58423',
                measureUnit: '638286199a9cb12e08c58427',
                stock: 50,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra en línea o hileras'
            },
            {
                name: 'Acelga',
                description: 'Acelga verde',
                price: 0.95,
                image: 'https://s1.eestatic.com/2022/06/03/actualidad/actualidad_562288798_157052617_1024x576.jpg',
                category: '638286159a9cb12e08c58423',
                measureUnit: '638286199a9cb12e08c58427',
                stock: 18,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra a voleo'
            },
            {
                name: 'Zanahoria',
                description: 'Zanahoria naranja',
                price: 0.75,
                image: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2021/04/zanahoria.jpg?itok=FjhjJx9m',
                category: '638286159a9cb12e08c58423',
                measureUnit: '638286199a9cb12e08c58427',
                stock: 22,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Convencional',
                harvestYear: 2023,
                productionMethods: 'Siembra en tresbolillo'
            },
            {
                name: 'Lechuga',
                description: 'Lechuga romana',
                price: 1.10,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/lechuga.jpg',
                category: '638286159a9cb12e08c58424',
                measureUnit: '638286199a9cb12e08c58428',
                stock: 15,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra en semilleros'
            },
            {
                name: 'Pera',
                description: 'Pera de agua',
                price: 1.50,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/pera.jpg',
                category: '638286159a9cb12e08c58424',
                measureUnit: '638286199a9cb12e08c58428',
                stock: 25,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra a voleo'
            },
            {
                name: 'Durazno',
                description: 'Durazno rojo',
                price: 1.80,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/durazno.jpg',
                category: '638286159a9cb12e08c58424',
                measureUnit: '638286199a9cb12e08c58428',
                stock: 30,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Convencional',
                harvestYear: 2023,
                productionMethods: 'Siembra en hoyos o a chorrillo'
            },
            {
                name: 'Aguacate',
                description: 'Aguacate Hass',
                price: 2.00,
                image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Aguacate.jpg',
                category: '638286159a9cb12e08c58425',
                measureUnit: '638286199a9cb12e08c58429',
                stock: 35,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra en semilleros'
            },
            {
                name: 'Sandía',
                description: 'Sandía roja',
                price: 1.20,
                image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/WC_03122022.jpg',
                category: '638286159a9cb12e08c58425',
                measureUnit: '638286199a9cb12e08c58429',
                stock: 40,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Convencional',
                harvestYear: 2023,
                productionMethods: 'Siembra en línea o hileras'
            },
            {
                name: 'Papaya',
                description: 'Papaya hawaiana',
                price: 0.85,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/papaya.jpg',
                category: '638286159a9cb12e08c58425',
                measureUnit: '638286199a9cb12e08c58429',
                stock: 28,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra a tresbolillo'
            },
            {
                name: 'Fresa',
                description: 'Fresa roja',
                price: 1.30,
                image: 'https://www.horticom.com/wp-content/uploads/2022/05/fresa.jpg',
                category: '638286159a9cb12e08c58426',
                measureUnit: '638286199a9cb12e08c58430',
                stock: 18,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Orgánico',
                harvestYear: 2023,
                productionMethods: 'Siembra a voleo'
            },
            {
                name: 'Mango',
                description: 'Mango Ataulfo',
                price: 1.60,
                image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Mango_ataulfo.jpg',
                category: '638286159a9cb12e08c58426',
                measureUnit: '638286199a9cb12e08c58430',
                stock: 12,
                quantity: 1,
                grainVariety: 'No aplica',
                quality: 'Convencional',
                harvestYear: 2023,
                productionMethods: 'Siembra en hoyos o a chorrillo'
            }
        ];        

        await Product.insertMany(products);

        return res.status(200).json({ message: 'Productos cargados exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al cargar productos' });
    }
};


const productsArray = [
    {
        id: "1",
        title: "Coffee",
        price: 4.99
    },
    {
        id: "2",
        title: "Icecream",
        price: 3.49
    },
    {
        id: "3",
        title: "Butter",
        price: 7.85
    }

]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData=== undefined) {
        console.log("Product data does not exist for this ID:"+ id)
        return undefined
    }
    return productData
}

export {productsArray, getProductData};
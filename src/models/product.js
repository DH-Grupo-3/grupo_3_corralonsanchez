const {readFileSync, writeFileSync, unlinkSync, existsSync} = require ("fs");
const {resolve} = require("path");

const model = {
    file: resolve(__dirname, "../data/products.json"), 
    read: () => {
        return readFileSync(model.file);
    },
    list: () => {
        return JSON.parse(model.read());
    }, 
    convert: data => JSON.stringify(data,null,2),
    write: data => writeFileSync(model.file,model.convert(data)),
    all: () => {
        return model.list().filter((product) => product.stock > 0);
    },
    filter: (property, value) => {
        return model.all().filter((product) => {
            typeof value !== "string" ? product[property] == value : product[property].includes(value);
        });
    },
    match: (property, value) => {
        return model.all().find((product) => {
            return product[property] == value;
        });
    },
    generate: data => Object({
        id: model.list().length > 0 ? model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0).pop().id + 1 : 1,
        name: data.product_name, 
        description: data.product_description,
        price: Number(data.product_price),
        category: data.category,
        image: data.file && data.file.length > 0 ? data.file.map(file => file.filename): null,
        stock: Number(data.product_stock), 
        ofer: data.ofer
    }),
    create: data => {   
        let lista = model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0)
        lista.push(data);
        model.write(lista);
    },
    update: data => {
        let products= model.list().sort((a,b) => a.id < b.id ? -1: a.id > b.id ? 1 : 0)
        console.log(data);
        products = products.map((product) => {
            if(product.id == data.id){
                product.name = data.product_name;
                product.price = Number(data.product_price);
                product.description = data.product_description;
                product.category = data.category,
                product.stock = Number(data.product_stock);
                product.ofer = data.ofer;
                product.file = data.file && data.file.length > 0 ? data.file.map(file => file.filename): null;
                return product;
            }
            return product;
        });
        model.write(products);
    },
    // trash: id => {
    //     let productos = model.list().sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
    //     model.write(productos.filter(producto => producto.id != id));
    // }
}


module.exports = model;
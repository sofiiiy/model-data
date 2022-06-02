const { v4: uuid } = require('uuid')
const fs = require('fs')
const path = require('path')

class Products {
    constructor(type, year, img) {
        this.type = type
        this.year = year
        this.img = img
    }

    toObj() {
        return {
            type: this.type,
            year: +this.year,
            img: this.img,
            id: uuid()
        }
    }

    async save() {
        const products = await Products.getAll()
        const product = this.toObj()

        products.push(product)
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'products.json'),
                JSON.stringify({ products }),
                (err) => {
                    if (err) reject(err)
                    else resolve()
                })
        })
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8', (err, content) => {
                if (err) reject(err)
                else resolve(JSON.parse(content).products)
            })
        })
    }

}

module.exports = Products
const invariable = require("./const");
const axios = require("axios");


class authController {
    async search(req, res) {
        const searchQuery = req.body.search;
        const searchURI = encodeURI(searchQuery);
        let bodyPost;

        await axios.get(invariable.BURL + invariable.BURL_BODY_PARTS_1 + searchURI + invariable.BURL_BODY_PARTS_2,
            {
                headers: {'Content-Type': invariable.HEADER_CONTENT_TYPE},
            })
            .then((response) => {
                const products = response.data?.data?.products || [];
                const brandsUnique = new Set();

                products.forEach((product) => {
                    if (product.brand.length) brandsUnique.add(product.brand);
                });
                const brands = Array.from(brandsUnique);

                bodyPost = {searchCurrent: searchQuery, brands};
            })
            .catch((err) => {
                return res.status(400).send(err);
            })
        return res.status(200).send(bodyPost);
    }
}

module.exports = new authController()
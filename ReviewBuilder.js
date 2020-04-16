const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ]).then(([products, reviews, users]) => {
      const parsedProducts = JSON.parse(products);
      const parsedReviews = JSON.parse(reviews);
      const parsedUsers = JSON.parse(users);
      const mappedData = {
        products: parsedProducts,
        reviews: parsedReviews,
        users: parsedUsers,
      };
      return produceResult(mappedData);
    });
  }

  //🍕
  async buildReviewsAsyncAwait() {
    const allData = await Promise.all([
      readFile("./data/products.json"),
      readFile("./data/reviews.json"),
      readFile("./data/users.json"),
    ]).then(([products, reviews, users]) => {
      const parsedProducts = JSON.parse(products);
      const parsedReviews = JSON.parse(reviews);
      const parsedUsers = JSON.parse(users);
      const mappedData = {
        products: parsedProducts,
        reviews: parsedReviews,
        users: parsedUsers,
      };
      return produceResult(mappedData);
    });
    return allData;
  }
}

module.exports = ReviewBuilder;

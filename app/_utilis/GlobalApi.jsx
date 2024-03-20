import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ecomart-admin.onrender.com/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => {
    return res.data.data;
  });
const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => {
    return res.data.data;
  });
const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((res) => {
      return res.data.data;
    });

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addTocart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItem = (userid, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[userid][$eq]=" +
        userid +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartitemList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id,
        product: item.attributes.products?.data[0].id,
      }));
      return cartitemList;
    });

const deleteCartitem = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      "/orders?filters[userId][$eq]=" +
        userId +
        "&populate[orderItemList][populate][product][populate][images]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const response = res.data.data;
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totaOrderAmount,
        paymentId: item.attributes.paymentId,
        orderItemList: item.attributes.orderItemList,
        createdAt: item.attributes.createdAt,
        status: item.attributes.status,
      }));
      return orderList;
    });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addTocart,
  getCartItem,
  deleteCartitem,
  createOrder,
  getMyOrder,
};

import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

function sinusoidalVU(t, A, B, T) {
  return Math.max(0, Math.round(A * Math.sin(((2 * Math.PI) / T) * t) + B));
}

export const options = {
  stages: Array.from({ length: 10 }, (_, i) => ({
    duration: "1m",
    target: sinusoidalVU(i, 25, 50, 10),
  })),
};

// 500, 1000
// 100, 200
// 25, 50

const BASE_URL = "http://localhost:8001";
const PRODUCT_URL = "http://localhost:8003";
const ORDER_URL = "http://localhost:8002";

export default function () {
  let token = null;

  if (Math.random() < 0.1) {
    let loginRes = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({
        username: "Marsupilamieue1",
        password: "Password1",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
    check(loginRes, { "Login success": (r) => r.status === 200 });

    if (loginRes.status === 200) {
      token = JSON.parse(loginRes.body).token;
      console.log(`✅ Login Success!`);
    } else {
      console.log(
        `❌ Login Failed! Status: ${loginRes.status} Response: ${loginRes.body}`
      );
    }
  }

  if (Math.random() < 0.5) {
    http.get(`${PRODUCT_URL}/product/`, authHeaders);
  }

  if (Math.random() < 0.25) {
    let addToCartRes = http.post(
      `${ORDER_URL}/cart/`,
      JSON.stringify({
        product_id: "469bf3ec-3b76-474d-80e3-dee004eaa10b",
        quantity: 1,
      }),
      authHeaders
    );
    check(addToCartRes, { "Added to cart": (r) => r.status === 201 });

    if (addToCartRes.status === 201) {
      console.log(`✅ Add to Cart Success!`);
    } else {
      console.log(
        `❌ Add to Cart Failed! Status: ${addToCartRes.status} Response: ${addToCartRes.body}`
      );
    }
  }

  if (Math.random() < 0.15) {
    let orderRes = http.post(
      `${ORDER_URL}/order/`,
      JSON.stringify({
        shipping_provider: "JNE",
      }),
      authHeaders
    );
    check(orderRes, { "Order placed": (r) => r.status === 201 });

    if (orderRes.status === 201) {
      console.log(`✅ Order Success!`);
    } else {
      console.log(
        `❌ Order Failed! Status: ${orderRes.status} Response: ${orderRes.body}`
      );
    }
  }

  sleep(1);
}

<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <div>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Customers also purchased
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="relative group"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ product.description }}
              </p>
            </div>
            <p class="text-sm font-medium text-gray-900">
              €{{ product.price }}
            </p>
          </div>
          <button
            class="absolute flex w-full justify-center rounded-md bg-emerald-600 mt-4 px-3 py-1.5 text-sm capitalize font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 cursor-pointer"
            @click.prevent="addProduct(product)"
          >
            add to bag
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];
</script> -->

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters, mapMutations } from "vuex";
import service from "@/services/index.js";
import image2 from "@/assets/images/smartphone.jpg";
import image1 from "@/assets/images/S23.jpg";

export default {
  name: "ShopView",
  emits: ["openCart"],
  data: () => {
    return {
      products: [],
      images: [image1, image2],
    };
  },
  mounted() {
    service
      .getAllProducts({
        authorization: this.token,
        url: this.$envVariables.VUE_APP_PRODUCT_API_URL,
      })
      .then((response) => {
        console.log(response.data);
        this.products = response.data;
        this.products.forEach((item, index) => {
          item.imageSrc = this.images[index];
        });
        // const { username, token, error } = response.data;
        // this.setUser(username);
        // this.setToken(token);
        // if (error) {
        //   this.error = error;
        // } else {
        //   this.$router.push("/");
        // }
      });
  },
  methods: {
    ...mapMutations(["addToBag"]),
    addProduct(product) {
      this.addToBag(product);
      this.$emit("openCart");
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
  components: {},
};
</script>

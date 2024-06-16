<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <form>
    <div class="space-y-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        Welcome {{ user }}
      </h2>
      <div>
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Order Tracking</label
        >
        <p class="mt-1 text-sm leading-6 text-gray-600">
          You can track your order
        </p>
        <div class="relative mt-2 rounded-md shadow-sm">
          <!-- <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <span class="text-gray-500 sm:text-sm">$</span>
          </div> -->
          <input
            type="text"
            name="trackingId"
            id="trackingId"
            class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            v-model="trackingId"
          />
          <div
            class="absolute w-32 bg-teal-600 rounded-md inset-y-0 right-0 flex justify-center items-center"
          >
            <button
              class="h-full border-0 bg-transparent py-0 p-2 text-white font-bold focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm"
              @click.prevent="track"
            >
              Track >
            </button>
          </div>
        </div>
        <span class="text-sm text-left text-red-600">
          {{ error?.message }}
        </span>
        <div v-if="order" class="mt-8 p-6 border border-gray-100">
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-7 text-gray-900">
              Order {{ order?._id }}
            </h3>
          </div>
          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Ordered on
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  {{ DateConvertor(order.createdAt) }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Total Price
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  €{{ order.totalPrice }}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Status
                </dt>
                <dd
                  class="mt-1 text-sm leading-6 capitalize text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  {{ order.status }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
// import { PhotoIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
</script>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";
import service from "@/services/index";
export default {
  name: "HomeView",
  data() {
    return {
      trackingId: null,
      order: null,
      error: null,
    };
  },
  components: {
    // HelloWorld,
  },
  methods: {
    track() {
      service
        .trackOrder(
          {
            authorization: this.token,
          },
          {
            trackingId: this.trackingId,
          }
        )
        .then((response) => {
          console.log(response.data);
          const { err } = response.data;
          if (err) {
            this.error = err;
            this.order = null;
          } else {
            this.order = response.data;
            this.error = null;
          }
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
    DateConvertor(date) {
      return date ? date.slice(0, 10) : null;
    },
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
};
</script>

<template>
    <div class="container my-5" >
       <div class="col-8">

       <!-- Membuat Link Navigasi Ke Halaman Index -->
           <router-link :to="{ name: 'categories.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">
           Kembali
           </router-link>

           <div class="card rounded shadow">

               <div class="card-header">
                   Edit Categories
               </div>

               <div class="card-body">

                   <!-- 12.Panggil method update untuk mengirimkan data -->
                   <form @submit.prevent="update()">

                       <div class="mb-3">
                           <label for="" class="form-label">Kategori</label>

                           <!-- 13.aktifkan reactive menggunakan v-model untuk field category -->
                           <input type="text" class="form-control" v-model="categories.category">

                           <!-- 14. cek dulu apakah di dalam validation memiliki object error milik category -->
                           <div v-if="validation.category" class="text-danger">
                               <!-- 14.a Jika ada munculkan ini-->
                               {{ validation.category[0] }}
                           </div>
                       </div>

                       <div class="mb-3">
                           <label for="" class="form-label">Description</label>

                           <!-- 13.aktifkan reactive menggunakan v-model untuk field description -->
                           <input type="text" class="form-control" v-model="categories.description">
                              <!-- 14. cek dulu apakah di dalam validation memiliki object error milik description -->
                              <div v-if="validation.description" class="text-danger">
                               <!-- 14.a Jika ada munculkan ini-->
                               {{ validation.description[0] }}
                           </div>

                       </div>
                       
                       <button class="btn btn-outline-primary">Submit</button>

                   </form>    

               </div>

           </div>
       </div>
   </div>
</template>

<script>
//set up untuk create data
//1.import beberapa package yang diperlukan
   //a.reactive untuk data binding
   //b.ref 
   //c.useRouter
   //d.useRoute
   //e.axios
   //f.onMounted

import { reactive,ref,onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {

    //implementasi menggunakan API Composition
   //3.panggil dlu fungsi setupnya
   setup() {

       //4.buat data binding menggunakan reactive dan pakai let pada tipe datanya
       let categories = reactive({

           //5. Deklarasikan data dari inputan form dan inisialiasi nilainya dengan ''
           category: '',
           description: '',

       })

       //5.buat validation yang menampung data array dari error messsage yang dimiliki dari masing2 inputan
       const validation = ref([]);

       //6.buat router yang digunakan untuk redirect ke halaman index nantinya jika telah selesai melakukan store data
       const router = useRouter();

       //7.Penting untuk edit data tambahkan route lalu useRoutenya
       //route ini digunakan untuk mendapatkan data yang ada di dalam parameter url dengan lebih mudah
       const route = useRoute();

       //8.Gunakan Hook onMounted dan jangan lupa diregitrasi di komponen import yang diatas
       onMounted(() => {

            //9.Get dulu datanya menggunakan axios.get dan gunakan backtick lalu tambahkan dollarsign lalu kurung kurawal lalu gunakan route untuk mendapatkan parameter id menggunakan params.id
            axios.get(`http://127.0.0.1:8000/api/categories/${route.params.id}`)

            //10.a lalu tampilkan hasil getdatanya
            .then((result) => {
                //10.a panggil result hasilnya 
                categories.category = result.data.data.category
                categories.description = result.data.data.description
            })
            .catch((err) => {
                //11.b jika gagal munculkan ini
                console.log(err.response.data)
            })

       })

       //12.buat function untuk update data yang kita inputkan dari form
       function update(){

           //13.inisiasi dlu endpoint apinya dan object data yang akan kita kirimkan ke api di dalam kasus ini yaitu categories,dan gunakan method put. lalu copy paste saja endpoint getdata update diatas
           axios.put(
               `http://127.0.0.1:8000/api/categories/${route.params.id}`,
               categories
           )

           //14.buatkan kondisi ketika data success atau gagal divalidasi
           //15.a ketika berhasil divalidasi
           .then(() =>{
               //16.a ketika berhasil mengirimkan data maka setup redirect ke halaman index
               router.push({
                   name: 'categories.index'
               });
           })

           //15.b ketika gagal divalidasi
           .catch((err) => {
               //16.b ketika gagal akan menampilkan pesan validasi milik respon err
               validation.value = err.response.data
           });

       }

       //17. lalu return data agar variabel dan method store bisa kita gunakan
       return {
           categories,
           validation,
           router,
           update //method update yang akan kita gunakan nanti
       }
   }
}

</script>
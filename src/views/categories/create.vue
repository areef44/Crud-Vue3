<template>
     <div class="container my-5" >
        <div class="col-8">

        <!-- Membuat Link Navigasi Ke Halaman Index -->
            <router-link :to="{ name: 'categories.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">
            Kembali
            </router-link>

            <div class="card rounded shadow">

                <div class="card-header">
                    Buat Kategori Baru
                </div>

                <div class="card-body">

                    <!-- 12.Panggil method store untuk mengirimkan data -->
                    <form @submit.prevent="store()">

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
    //d.axios

import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

     //implementasi menggunakan API Composition
    //3.panggil dlu fungsi setupnya
    setup() {

        //4.buat data binding menggunakan reactive
        const categories = reactive({

            //5. Deklarasikan data dari inputan form dan inisialiasi nilainya dengan ''
            category: '',
            description: '',

        })

        //5.buat validation yang menampung data array dari error messsage yang dimiliki dari masing2 inputan
        const validation = ref([]);

        //6.buat router yang digunakan untuk redirect ke halaman index nantinya jika telah selesai melakukan store data
        const router = useRouter();

        //7.buat function untuk store data yang kita inputkan dari form
        function store(){

            //8.inisiasi dlu endpoint apinya dan object data yang akan kita kirimkan ke api di dalam kasus ini yaitu categories
            axios.post(
                'http://127.0.0.1:8000/api/categories/',
                categories
            )

            //9.buatkan kondisi ketika data success atau gagal divalidasi
            //9.a ketika berhasil divalidasi
            .then(() =>{
                //10.a ketika berhasil mengirimkan data maka setup redirect ke halaman index
                router.push({
                    name: 'categories.index'
                });
            })

            //9.b ketika gagal divalidasi
            .catch((err) => {
                //10.b ketika gagal akan menampilkan pesan validasi milik respon err
                validation.value = err.response.data
            });

        }

        //11. lalu return data agar variabel dan method store bisa kita gunakan
        return {
            categories,
            validation,
            router,
            store //method store yang akan kita gunakan nanti
        }
    }
}

</script>
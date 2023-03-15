<template>
    <div class="container my-5" >
        <div class="col-8">
            <router-link :to="{ name: 'categories.create' }" class="btn btn-primary btn-sm rounded shadow mb-3">
            Add
            </router-link>

            <div class="card rounded shadow">
                <div class="card-header">
                    Categories List
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kategori</th>
                                <th>Deskripsi</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- 10.Memanggil Data Yang Di fetch menggunakan v-for dan kenapa menggunakan categories.data karena data itu merupakan object di dalam response milik api endpoint dan isikan juga directive menggunakan :key dari masing2 identitas dan diberi nama index saja-->
                            <tr v-for="(category, index ) in categories.data " :key="index">
                                <td>{{ index+1 }}</td>
                                <!-- panggil menggunakan {{  }} -->
                                <td>{{ category.category }}</td>
                                <td>{{ category.description }}</td>
                                <td>
                                    <div class="btn-group">

                                        <!-- Tambahkan di bagian params id: category.id untuk menuju ke halaman edit nantinya -->
                                        <router-link :to="{ name: 'categories.edit', params:{id: category.id} }" class="btn btn-sm btn-outline-info">
                                            Edit
                                        </router-link>
                                    
                                    <!-- Membuat Fungsi Delete di Halaman index -->
                                    <!-- 1.tambahkan event prevent click di button delete lalu kirimkan parameter data yang dihapus, lalu kirimkan juga key yang ada didalam tr didalam kasus ini namanya index-->
                                    </div>
                                    <button class="btn btn-sm btn-outline-danger" @click.prevent="destroy(category.id, index)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>           
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//langkah-langkah fetch api menggunakan axios di vue
//1. import dlu axiosnya
import axios from 'axios'

//2.import ounmounted dan juga ref
import { onMounted, ref } from 'vue';


export default {
    //implementasi menggunakan API Composition
    //3.panggil dlu fungsi setupnya

    setup() {

        //4. tampung dalam sebuah di dalam wadah array dalam kasus ini namanya penampungnya categories(disebut reactive state)
        let categories = ref([]);

        //5.Panggil onMounted()
        onMounted(() => {

            //6. get data dari api endpointnya menggunakan axios
            axios.get('http://127.0.0.1:8000/api/categories/')

            //7.tambah event jika berhasil atau error
            .then((result) => {

                //7.1 Akan Tampil Data Jika Berhasil
                categories.value = result.data

            }).catch((err) => {
                //7.2 Akan Tampil error jika Gagal
                console.log(err.response)

            });
        });


        /**
         * Important 
         * ini function untuk delete data categories
         * kirimkan id dan index yang sudah diinisiasi diatas
         */
        function destroy(id, index){
            /**
             * method gunakan delete dan di dollarsign cukup gunakan id saja tanpa menggunakan route.params.id
             */
            axios.delete(
               `http://127.0.0.1:8000/api/categories/${id}`
           )
           .then(() =>{
            /**
             * jika data berhasil di dapatkan lalu gunakan fungsi splice
             */
             categories.value.data.splice(index, 1)
           })
           .catch((err) => {
            /**
             * jika gagal yang tejadi
             */
               console.log(err.response.data);
           });
        }


        //8.Lalu Masukan Ke dalam Return 
        return {

            //9.Panggil lagi Penampungnya tadi dalam kasus ini categories
            categories,
            /**
             * panggil method destroy untuk melakukan fungsi delete
             */
            destroy

        }
    }
}

</script>
document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name: 'Robusta Brazil',     img: '1.jpg', price: 20000},
            {id: 2, name: 'Arabica Blend',      img: '2.jpg', price: 30000},
            {id: 3, name: 'Primo Pasco',        img: '3.jpg', price: 25000},
            {id: 4, name: 'Aceh Gayo',          img: '4.jpg', price: 19000},
            {id: 5, name: 'Cause Coffe',        img: '5.jpg', price: 15000},
            {id: 6, name: 'Sumatra Mandheling', img: '6.jpg', price: 24000},
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total:0,
        quantity:0,
        add(newItem) {
            // apakah ada barang yang sama
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum/ cart kosong 
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada, cek apakah barang beda atau sma dengan yang ada dicart
                this.items = this.items.map((item) => {
                    // jika barang berbeda 
                    if (item.id !== newItem.id) {
                        return item;
                    }else {
                        // jika barang sudah ada, tambah quantity dan total nya 
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // ambil item yang mau diremove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);
            
            // jika item lebih dri 1
            if(cartItem.quantity > 1){
                // TELUSURI 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                // jika barang sisa 1
                this.items = this.items.filter((item) => item.id !==id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

// konversi ke rp
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
} 
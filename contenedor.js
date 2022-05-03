const fs = require('fs');  
class contenedor{
    constructor(FsProductos,FsCarritos){
        this.idP = 0 ;
        this.idC = 0 ;
        this.productos= [];
        this.carritos=[];
        this.FsProductos = FsProductos;
        this.FsCarritos = FsCarritos;

    }
    
newProducto(obj){
        try{
       this.idP ++ ;
       obj.id = this.idP;
       obj.timestamp = Date.now().toLocaleString();
       this.productos.push(obj);
       fs.writeFileSync(this.FsProductos,JSON.stringify(this.productos))
        }
         catch{
             console.log('error al leer el archivo')
         }
            
    }
    newCarrito(){
        try{
        let carr ={} ; 
       this.idC ++ ;
       carr.id = this.idC;
       carr.timestamp = Date.now().toLocaleString();
       carr.productos= []
       this.carritos.push(carr);
       fs.writeFileSync(this.FsCarritos,JSON.stringify(this.carritos))
       return carr.id;
        }
         catch{
             console.log('error al leer el archivo')
         }
            
    }

AddProductoCarrito(idC,idP){
    try{
        let prod= getProdByiD(idP);
        let carr= getCarrByiD(idC);
    }
        catch{
            console.log('El producto no existe')
        }
    carr.productos.push(prod);
    fs.writeFileSync(this.FsCarritos,JSON.stringify(this.carritos))
}

    getProductos(){
        return this.productos;
    }
    getCarritos(){
        return this.carritos;
    }

    getProdByiD(id){
        try {
         return  this.productos.find(producto => id == producto.id);
        } catch (error) {
            console.log(error);
            return null;
        }
}
getCarrByiD(id){
    try {
     return this.carritos.find(carrito => carrito.id == id);
    } catch (error) {
        console.log(error);
        return null;
    }
}

getProdCarrByiD(id){
    try {
     let found =  this.carritos.find(carr => id == carr.id);
     return found.productos;
    } catch (error) {
        console.log(error);
        return null;
    }
}


deleteProdById(id){
    let i  =this.productos.indexOf(this.getProdByiD(id));
     this.productos.splice(i,1);
       fs.writeFileSync(this.FsProductos,JSON.stringify(this.productos))
       }

deleteCarrById(id){
        let i  =this.carritos.indexOf(this.getCarrByiD(id));
         this.carritos.splice(i,1);
           fs.writeFileSync(this.FsCarritos,JSON.stringify(this.carritos));
           }
       
AddProdCarrito(id,obj){     
    try {
        //let obj = this.getProdByiD(idP);
       let  indice= this.carritos.findIndex(carr=>carr.id==id);
          this.carritos[indice].productos.push(obj);
           fs.writeFileSync(this.FsCarritos,JSON.stringify(this.carritos));
           } catch (error) {
               console.log(error);
               return null;
           }   
    }

editCarrById(id,obj){
           
        try {
        obj.id=id;
       let  indice= this.carritos.findIndex(obj=>obj.id==id);
          this.carritos[indice]=obj;
           fs.writeFileSync(this.FsCarritos,JSON.stringify(this.carritos))
           } catch (error) {
               console.log(error);
               return null;
           }   
    }

deleteProdCarrito(idC,idP){
    let  indiceC= this.carritos.findIndex(carr=>carr.id==idC);
    let indIceP = this.carritos[indiceC].productos.findIndex(prod=>prod.id==idP);
    this.carritos[indice].productos.splice(indiceP,1);
    fs.writeFileSync(this.FsCarritos,JSON.stringify(this.carritos));
}

}

module.exports ={contenedor};
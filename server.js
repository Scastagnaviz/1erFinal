const express = require ('express');
const conten1 = require('./contenedor')
const  PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

const {Router} = express;
const routerP= Router();
const routerC= Router();
app.use('/api/productos', routerP);
app.use('/api/carrito', routerC);
const fs = require('fs');  

let administrador = true;


let conten = new conten1.contenedor('./productos.json','./carritos.json');

routerP.get('/',(req,res)=>{
    productos= conten.getProductos()
    res.json({
        result: 'Productos:', 
        Productos:productos})

 });

 routerP.get('/:id',(req,res)=> {
    let id= req.params.id;
    if (administrador ==true) {
        if (conten.getProdByiD(id)==null) {
            res.json({
                error : 'Producto no encontrado'})
              
        } else {
            let found = conten.getProdByiD(id);
            res.json({
                result: 'Este es el producto', 
                Producto : found})
        } 
    } else {
        res.json({
            error: '-1', 
            ruta: 'acceso no autorizado'})
    }
 
  
});
routerP.post('/',(req,res)=>{
    if (administrador ==true) {
        let obj= req.body;
        console.log(obj);
        conten.newProducto(obj);
        res.json({ 
            result : 'Producto guardado',
            body:req.body,
                });
}   else {
    res.json({
        error: '-1', 
        ruta: 'acceso no autorizado'})
}
});

routerP.put('/:id',(req,res)=>{
    if (administrador ==true) {
        let id= req.params.id; 
        conten.editProdById(id,req.body);
        res.json({
            body:req.body,
            result:'Edit exitoso',
            d : req.params.id
    })
}   else {
    res.json({
        error: '-1', 
        ruta: 'acceso no autorizado'})
}
});

routerP.delete('/:id',(req,res)=>{
    if (administrador ==true) {
        let id= req.params.id; 
        conten.deleteProdById(id);
        res.json({
              result:'Producto eliminado',
             id : req.params.id,
       })
    }   else {
        res.json({
            error: '-1', 
            ruta: 'acceso no autorizado'})
    }
   });



routerC.post('/',(req,res)=>{

    conten.newCarrito();
    res.json({ 
        result : 'Carrito guardado',
        carrito : req.body.id
});
});

routerC.delete('/:id',(req,res)=>{
    let id= req.params.id; 
  conten.deleteCarrById(id);
   res.json({
       result:'Carrito eliminado',
       id : req.params.id,
       })
   });


routerC.get('/:id/productos',(req,res)=> {
    let id= req.params.id;
    if (conten.getProdCarrByiD(id)==null) {
        res.json({
            error : 'Carrito no encontrado'})
          
    } else {
        let found = conten.getProdCarrByiD(id);
        res.json({
            result: 'Estos son los productos del carrito', 
            Producto : found})
    } 
  
});

routerC.post('/:id/productos',(req,res)=>{
    let id= req.params.id; 
    if (conten.getCarrByiD(id)==null) {
        res.json({
            error : 'Carrito no encontrado'})}
        else{
            conten.AddProdCarrito(id,req.body)
            res.json({
                result: 'Producto agregado', 
                Producto : req.body})
        }
});

routerC.delete('/:id/productos/:id_prod',(req,res)=>{
    let idC= req.params.id; 
    let idP= req.params.id_prod; 
    if (conten.getCarrByiD(id)==null) {
        res.json({
            error : 'Carrito no encontrado'})}
        else{
          conten.deleteProdCarrito(idC,idP);
            res.json({
                result: 'Producto eliminado del carrito', 
                Producto : req.body})
        }
});










const server  = app.listen(PORT, () =>  {
    console.log( `Servidor Http escuchando  en el puerto ${PORT}`);
     }) ;
    
     server.on("error", error => console.log(`error en el servidor ${error}`));


   
     //conten.newProducto({ "timestamp":Date.now().toLocaleString(),"nombre": 'Heladera',"descripcion":"descripcion 1","codigo":5489  ,"foto": 'url1',"precio": 123,"stock":105});
    // conten.newCarrito({"timestamp":Date.now().toLocaleString(),"productos":(conten.getProductos())});   
     // conten.newProducto({"nombre": 'Microondas' ,"precio": 443 ,"url": 'url2'});
     //conten.newProducto({"nombre": 'Cafetera' ,"precio": 1616 ,"url": 'url3'});
     //conten.newProducto({"nombre": 'Arrocera' ,"precio": 2204 ,"url": 'url4'});
     

    
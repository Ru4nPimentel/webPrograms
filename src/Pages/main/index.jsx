import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api.jsx';
import './style.css';

export default class Main extends Component{

    state = {
        products: [],
        productInfo: {},
        page: 1,

    }//por causa da class

    componentDidMount(){
        this.loadProducts();
    } //componentDidMount metodo executado assim que o componente e exibido

    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;        
        this.setState({ products: docs,  productInfo, page});
        console.log(this.state);
    } // e assim que cria função no react, e async


    nextPage = () =>{
        const {page, productInfo} = this.state;

        if(page === productInfo.page) return;
        const pageNumber = page +1;

        this.loadProducts(pageNumber);
    }

    prevPage = () =>{
        const {page, productInfo} = this.state;

        if(page === 1 ) return;
        const pageNumber = page -1;

        this.loadProducts(pageNumber);
    }

    render(){

        const {products,page, productInfo} = this.state;
        // this.state.products
        
        return (
            <div className="pgMain">
                 <h1>Contagem de Itens {this.state.products.length}</h1>
                 <div className="product-list">
                     {products.map(produto => {
                         return (
                            <article key={produto._id} >
                                <strong> {produto.title} </strong>
                                <p>{produto.description}</p>

                                <Link to={`products/${produto._id}`}>Acessar</Link>
                            </article>
                         )
                     })}
                     <div className="actions">
                         <button disabled={page === 1} onClick={this.prevPage}>
                             Anterior
                         </button>
                         <button  disabled={page === productInfo.pages} onClick={this.nextPage}>
                             Proximo
                         </button>
                     </div>
                 </div>
            </div>       
        );
    }
}
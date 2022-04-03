import React from "react";
import { connect, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import './App.css'
import { Template } from './components/MainComponents'
import Header from './components/partials/Header'
import Footer from "./components/partials/Footer";
import { RootState } from "./Reducers";


const Page = (props: any) => {
  return (
    <BrowserRouter>
    <Template>
      <Header />

      <Routes />

      <Footer />
    </Template>
      
    </BrowserRouter>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
import { useState } from 'react';
import TopBar from '../components/topBar';
import RegisterSale from '../components/registerSale';
import CustomerSearch from '../components/customerSearch';
import CustomerList from '../components/customerList';
import Sales from '../components/Sales';
import SalesReport from '../components/SalesReport';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#06070a]">
      <TopBar />
      <CustomerList />
      <CustomerSearch />
      <RegisterSale />
      <SalesReport/>
      <Sales/>
    </div>
  )
}
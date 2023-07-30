import React from 'react';
import './BankSystemInterface.css'; // Import the CSS file
import CreateBankAccountModal from './CreateBankModal';
import DepositToBankModal from './DepositToBankModal';
import BankListModal from './BankListModal';

function BankSystemInterface() {
  return (
    <div className="bank-system-container">
      <div className="bank-system-header">
        <h1>Welcome to Our Bank</h1>
        <p className="bank-system-subtitle">A Secure and Modern Banking Experience</p>
      </div>
      <div className="bank-system-content">
        <p className="bank-system-description">
          Enjoy the convenience of managing your finances with Our Bank. Open an account today and experience the
          seamless banking services we offer.
        </p>
        <div className="bank-system-button-group">
        <button className="bank-system-button deposit-button"><CreateBankAccountModal /></button>
          <button className="bank-system-button deposit-button"><DepositToBankModal /></button>
          <button className="bank-system-button balance-button"><BankListModal/></button>
        </div>
      </div>
    </div>
  );
}

export default BankSystemInterface;

import React from "react";
import { SelectCurrencyContainer } from "currency/containers/SelectCurrencyContainer";
import { CurrencyInputContainer } from "currency/containers/CurrencyInputContainer";
import { PocketContainer } from "pockets/PocketContainer";

export const ExchangeInput = ({ currencyFieldType }) => {
  return (
    <div className="currency">
      <div className="currency-row__item currency-row__item--left">
        <div className="currency__select">
          <SelectCurrencyContainer currencyFieldType={currencyFieldType} />
          <PocketContainer currencyFieldType={currencyFieldType} />
        </div>
      </div>
      <div className="currency-row__item">
        <div className="currency__input-amount">
          <CurrencyInputContainer currencyFieldType={currencyFieldType} />
        </div>
      </div>
    </div>
  );
};

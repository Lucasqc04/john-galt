import { LogoAlfred } from '@/view/components/LogoAlfred';
import classNames from 'classnames';
import { t } from 'i18next';
import { QRCodeSVG } from 'qrcode.react';
import { ChangeEvent } from 'react';
import Alfred from '../../assets/AlfredComercial.png';
import AlfredImg from '../../assets/c1b28810-5a23-4e7c-bcce-bd1f42b271c5.png';
import { Loader } from '../../components/Loader';
import { ROUTES } from '../../routes/Routes';
import { useCheckout } from './useChekout';

export default function Checkout() {
  const {
    network,
    timeLeft,
    coldWallet,
    transactionNumber,
    cupom,
    isDropdownOpen,
    pixKey,
    isLoading,
    errors,
    brlAmount,
    btcAmount,
    acceptFees,
    acceptTerms,
    networks,
    currentLang,
    confirmDate,
    toggleDropdown,
    selectNetwork,
    handleProcessPayment,
    copyToClipboard,
    checkCouponValidity,
    setColdWallet,
    setAcceptTerms,
    setAcceptFees,
    setCupom,
    setTransactionNumber,
    verifyPaymentStatus,
    setconfirmDate,
  } = useCheckout();

  return (
    <div className="mb-10">
      <div className="pt-[10%] pb-[10%] lg:pt-8 lg:pb-8 flex items-center justify-center mt-[20%] sm:mt-[10%]">
        <LogoAlfred />
      </div>
      <div className="flex justify-center">
        <div>
          <p className="text-xl text-center text-black dark:text-white">
            {t('buycheckout.value')}: {brlAmount} BRL
            <br /> {t('buycheckout.valueBTC')}: {btcAmount} BTC
          </p>

          {pixKey ? (
            <div className="flex flex-col items-center pt-4">
              <p className="text-center text-red-600">
                {t('buycheckout.timeRemaining')}: {Math.floor(timeLeft / 60)}:
                {timeLeft % 60 < 10 ? '0' : ''}
                {timeLeft % 60} {t('buycheckout.minutes')}
              </p>

              <p className="text-xl text-center text-black dark:text-white mb-4">
                {t('buycheckout.scanQRCode')}
              </p>

              <QRCodeSVG value={pixKey} size={256} />

              <textarea
                value={pixKey}
                readOnly
                className="border px-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-[#B9B8B8] w-full mt-4"
                rows={6}
              />

              <button
                onClick={copyToClipboard}
                className="mt-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold"
              >
                {t('buycheckout.copyPixKey')}
              </button>
              <button
                onClick={() => verifyPaymentStatus(transactionNumber)}
                className="mt-4 px-6 py-3 bg-green-500 text-white rounded-3xl font-bold"
              >
                Efetuei o pagamento
              </button>

              <div className="hidden sm:block absolute right-[20%] top-[30%] transform translate-x-1/2 translate-y-1/2 w-[50%]">
                <img src={Alfred} alt="" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center relative px-4 mb-28">
              <div className="w-full max-w-lg">
                <div className="flex justify-center items-center space-x-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={network}
                      readOnly
                      placeholder={t('buycheckout.selectNetwork')}
                      className="border pl-16 pr-16 py-3 rounded-3xl text-base sm:text-lg text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] text-center w-full"
                      onClick={toggleDropdown}
                    />
                    <button
                      onClick={toggleDropdown}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                    >
                      {networks.find((net) => net.name === network)?.icon && (
                        <img
                          src={
                            networks.find((net) => net.name === network)?.icon
                          }
                          alt={network}
                          className="w-8 h-8 sm:w-10 sm:h-10"
                        />
                      )}
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <ul>
                          {networks.map((net) => (
                            <li
                              key={net.name}
                              onClick={() => selectNetwork(net.name)}
                              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {net.name}
                              <img
                                src={net.icon}
                                alt={net.name}
                                className="w-8 h-8 ml-2 sm:w-10 sm:h-10"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method Dropdown */}
                {/* <div className="flex justify-center items-center pt-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={paymentMethod}
                      readOnly
                      placeholder={t('buycheckout.selectPaymentMethod')}
                      className="border pl-16 pr-16 py-3 rounded-3xl text-base sm:text-lg dark:text-white text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] cursor-pointer w-full"
                      onClick={toggleDropdownMethod}
                    />
                    <button
                      onClick={toggleDropdownMethod}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
                    >
                      {paymentMethod === 'PIX' ? (
                        <FaPix className="w-8 h-8 sm:w-10 sm:h-10" />
                      ) : paymentMethod === 'Cartão de Crédito' ? (
                        <CiCreditCard1 className="w-8 h-8 sm:w-10 sm:h-10" />
                      ) : (
                        <FaBarcode className="w-8 h-8 sm:w-10 sm:h-10" />
                      )}
                    </button>
                    {isDropdownOpenMethod && (
                      <div className="absolute z-50 right-0 top-full mt-2 w-full sm:w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <ul>
                          <li
                            onClick={() => selectPaymentMethod('PIX')}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            PIX
                            <FaPix className="w-8 h-8 sm:w-10 sm:h-10" />
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div> */}

                <div className="flex justify-center items-center pt-4">
                  <div className="relative w-full">
                    <input
                      value={coldWallet}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setColdWallet(e.target.value)
                      }
                      placeholder={t('buycheckout.bitcoinWallet')}
                      className="border pl-4 pr-6 py-3 rounded-3xl text-base sm:text-lg text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] text-center w-full"
                    />
                    {errors.coldWallet && (
                      <p className="text-red-500 text-sm">
                        {errors.coldWallet}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center items-center pt-4">
                  <div className="relative w-full">
                    <input
                      value={transactionNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionNumber(e.target.value)
                      }
                      placeholder={t('buycheckout.contactNumber')}
                      className="border pl-4 pr-6 py-3 rounded-3xl text-base sm:text-lg text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] text-center w-full"
                    />
                    {errors.transactionNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.transactionNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                    placeholder={t('buycheckout.couponPlaceholder')}
                    className="border px-4 py-3 rounded-3xl text-lg text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] w-full"
                  />
                  <button
                    onClick={checkCouponValidity}
                    className="ml-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold"
                  >
                    {t('buycheckout.apply')}
                  </button>
                </div>

                <div className="flex flex-col justify-center items-start pt-4">
                  <label className="flex items-center dark:text-white">
                    <input
                      type="checkbox"
                      checked={acceptFees}
                      onChange={() => setAcceptFees(!acceptFees)}
                      className="mr-2"
                    />
                    <span
                      onClick={() =>
                        window.open(
                          ROUTES.fee.call(currentLang),
                          '_blank',
                          'noopener,noreferrer',
                        )
                      }
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {t('buycheckout.acceptFees')}
                    </span>
                  </label>
                  <label className="flex items-center dark:text-white">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                      className="mr-2"
                    />
                    <span
                      onClick={() =>
                        window.open(
                          ROUTES.term.call(currentLang),
                          '_blank',
                          'noopener,noreferrer',
                        )
                      }
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {t('buycheckout.acceptTerms')}
                    </span>
                  </label>
                  <label className="flex items-center dark:text-white">
                    <input
                      type="checkbox"
                      checked={confirmDate}
                      onChange={() => setconfirmDate(!confirmDate)}
                      className="mr-2"
                    />
                    <span className="cursor-pointer text-blue-500 hover:underline">
                      {t('buycheckout.confirmDate')}
                    </span>
                  </label>
                </div>

                <div className="flex justify-center items-center pt-4">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <button
                      onClick={handleProcessPayment}
                      type="button"
                      disabled={!acceptFees || !acceptTerms}
                      className={classNames(
                        'w-full h-12 sm:h-14 bg-[#F39200] text-black dark:text-white rounded-3xl font-bold text-sm sm:text-base mb-4',
                        (!acceptFees || !acceptTerms) && 'opacity-50',
                      )}
                    >
                      {t('buycheckout.getPixKey')}
                    </button>
                  )}
                </div>
              </div>

              <div className=" hidden sm:block absolute right-[-20%] top-[-10%] transform translate-x-1/2 translate-y-1/2 w-[50%]">
                <img src={AlfredImg} alt="imagem-alfred" className="" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

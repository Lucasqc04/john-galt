import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import { Loader } from '@/view/components/Loader';
import classNames from 'classnames';
import { t } from 'i18next';
import { ChangeEvent, useState } from 'react';
import { FaPix } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import BoletoIcon from '../../../assets/BoletoIcon.png';
import AlfredImg from '../../../assets/c1b28810-5a23-4e7c-bcce-bd1f42b271c5.png';
import WiseIcon from '../../../assets/wiseIcon.png';
import { ROUTES } from '../../../routes/Routes';
import ConfirmInfosModal from '../modal/ConfirmInfos';
import { useDataForm } from './useDataForm';

export default function DataForm() {
  const {
    network,
    coldWallet,
    transactionNumber,
    cupom,
    isDropdownOpen,
    isLoading,
    errors,
    brlAmount,
    cryptoAmount,
    cryptoType,
    acceptFees,
    acceptTerms,
    networks,
    currentLang,
    paymentMethod,
    isDropdownOpenMethod,
    alfredFeePercentage,
    selectPaymentMethod,
    toggleDropdownMethod,
    toggleDropdown,
    selectNetwork,
    handleProcessPayment,
    checkCouponValidity,
    setColdWallet,
    setAcceptTerms,
    setAcceptFees,
    setCupom,
    setTransactionNumber,
    validateFields,
  } = useDataForm();

  const paymentMethodLabels = {
    PIX: t('buycheckout.paymentMethod.PIX'),
    WISE: t('buycheckout.paymentMethod.WISE'),
    TICKET: t('buycheckout.paymentMethod.TICKET'),
  };
  // Converte brlAmount para número (removendo caracteres não numéricos)
  const numericBRL = parseInt(brlAmount.replace(/\D/g, ''), 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  const is100k =
    parseInt(
      localStorage.getItem('brlAmount')?.replace(/\D/g, '') || '0',
      10,
    ) === 100000;

  const handleApplyCoupon = async () => {
    await checkCouponValidity();
    if (!errors.cupom) {
      setCupom(cupom.toUpperCase());
      setCouponApplied(true);
    }
  };

  const handleOpenModal = async () => {
    if (cupom.trim() && !couponApplied) {
      toast.error(t('buycheckout.applyCouponFirst'));
      return;
    }

    if (!validateFields()) {
      toast.error(t('buycheckout.missingFields'));
      return;
    }

    if (is100k) {
      handleProcessPayment();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <main className="flex flex-col justify-center items-center gap-y- pt-12 sm:pt-24">
        <img src={AlfredWhiteLogo} alt="Alfred Logo" className="w-64 sm:w-96" />
        <section className="flex flex-col justify-center items-center gap-y-4 pt-4">
          <p className="text-lg sm:text-xl text-center text-white">
            {t('buycheckout.value')}: {brlAmount} BRL
            <br /> {t('buycheckout.valueCrypto')}: {cryptoAmount}{' '}
            {cryptoType.toUpperCase()}
          </p>

          <div className="flex justify-center items-center relative px-4">
            <div className="w-full max-w-2xl">
              <div className="flex justify-center items-center relative w-full">
                <input
                  type="text"
                  value={network}
                  readOnly
                  placeholder={t('buycheckout.selectNetwork')}
                  onClick={toggleDropdown}
                  className="border-2 px-8 py-3 rounded-3xl text-base bg-black sm:text-lg text-white placeholder-white text-center w-full"
                />
                <button
                  onClick={toggleDropdown}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                >
                  {networks.find((net) => net.name === network)?.icon && (
                    <img
                      src={networks.find((net) => net.name === network)?.icon}
                      alt={network}
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 transition-all duration-300 ease-out transform scale-100 opacity-100">
                    <ul className="w-full">
                      {networks.map((net) => {
                        const isOnchainDisabled =
                          net.name.toLowerCase() === 'onchain' &&
                          numericBRL >= 200 &&
                          numericBRL < 700;
                        return (
                          <li
                            key={net.name}
                            onClick={() => {
                              if (isOnchainDisabled) {
                                toast.info(
                                  t('checkout.wallet_error_below_700'),
                                );
                              } else {
                                selectNetwork(net.name);
                              }
                            }}
                            className={`flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white ${
                              isOnchainDisabled
                                ? 'opacity-50'
                                : 'hover:bg-gray-800'
                            }`}
                          >
                            <span className="w-full text-center">
                              {net.name}
                            </span>
                            <img
                              src={net.icon}
                              alt={net.name}
                              className="w-6 h-6 mt-1"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center relative w-full pt-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={
                      paymentMethod ? paymentMethodLabels[paymentMethod] : ''
                    }
                    readOnly
                    placeholder={t('buycheckout.selectPaymentMethod')}
                    className="border-2 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                    onClick={toggleDropdownMethod}
                  />
                  <button
                    onClick={toggleDropdownMethod}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
                  >
                    {paymentMethod === 'PIX' ? (
                      <FaPix className="w-8 h-8 sm:w-10 sm:h-10" />
                    ) : paymentMethod === 'WISE' ? (
                      <img
                        src={WiseIcon}
                        alt="Wise"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                    ) : paymentMethod === 'TICKET' ? (
                      <img
                        src={BoletoIcon}
                        alt="Boleto Bancário"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                    ) : null}
                  </button>
                  {isDropdownOpenMethod && (
                    <div className="absolute left-0 top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 transition-all duration-300 ease-out transform scale-100 opacity-100">
                      <ul className="w-full">
                        <li
                          onClick={() => {
                            // Permite PIX se o valor for 100.000, senão aplica a regra normal (>5000)
                            if (numericBRL > 5000 && numericBRL !== 100000) {
                              toast.warning(
                                t('checkout.payment_error_above_5000'),
                              );
                              return;
                            }
                            selectPaymentMethod('PIX');
                          }}
                          className={`flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white ${
                            numericBRL > 5000 && numericBRL !== 100000
                              ? 'opacity-50'
                              : 'hover:bg-gray-800'
                          }`}
                        >
                          <span className="w-full text-center">PIX</span>
                          <FaPix className="w-6 h-6 mt-1" />
                        </li>

                        <li
                          onClick={() => selectPaymentMethod('WISE')}
                          className="flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white hover:bg-gray-800"
                        >
                          <span className="w-full text-center">Wise</span>
                          <img
                            src={WiseIcon}
                            alt="Wise"
                            className="w-6 h-6 mt-1 rounded-full"
                          />
                        </li>
                        <li
                          onClick={() => selectPaymentMethod('TICKET')}
                          className="flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white hover:bg-gray-800"
                        >
                          <span className="w-full text-center">
                            Boleto Bancário
                          </span>
                          <img
                            src={BoletoIcon}
                            alt="Boleto Bancário"
                            className="w-6 h-6 mt-1 rounded-full"
                          />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center pt-4">
                <div className="relative w-full">
                  <input
                    value={coldWallet}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setColdWallet(e.target.value)
                    }
                    placeholder={t('buycheckout.bitcoinWallet')}
                    className="border-2 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                  />
                  {errors.coldWallet && (
                    <p className="text-red-500 text-sm">{errors.coldWallet}</p>
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
                    className="border-2 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
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
                  onChange={(e) => {
                    setCupom(e.target.value);
                    setCouponApplied(false);
                  }}
                  placeholder={t('buycheckout.couponPlaceholder')}
                  className="border-2 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="ml-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold"
                >
                  {t('buycheckout.apply')}
                </button>
              </div>
              <div className="flex flex-col justify-center items-start pt-4">
                <label className="flex items-center text-white">
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
                    className="text-xs sm:text-base cursor-pointer text-blue-500 hover:underline"
                  >
                    {t('buycheckout.acceptFees')}
                  </span>
                </label>
                <label className="flex items-center text-white">
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
                    className="text-xs sm:text-base cursor-pointer text-blue-500 hover:underline"
                  >
                    {t('buycheckout.acceptTerms')}
                  </span>
                </label>
              </div>
              <div className="flex justify-center items-center pt-4">
                <button
                  onClick={handleOpenModal}
                  type="button"
                  disabled={!acceptFees || !acceptTerms}
                  className={classNames(
                    'w-full h-12 sm:h-14 bg-[#F39200] text-white rounded-3xl font-bold text-sm sm:text-base mb-[10%]',
                    (!acceptFees || !acceptTerms) && 'opacity-50',
                  )}
                >
                  {t('buycheckout.getPixKey')}
                </button>
              </div>
            </div>

            <div className="hidden sm:block absolute right-[-25%] top-[-20%] transform translate-x-1/2 translate-y-1/2 w-[50%]">
              <img src={AlfredImg} alt="Alfred" />
            </div>
          </div>

          {!is100k && (
            <ConfirmInfosModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={() => {
                closeModal();
                handleProcessPayment();
              }}
              brlAmount={brlAmount || ''}
              cryptoAmount={cryptoAmount || ''}
              network={network || ''}
              coldWallet={coldWallet || ''}
              paymentMethod={paymentMethod || ''}
              transactionNumber={transactionNumber || ''}
              cupom={cupom || ''}
              alfredFeePercentage={alfredFeePercentage}
              cryptoType={cryptoType || ''}
            />
          )}
        </section>
      </main>
    </>
  );
}

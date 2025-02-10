import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { Loader } from '@/view/components/Loader';
import classNames from 'classnames';
import { t } from 'i18next';
import { ChangeEvent, useState } from 'react';
import { FaPix } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import AlfredImg from '../../assets/c1b28810-5a23-4e7c-bcce-bd1f42b271c5.png';
import WiseIcon from '../../assets/wiseIcon.png';
import { ROUTES } from '../../routes/Routes';
import ConfirmInfosModal from './modal/ConfirmInfos';
import { useCheckout } from './useChekout';

export default function Checkout() {
  const {
    network,
    coldWallet,
    transactionNumber,
    cupom,
    isDropdownOpen,
    isLoading,
    errors,
    brlAmount,
    btcAmount,
    acceptFees,
    acceptTerms,
    networks,
    currentLang,
    paymentMethod,
    isDropdownOpenMethod,
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
  } = useCheckout();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const handleOpenModal = async () => {
    await checkCouponValidity();

    if (errors.cupom) {
      return;
    }

    if (!validateFields()) {
      toast.error(t('buycheckout.missingFields'));
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <Loader />}

      <main className="flex flex-col justify-center items-center gap-y- pt-12 sm:pt-24">
        <img src={AlfredWhiteLogo} alt="Alfred Logo" className="w-64 sm:w-96" />
        <section className="flex flex-col justify-center items-center gap-y-4 pt-4">
          <p className="text-lg sm:text-xl text-center text-white">
            {t('buycheckout.value')}: {brlAmount} BRL
            <br /> {t('buycheckout.valueBTC')}: {btcAmount} BTC
          </p>

          <div className="flex justify-center items-center relative px-4">
            <div className="w-full max-w-2xl ">
              <div className="flex justify-center items-center relative w-full">
                <input
                  type="text"
                  value={network}
                  readOnly
                  placeholder={t('buycheckout.selectNetwork')}
                  onClick={toggleDropdown}
                  className="border-2 px-8 py-3 rounded-3xl text-base bg-black sm:text-lg text-white placeholder-white bg-black text-center w-full"
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
                  <div className="absolute right-0 top-full pt-2 w-full sm:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
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
              <div className="flex justify-center items-center relative w-full pt-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={paymentMethod}
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
                    ) : null}
                  </button>
                  {isDropdownOpenMethod && (
                    <div className="absolute right-0 top-full pt-2 w-full sm:w-48 bg-[#00070F] border border-gray-300 rounded-lg shadow-lg z-10">
                      <ul>
                        <li
                          onClick={() => selectPaymentMethod('PIX')}
                          className="flex items-center px-3 py-2 hover:bg-slate-900 cursor-pointer text-white "
                        >
                          PIX
                          <FaPix className="w-8 h-8 sm:w-10 sm:h-10  text-white ml-2" />
                        </li>
                        <li
                          onClick={() => selectPaymentMethod('WISE')}
                          className="flex items-center px-3 py-2 hover:bg-slate-900  cursor-pointer text-white"
                        >
                          Wise
                          <img
                            src={WiseIcon}
                            alt="Wise"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full text-white ml-2"
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
                  onChange={(e) => setCupom(e.target.value)}
                  placeholder={t('buycheckout.couponPlaceholder')}
                  className="border-2 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                />
                <button
                  onClick={checkCouponValidity}
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
              <div className="flex justify-center items-center pt-4 ">
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

            <div className=" hidden sm:block absolute right-[-25%] top-[-20%] transform translate-x-1/2 translate-y-1/2 w-[50%]">
              <img src={AlfredImg} alt="Alfred" />
            </div>
          </div>

          <ConfirmInfosModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={() => {
              closeModal();
              handleProcessPayment();
            }}
            brlAmount={brlAmount || ''}
            btcAmount={btcAmount || ''}
            network={network || ''}
            coldWallet={coldWallet || ''}
            paymentMethod={paymentMethod || ''}
            transactionNumber={transactionNumber || ''}
            cupom={cupom || ''}
          />
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}

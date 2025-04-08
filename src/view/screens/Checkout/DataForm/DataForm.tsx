import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import { PaymentLoader } from '@/view/components/PaymentLoader';
import classNames from 'classnames';
import { t } from 'i18next';
import { ChangeEvent, useState } from 'react';
import { FaEye, FaEyeSlash, FaQuestionCircle } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import BoletoIcon from '../../../assets/BoletoIcon.png';
import AlfredImg from '../../../assets/c1b28810-5a23-4e7c-bcce-bd1f42b271c5.png';
import WiseIcon from '../../../assets/wiseIcon.png';
// NOVOS ÍCONES adicionados:

import BankTransf from '../../../assets/bankIcon.png';
import PayPalIcon from '../../../assets/paypalIcon.png';
import SwiftIcon from '../../../assets/swiftIcon.png';

import { ROUTES } from '../../../routes/Routes';
import ConfirmInfosModal from '../modal/ConfirmInfos';
import { useDataForm } from './useDataForm';

export default function DataForm() {
  const {
    network,
    coldWallet,
    cupom,
    isDropdownOpen,
    isLoading,
    errors,
    fiatAmount,
    fiatType,
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
    validateFields,
  } = useDataForm();

  // Verifica se há um usuário logado via localStorage
  const storedUser = localStorage.getItem('user');
  const loggedUser = storedUser ? JSON.parse(storedUser) : null;

  // Se já estiver logado, o campo de usuário é pré-preenchido
  const [username, setUsername] = useState(loggedUser?.username || '');
  const [password, setPassword] = useState('');

  // Adicionamos os novos rótulos para os métodos de pagamento
  const paymentMethodLabels = {
    PIX: t('buycheckout.paymentMethod.PIX'),
    WISE: t('buycheckout.paymentMethod.WISE'),
    TICKET: t('buycheckout.paymentMethod.TICKET'),
    SWIFT: t('buycheckout.paymentMethod.SWIFT'),
    PAYPAL: t('buycheckout.paymentMethod.PAYPAL'),
    BANK_TRANSFER: t('buycheckout.paymentMethod.BANK_TRANSFER'),
  };

  const numericFiat = parseInt(fiatAmount.replace(/\D/g, ''), 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const is100k =
    parseInt(
      localStorage.getItem('fiatAmount')?.replace(/\D/g, '') || '0',
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
    if (!username || (!loggedUser && !password)) {
      toast.error(t('buycheckout.missingLogin'));
      return;
    }

    if (cupom.trim() && !couponApplied) {
      toast.error(t('buycheckout.applyCouponFirst'));
      return;
    }

    if (username.trim().length < 6) {
      toast.error(t('buycheckout.usernameLengthError'));
      return;
    }

    if (!loggedUser && password.trim().length < 6) {
      toast.error(t('buycheckout.passwordLengthError'));
      return;
    }

    if (!validateFields()) {
      toast.error(t('buycheckout.missingFields'));
      return;
    }

    if (fiatType.toUpperCase() !== 'BRL') {
      const whatsappNumber = '5511911872097';
      const message = `Olá! Estou Querendo comprar ${cryptoType.toUpperCase()} com ${fiatType} .
Valor: ${fiatAmount} (${fiatType})
Crypto (${cryptoType.toUpperCase()}): ${cryptoAmount}
Rede: ${network}
Endereço da carteira: ${coldWallet}
Usuário: ${username}
Cupom: ${cupom || 'Nenhum'}`;
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
      return;
    }

    if (paymentMethod === 'PIX') {
      if (is100k) {
        handleProcessPayment(username, password);
        return;
      }
      if (numericFiat > 5000) {
        let taxaAlfred = '';
        if (numericFiat >= 6000) {
          taxaAlfred = cupom.trim() !== '' ? '4.99' : '6';
        } else {
          taxaAlfred = alfredFeePercentage.toString();
        }

        const message = `
    Estou comprando mais de 5 mil reais no Alfred e preciso do formulário de Validação para Transações Anônimas.

    - Valor: ${fiatAmount} (${fiatType})
    - Valor Crypto: ${cryptoAmount} ${cryptoType.toUpperCase()}
    - Rede: ${network}
    - Endereço da carteira: ${coldWallet}
    - Método de pagamento: ${paymentMethodLabels[paymentMethod]}
    - Usuário: ${username}
    - Cupom: ${cupom || 'Nenhum'}
    - Taxa Alfred (%): ${taxaAlfred}
        `;
        const whatsappURL = `https://wa.me/5511911872097?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        return;
      }
    }

    setIsModalOpen(true);
  };

  return (
    <>
      {isLoading && <PaymentLoader />}

      <main className="flex flex-col justify-center items-center pt-12 sm:pt-24">
        <img src={AlfredWhiteLogo} alt="Alfred Logo" className="w-64 sm:w-96" />
        <section className="flex flex-col justify-center items-center gap-y-4 pt-4">
          <p className="text-lg sm:text-xl text-center text-white">
            {t('buycheckout.value')}: {fiatAmount} {fiatType}
            <br />
            {t('buycheckout.valueCrypto')}: {cryptoAmount}{' '}
            {cryptoType.toUpperCase()}
          </p>

          <div className="flex justify-center items-center relative px-4"></div>
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
                      const isOnchainDisabled = false;
                      return (
                        <li
                          key={net.name}
                          onClick={() => {
                            if (isOnchainDisabled) {
                              toast.info(t('checkout.wallet_error_below_700'));
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
                          <span className="w-full text-center">{net.name}</span>
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
                  ) : paymentMethod === 'SWIFT' ? (
                    <img
                      src={SwiftIcon}
                      alt="Swift"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                  ) : paymentMethod === 'PAYPAL' ? (
                    <img
                      src={PayPalIcon}
                      alt="PayPal"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                  ) : paymentMethod === 'BANK_TRANSFER' ? (
                    <img
                      src={BankTransf}
                      alt="PayPal"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                  ) : null}
                </button>
                {isDropdownOpenMethod && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 transition-all duration-300 ease-out transform scale-100 opacity-100">
                    <ul className="grid grid-cols-2 gap-4 w-full">
                      <li
                        onClick={() => {
                          if (numericFiat > 5000 && numericFiat !== 100000) {
                            toast.warning(
                              t('checkout.payment_error_above_5000'),
                            );
                          }
                          selectPaymentMethod('PIX');
                        }}
                        className="flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white hover:bg-gray-800"
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
                      <li
                        onClick={() => selectPaymentMethod('SWIFT')}
                        className="flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white hover:bg-gray-800"
                      >
                        <span className="w-full text-center">Swift</span>
                        <img
                          src={SwiftIcon}
                          alt="Swift"
                          className="w-6 h-6 mt-1 rounded-full"
                        />
                      </li>
                      <li
                        onClick={() => selectPaymentMethod('PAYPAL')}
                        className="flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white hover:bg-gray-800"
                      >
                        <span className="w-full text-center">PayPal</span>
                        <img
                          src={PayPalIcon}
                          alt="PayPal"
                          className="w-6 h-6 mt-1 rounded-full"
                        />
                      </li>
                      <li
                        onClick={() => selectPaymentMethod('BANK_TRANSFER')}
                        className="flex flex-col items-center justify-center px-4 py-2 cursor-pointer text-white hover:bg-gray-800"
                      >
                        <span className="w-full text-center">
                          Transferência Bancária
                        </span>
                        <img
                          src={BankTransf}
                          alt="Transferência Bancária"
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
            {/* Campos de login */}
            {loggedUser ? (
              <div className="flex justify-center items-center pt-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={username}
                    readOnly
                    placeholder={
                      t('buycheckout.usernamePlaceholder') || 'Usuário'
                    }
                    className="border-2 pl-10 px-8 py-3 rounded-3xl text-base sm:text-lg text-white bg-black text-center w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center pt-4">
                <div className="flex flex-row gap-4 w-full">
                  <div className="relative w-1/2">
                    <FaQuestionCircle
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      onClick={() => setShowTooltip(!showTooltip)}
                    />
                    <input
                      type="text"
                      value={username}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                      }
                      placeholder={
                        t('buycheckout.usernamePlaceholder') || 'Usuário'
                      }
                      className="border-2 pl-10 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                    />
                    {showTooltip && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900 text-white text-sm p-3 rounded-lg shadow-lg z-10">
                        <p>
                          {t('buycheckout.loginTooltip.message') ||
                            'Por segurança, informe seu usuário e senha para acessar a plataforma.'}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      placeholder={
                        t('buycheckout.passwordPlaceholder') || 'Senha'
                      }
                      className="border-2 px-8 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
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

          <div className="hidden lg:block absolute right-[10%] w-[20%]">
            <img src={AlfredImg} alt="Alfred" />
          </div>
        </section>

        {!is100k && (
          <ConfirmInfosModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={() => {
              closeModal();
              handleProcessPayment(username, password);
            }}
            fiatAmount={fiatAmount || ''}
            fiatType={fiatType || ''}
            cryptoAmount={cryptoAmount || ''}
            network={network || ''}
            coldWallet={coldWallet || ''}
            paymentMethod={paymentMethod || ''}
            transactionNumber={'11111111111'}
            cupom={cupom || ''}
            alfredFeePercentage={alfredFeePercentage}
            cryptoType={cryptoType || ''}
          />
        )}
      </main>
    </>
  );
}

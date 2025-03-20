export function PaymentLoader() {
  return (
    <div className="fixed top-0 left-0 z-50 flex w-screen h-screen items-center justify-center bg-opacity-50 bg-black">
      <div className="flex flex-col items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <p className="mt-4 text-white text-lg">
          Estamos processando seu pedido, aguarde...
        </p>
      </div>
    </div>
  );
}

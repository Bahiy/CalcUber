import { useState } from "react";
import Input from "./components/Input";

const App = () => {
  // Estado inicial como um objeto com chaves para cada input
  const [formValues, setFormValues] = useState({
    valorGasolina: null,
    kmPorLitro: null,
    kmRodados: null,
    totalDoDia: null,
    gastoPorc: null,
    gastoValor: (a, b) => {
      const c = a * b;
      const prod = c / 100;
      return prod;
    },
    valorLiquido: null,
  });

  const [isVisible, setIsVisible] = useState(false);

  //  Função chamada qunado o valor de qualquer input muda
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Função para capturar os valores dos inputs quando o botão "Calcular" for pressionado
  const handleSubmit = () => {
    const valorGasolina = parseFloat(formValues.valorGasolina);
    const kmPorLitro = parseFloat(formValues.kmPorLitro);
    const kmRodados = parseFloat(formValues.kmRodados);
    const totalDoDia = parseFloat(formValues.totalDoDia);

    if (
      isNaN(valorGasolina) ||
      isNaN(kmPorLitro) ||
      isNaN(kmRodados) ||
      isNaN(totalDoDia)
    ) {
      return alert("Por favor, insira valores numéricos válidos.");
    }

    const custoKM = valorGasolina / kmPorLitro;
    console.log(`O custo por KM é: ${custoKM}`);
    const custoDia = kmRodados * custoKM;
    console.log(custoDia);
    const gastoPorc = (custoDia * 100) / totalDoDia;
    const valorRestante = totalDoDia - custoDia;

    console.log(`Quantos % o gasto representa: ${gastoPorc}%`);

    // Atualiza o estado usando setFormValues
    setFormValues((prevState) => ({
      ...prevState,
      gastoPorc: parseFloat(gastoPorc.toFixed(2)),
      valorLiquido: parseFloat(valorRestante.toFixed(2)),
    }));

    // Torna a seção de resultado visível após o cálculo
    setIsVisible(true);
  };

  return (
    <div className="h-screen flex-col content-center items-center justify-center text-center">
      <div>
        <h1 className="font-bold text-5xl">Calculadora UBER</h1>
        <p className="my-2">Saiba o quanto o seu dia gerou de lucro</p>
      </div>
      <div>
        <Input
          name={"valorGasolina"}
          value={formValues.valorGasolina}
          onChange={handleInputChange}
          place="Valor Gasolina"
        />
        <Input
          name={"kmRodados"}
          value={formValues.kmRodados}
          onChange={handleInputChange}
          place="KM Rodados Hoje"
        />
        <Input
          name={"kmPorLitro"}
          value={formValues.kmPorLitro}
          onChange={handleInputChange}
          place="Média de KM/L"
        />
        <Input
          name={"totalDoDia"}
          value={formValues.totalDoDia}
          onChange={handleInputChange}
          place="Rendimento Bruto"
        />

        <br />
        <button
          className="rounded-full border-solid text-xl border-2 border-black px-5 py-2 m-3 bg-cyan-600 hover:bg-cyan-900"
          type="button"
          onClick={handleSubmit}
        >
          Calcular
        </button>
      </div>

      {isVisible && (
        <div className="flex flex-row content-center items-center justify-center text-center">

          <div className="bg-zinc-950 border-solid rounded-2xl border-2 border-gray-400 m-2 text-center p-5 w-64 h-36">
            {formValues.gastoPorc <= 26 ? (
              <span className="text-green-500 font-semibold text-3xl">
                Excelente!
              </span>
            ) : formValues.gastoPorc <= 31 ? (
              <span className="text-yellow-500 font-semibold text-3xl">
                Alerta!
              </span>
            ) : (
              <span className="text-red-500 font-semibold text-3xl">
                Péssimo!
              </span>
            )}

            <p className="text-sm mt-2">
              {formValues.gastoPorc}% representa R$
              {formValues
                .gastoValor(formValues.totalDoDia, formValues.gastoPorc)
                .toFixed(2)}{" "}
              do seu Faturamento <b>Bruto</b>
            </p>
          </div>

          <div className="bg-zinc-950 border-solid rounded-2xl border-2 border-gray-400 m-2 text-center content-center p-5 w-64 h-36">
            {formValues.gastoPorc <= 26 ? (
              <span className="text-green-500 font-semibold text-3xl">
                R$ {formValues.valorLiquido}
              </span>
            ) : formValues.gastoPorc <= 31 ? (
              <span className="text-yellow-500 font-semibold text-3xl">
                R$ {formValues.valorLiquido}
              </span>
            ) : (
              <span className="text-red-500 font-semibold text-3xl">
                R$ {formValues.valorLiquido}
              </span>
            )}

            <p>
              <b>Rendimento Liquido</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

import { useState } from "react";
import Input from "./components/Input";

const App = () => {
  // Estado inicial como um objeto com chaves para cada input
  const [formValues, setFormValues] = useState({
    valorGasolina: "",
    kmPorLitro: "",
    kmRodados: "",
    totalDoDia: "",
    gastoPorc: 0,
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
    const valorGasolinastr = formValues.valorGasolina.replace(",", ".");
    const valorGasolina = parseFloat(valorGasolinastr);
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
    const gastoPorc = (custoDia * 100) / totalDoDia;

    console.log(`Quantos % o gasto representa: ${gastoPorc}%`);
    console.log(typeof valorGasolina);

    // Atualiza o estado usando setFormValues
    setFormValues((prevState) => ({
      ...prevState,
      gastoPorc: parseFloat(gastoPorc.toFixed(2)),
    }));

    // Torna a seção de resultado visível após o cálculo
    setIsVisible(true);
  };

  return (
    <div className="text-center my-48">
      <div>
        <h1 className="font-bold text-5xl">Calculadora UBER</h1>
        <p className="my-2">Saiba o quanto o seu dia gerou de lucro</p>
        <br />
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
          className="rounded-full border-solid border-2 border-black p-2 m-2 bg-cyan-700"
          type="button"
          onClick={handleSubmit}
        >
          Calcular
        </button>
      </div>

      {isVisible && (
        <div className="resultado">
          <div>
            {formValues.gastoPorc <= 26 ? (
              <p className="text-green-500 font-semibold text-xl">Excelente!</p>
            ) : formValues.gastoPorc <= 31 ? (
              <p className="text-yellow-500 font-semibold text-xl">
                Fique em alerta!
              </p>
            ) : (
              <p className="text-red-500 font-semibold text-xl">Péssimo!</p>
            )}

            <p>O gasto representa {formValues.gastoPorc}% da sua renda.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

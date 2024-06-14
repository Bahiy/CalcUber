import "./App.css";
import { useState } from "react";

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
    const valorGasolina = parseFloat(valorGasolinastr)
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
    console.log(typeof(valorGasolina));

    // Atualiza o estado usando setFormValues
    setFormValues((prevState) => ({
      ...prevState,
      gastoPorc: parseFloat(gastoPorc.toFixed(2)),
    }));

    // Torna a seção de resultado visível após o cálculo
    setIsVisible(true);
  };

  return (
    <div className="App">
      <div>
        <h1>Calculadora UBER</h1>
        <p>Saiba o quanto o seu dia gerou de lucro</p>
      </div>

      <div>
        <input
          type="text"
          name="valorGasolina"
          value={formValues.valorGasolina}
          onChange={handleInputChange}
          placeholder="Valor Gasolina"
        />

        <input
          type="number"
          name="kmRodados"
          value={formValues.kmRodados}
          onChange={handleInputChange}
          placeholder="Total KM rodados hoje"
        />

        <input
          type="number"
          name="kmPorLitro"
          value={formValues.kmPorLitro}
          onChange={handleInputChange}
          placeholder="KM/L"
        />

        <input
          type="number"
          name="totalDoDia"
          value={formValues.totalDoDia}
          onChange={handleInputChange}
          placeholder="Valor bruto recebido hoje"
        />

        <br />
        <button type="button" onClick={handleSubmit}>
          Calcular
        </button>
      </div>

      {isVisible && (
        <div className="resultado">
          <h2>Resultado:</h2>
          <div>
            {formValues.gastoPorc <= 26 ? (
              <div>Excelente</div>
            ) : formValues.gastoPorc <= 31 ? (
              <div>Fique em alerta</div>
            ) : (
              <div>Você vai quebrar</div>
            )}

            <p>O gasto representa {formValues.gastoPorc}% da sua renda.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

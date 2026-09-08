export const CargoSelect = ({ value, onChange, required }) => {
  return (
    <fieldset className="fieldset">
      <label className="label" htmlFor="cargo">
        Cargo<span className="text-red-700">*</span>
      </label>
      <select
        className="select w-full"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled={true}>Selecione o cargo</option>
        <option value="OFICIAL">Oficial</option>
        <option value="SERVENTE">Servente</option>
        <option value="AJUDANTE">Ajudante</option>
        <option value="ARMADOR">Armador</option>
        <option value="PEDREIRO">Pedreiro</option>
        <option value="MEIO_OFICIAL">Meio Oficial</option>
        <option value="ELETRICISTA">Eletricista</option>
      </select>
    </fieldset>
  );
};

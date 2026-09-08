export const StatusSelect = ({ value, onChange, required }) => {
  return (
    <fieldset className="fieldset">
      <label className="label" htmlFor="cargo">
        Status<span className="text-red-700">*</span>
      </label>
      <select
        className="select w-full"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled={true}>
          Selecione o status
        </option>
        <option value="ATIVO">Ativo</option>
        <option value="DESLIGADO">Desligado</option>
        <option value="FERIAS">Férias</option>
        <option value="AFASTADO">Afastado</option>
      </select>
    </fieldset>
  );
};

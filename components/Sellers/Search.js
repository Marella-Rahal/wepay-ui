import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const Search = (props) => {
  return (
    <div className="flex">
      <label className="bg-white rounded-l-lg shadow-cardShadow cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
        <BiSearchAlt2 className="w-[19px] h-[19px] hover:scale-[1.1]" />
      </label>
      <input
        type="text"
        placeholder="اسم المتجر"
        value={props.nameFilter}
        onChange={ (e) => props.setNameFilter(e.target.value) }
        className="w-full rounded-l-none shadow-cardShadow outline-none focus:border-2 border-effectColor px-3 py-[5px] h-9"
      />
    </div>
  );
};

export default Search;

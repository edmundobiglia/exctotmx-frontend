import React from "react";
import generateLCIDList from "../../utils/generateLCIDList";

import { LanguageSelectorSection, SelectionBox } from "./style";

const LCIDList = generateLCIDList();

interface Props {
  languageSetter: React.Dispatch<React.SetStateAction<string>>;
  languageType: string;
}

const LanguageSelector = ({ languageSetter, languageType }: Props) => {
  const handleLanguageSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;

    languageSetter(selectedLanguage);
  };

  return (
    <LanguageSelectorSection>
      <SelectionBox>
        <select defaultValue="" onChange={handleLanguageSelection}>
          <option value="" disabled></option>
          {LCIDList.map((LCID) => (
            <option key={`${languageType}_${LCID}`} value={LCID}>
              {LCID}
            </option>
          ))}
        </select>
      </SelectionBox>
    </LanguageSelectorSection>
  );
};

export default LanguageSelector;

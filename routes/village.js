const express = require("express");
const router = express.Router();

// List of 44 villages
const villages = [
  { id: "01", name: { en: "ISHWARIYA", gu: "ઈશ્વરીયા " } },
  { id: "02", name: { en: "GADHADA", gu: "ગઢડા" } },
  { id: "03", name: { en: "KERIYA", gu: "કેરિયા" } },
  { id: "04", name: { en: "JOTINGDA", gu: "જોટીગડા " } },
  { id: "05", name: { en: "SENDARDA", gu: "સેંદરડા" } },
  { id: "06", name: { en: "TODA", gu: "ટોડા" } },
  { id: "07", name: { en: "BHUTIYA", gu: "ભુતિયા " } },
  { id: "08", name: { en: "TANA", gu: "ટાણા" } },
  { id: "09", name: { en: "JAALIYA", gu: "જાળિયા" } },
  { id: "10", name: { en: "INGORALA", gu: "ઇંગોરાળા" } },
  { id: "11", name: { en: "KUNDHELI", gu: "કુંઢેલી" } },
  { id: "12", name: { en: "BURANPUR", gu: "બુરાનપુર " } },
  { id: "13", name: { en: "SAADA", gu: "સાડા" } },
  { id: "14", name: { en: "MANDAVI", gu: "માંડવી " } },
  { id: "15", name: { en: "DAATRAD", gu: "દાત્રડ " } },
  { id: "16", name: { en: "GHETI", gu: "ઘેટી" } },
  { id: "17", name: { en: "DHUNDHASAR", gu: "ઢુંઢસર" } },
  { id: "18", name: { en: "TIMBI", gu: "ટીંબી " } },
  { id: "19", name: { en: "DEVALIYA", gu: "દેવળિયા" } },
  { id: "20", name: { en: "MOKHADAKA", gu: "મોખડકા" } },
  { id: "21", name: { en: "UMRALA", gu: "ઉમરાળા" } },
  { id: "22", name: { en: "RATANPAR", gu: "રતનપર" } },
  { id: "23", name: { en: "UKHRALA", gu: "ઉખરલા " } },
  { id: "24", name: { en: "LONGIYA", gu: "લોંગીયા " } },
  { id: "25", name: { en: "SONDA", gu: "સોંડા" } },
  { id: "26", name: { en: "UGAMEDI", gu: "ઉગામેડી " } },
  { id: "27", name: { en: "OTARIYA", gu: "ઓતારીયા" } },
  { id: "28", name: { en: "SAGAPARA", gu: "સગાપરા " } },
  { id: "29", name: { en: "MAKHANIYA", gu: "માંખણિયા " } },
  { id: "30", name: { en: "KRUSHNAGADH", gu: "કૃષ્ણગઢ" } },
  { id: "31", name: { en: "NONDHANVADAR", gu: "નોંધણવદર" } },
  { id: "32", name: { en: "DEVALIYA", gu: "દેવળીયા " } },
  { id: "33", name: { en: "NINGALA", gu: "નિંગાળા" } },
  { id: "34", name: { en: "GARIYADHAR", gu: "ગારીયાધાર" } },
  { id: "35", name: { en: "KHAKHUY", gu: "ખાખુઈ" } },
  { id: "36", name: { en: "LIMBADIYA", gu: "લિંબડીયા" } },
  { id: "37", name: { en: "KHOPALA", gu: "ખોપાળા " } },
  { id: "38", name: { en: "BHAVNAGAR", gu: "ભાવનગર" } },
  { id: "39", name: { en: "KUNDHELI", gu: "કુંઢેલી" } },
  { id: "40", name: { en: "POLARPUR", gu: "પોલાણપુર" } },
  { id: "41", name: { en: "JAALIYA", gu: "જાળિયા" } }

];

module.exports = villages;


router.get("/", (req, res) => {
  res.status(200).json(villages);
});

module.exports = router;

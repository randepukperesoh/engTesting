export const OPTIONS_MOCK = [
    { value: 0, label: "Текст" },
    { value: 1, label: "Заголовок" },
    { value: 2, label: "Изображение" },
    { value: 3, label: "Выделеный текст" },
  ];
  
  export const OPTIONS_MOCK_DESC = [
    "Текст",
    "Заголовок",
    "Изображение",
    "Выделеный текст",
  ];
  
  export const translateTypes: Record<string, number> = {
    'text': 0,
    "bold":3,
    'image': 2,
    'title': 1
  }

  export const reversetranslateTypes: Record<number, string> = {
     0: 'text',
    3: "bold",
     2: 'image',
     1: 'title'
  }

  export const translateTypesToEng: Record<string, string> = {
    "Текст": 'text',
    "Заголовок": 'title',
    "Изображение": 'image',
    "Выделеный текст": 'bold',
  }

  export const OPTION_MAP_MOCK: Record<string, string> = {
    title: "Заголовок",
    text: "Текст",
    image: "Изображение",
    bold: "Выделеный текст",
  };
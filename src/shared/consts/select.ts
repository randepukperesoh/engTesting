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

  export const translateTypesToEng: Record<string, string> = {
    "Текст": 'text',
    "Заголовок": 'title',
    "Изображение": 'image',
    "Выделеный текст": 'bold',
  }
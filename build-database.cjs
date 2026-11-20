const fs = require('node:fs');
const path = require('node:path');

const mediaFolder = '22.11.26';
const mediaDirectory = path.join(__dirname, mediaFolder);

const formats = new Map([
  ['.txt',  'text'],
  ['.jpg',  'image'],
  ['.jpeg', 'image'],
  ['.png',  'image'],
  ['.mp3',  'audio'],
  ['.mp4',  'video'],
]);

const fields = {
  question: { 
    text: 'q',
    image: 'qImg', 
    audio: 'qMusic',
    video: 'qVideo',
  },
  answer: { 
    text: 'a',
    image: 'aImg', 
    audio: 'aMusic',
    video: 'aVideo',
  },
};

const mediaIndex = Object.create(null);

for (const entry of fs.readdirSync(mediaDirectory, { withFileTypes: true })) {
  if (!entry.isFile()) continue;

  const { name, ext } = path.parse(entry.name);
  const match = /^(r\d+t\d+q\d+)_(question|answer)$/i.exec(name);
  if (!match) continue;

  const key = match[1].toLowerCase();
  const role = match[2].toLowerCase();
  const kind = formats.get(ext.toLowerCase());
  const field = fields[role][kind];

  if (!field) {
    throw new Error(`Неподдерживаемый формат для файла «${entry.name}»`);
  }

  const questionMedia = (mediaIndex[key] ??= {});

  if (Object.hasOwn(questionMedia, field)) {
    throw new Error(
      `Для вопроса ${key} найдено несколько файлов для поля ${field}`,
    );
  }

  if (kind === 'text') {
    const filePath = path.join(mediaDirectory, entry.name);
    questionMedia[field] = fs.readFileSync(filePath, 'utf8').trim();
  } else {
    questionMedia[field] =
      `./${encodeURIComponent(mediaFolder)}/${encodeURIComponent(entry.name)}`;
  }
}

// Сохраняем совместимость со старой логикой карточки.
for (const questionMedia of Object.values(mediaIndex)) {
  if (questionMedia.aVideo || questionMedia.qVideo) {
    questionMedia.type = 'video';
  } else if (questionMedia.aMusic || questionMedia.qMusic) {
    questionMedia.type = 'music';
  } else if (questionMedia.aImg || questionMedia.qImg) {
    questionMedia.type = 'image';
  } else {
    questionMedia.type = 'text';
  }
}

const outputPath = path.join(__dirname, 'media-index.js');
const output = `const mediaIndex = ${JSON.stringify(mediaIndex, null, 2)};\n`;

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Создан media-index.js. Вопросов с медиа: ${Object.keys(mediaIndex).length}`);
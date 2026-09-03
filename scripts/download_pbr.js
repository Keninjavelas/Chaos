const fs = require('fs');
const path = require('path');
const https = require('https');

const textures = [
  // Wall (concrete_wall_003)
  { dir: 'public/textures/reception/wall', file: 'diffuse.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/concrete_wall_003/concrete_wall_003_diff_1k.jpg' },
  { dir: 'public/textures/reception/wall', file: 'normal.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/concrete_wall_003/concrete_wall_003_nor_gl_1k.jpg' },
  { dir: 'public/textures/reception/wall', file: 'roughness.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/concrete_wall_003/concrete_wall_003_rough_1k.jpg' },
  { dir: 'public/textures/reception/wall', file: 'ao.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/concrete_wall_003/concrete_wall_003_ao_1k.jpg' },

  // Floor (dirty_tiles)
  { dir: 'public/textures/reception/floor', file: 'diffuse.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dirty_tiles/dirty_tiles_diff_1k.jpg' },
  { dir: 'public/textures/reception/floor', file: 'normal.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dirty_tiles/dirty_tiles_nor_gl_1k.jpg' },
  { dir: 'public/textures/reception/floor', file: 'roughness.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dirty_tiles/dirty_tiles_rough_1k.jpg' },
  { dir: 'public/textures/reception/floor', file: 'ao.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/dirty_tiles/dirty_tiles_ao_1k.jpg' },

  // Ceiling (ceiling_interior)
  { dir: 'public/textures/reception/ceiling', file: 'diffuse.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/ceiling_interior/ceiling_interior_diff_1k.jpg' },
  { dir: 'public/textures/reception/ceiling', file: 'normal.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/ceiling_interior/ceiling_interior_nor_gl_1k.jpg' },
  { dir: 'public/textures/reception/ceiling', file: 'roughness.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/ceiling_interior/ceiling_interior_rough_1k.jpg' },
  { dir: 'public/textures/reception/ceiling', file: 'ao.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/ceiling_interior/ceiling_interior_ao_1k.jpg' },

  // Floor Alt (old_linoleum_flooring_01)
  { dir: 'public/textures/reception/linoleum', file: 'diffuse.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/old_linoleum_flooring_01/old_linoleum_flooring_01_diff_1k.jpg' },
  { dir: 'public/textures/reception/linoleum', file: 'normal.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/old_linoleum_flooring_01/old_linoleum_flooring_01_nor_gl_1k.jpg' },
  { dir: 'public/textures/reception/linoleum', file: 'roughness.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/old_linoleum_flooring_01/old_linoleum_flooring_01_rough_1k.jpg' },
  { dir: 'public/textures/reception/linoleum', file: 'ao.jpg', url: 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/old_linoleum_flooring_01/old_linoleum_flooring_01_ao_1k.jpg' },
];

function download(item) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(item.dir, { recursive: true });
    const dest = path.join(item.dir, item.file);
    const fileStream = fs.createWriteStream(dest);
    https.get(item.url, res => {
      if (res.statusCode !== 200) {
        reject(new Error('Failed to download ' + item.url + ': HTTP ' + res.statusCode));
        return;
      }
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log('Downloaded:', dest, '(' + fs.statSync(dest).size + ' bytes)');
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of textures) {
    await download(item);
  }
  console.log('All textures downloaded successfully.');
}

run().catch(console.error);

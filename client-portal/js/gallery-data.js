/* PhotoMagic by RK - Extended Gallery Catalog Mock Data */

export const mockCategories = [
  { id: 'all', title: 'All Photos', count: 1240, cover: './assets/cat_wedding.png' },
  { id: 'highlights', title: 'Highlights', count: 48, cover: './assets/cat_candid.png' },
  { id: 'wedding', title: 'Wedding Ceremony', count: 320, cover: './assets/cat_wedding.png' },
  { id: 'reception', title: 'Reception Night', count: 280, cover: './assets/cat_reception.png' },
  { id: 'bride', title: 'Bride Solos', count: 140, cover: './assets/cat_bride.png' },
  { id: 'groom', title: 'Groom Solos', count: 110, cover: './assets/cat_groom.png' },
  { id: 'family', title: 'Family & Guests', count: 180, cover: './assets/cat_candid.png' },
  { id: 'candid', title: 'Candid Moments', count: 120, cover: './assets/cat_candid.png' },
  { id: 'drone', title: 'Drone & Aerial', count: 42, cover: './assets/cat_drone.png' }
];

export const mockPhotos = [
  {
    id: 'photo-1',
    code: 'IMG_0101.JPG',
    title: 'Mandap Royal Vows',
    category: 'wedding',
    src: './assets/cat_wedding.png',
    resolution: '6000 x 4000',
    iso: 'ISO 200',
    lens: '85mm f/1.4',
    isFavorite: true,
    isSelected: true
  },
  {
    id: 'photo-2',
    code: 'IMG_0102.JPG',
    title: 'First Reception Dance',
    category: 'reception',
    src: './assets/cat_reception.png',
    resolution: '6000 x 4000',
    iso: 'ISO 800',
    lens: '35mm f/1.4',
    isFavorite: false,
    isSelected: true
  },
  {
    id: 'photo-3',
    code: 'IMG_0103.JPG',
    title: 'Bridal Royal Portrait',
    category: 'bride',
    src: './assets/cat_bride.png',
    resolution: '6000 x 4000',
    iso: 'ISO 100',
    lens: '50mm f/1.2',
    isFavorite: true,
    isSelected: true
  },
  {
    id: 'photo-4',
    code: 'IMG_0104.JPG',
    title: 'Groom Baraat Entrance',
    category: 'groom',
    src: './assets/cat_groom.png',
    resolution: '6000 x 4000',
    iso: 'ISO 400',
    lens: '70-200mm f/2.8',
    isFavorite: false,
    isSelected: false
  },
  {
    id: 'photo-5',
    code: 'IMG_0105.JPG',
    title: 'Haldi Laughter Moment',
    category: 'candid',
    src: './assets/cat_candid.png',
    resolution: '6000 x 4000',
    iso: 'ISO 200',
    lens: '85mm f/1.4',
    isFavorite: true,
    isSelected: false
  },
  {
    id: 'photo-6',
    code: 'IMG_0106.JPG',
    title: 'Taj Palace Lake Dusk',
    category: 'drone',
    src: './assets/cat_drone.png',
    resolution: '5472 x 3648',
    iso: 'ISO 100',
    lens: 'Drone 24mm f/2.8',
    isFavorite: true,
    isSelected: true
  },
  {
    id: 'photo-7',
    code: 'IMG_0107.JPG',
    title: 'Jaimala Floral Exchange',
    category: 'wedding',
    src: './assets/cat_wedding.png',
    resolution: '6000 x 4000',
    iso: 'ISO 400',
    lens: '50mm f/1.2',
    isFavorite: false,
    isSelected: false
  },
  {
    id: 'photo-8',
    code: 'IMG_0108.JPG',
    title: 'Reception Fireworks Stage',
    category: 'reception',
    src: './assets/cat_reception.png',
    resolution: '6000 x 4000',
    iso: 'ISO 1600',
    lens: '24mm f/1.4',
    isFavorite: true,
    isSelected: true
  },
  {
    id: 'photo-9',
    code: 'IMG_0109.JPG',
    title: 'Bridal Dupatta Detail',
    category: 'bride',
    src: './assets/cat_bride.png',
    resolution: '6000 x 4000',
    iso: 'ISO 100',
    lens: '100mm Macro f/2.8',
    isFavorite: false,
    isSelected: false
  },
  {
    id: 'photo-10',
    code: 'IMG_0110.JPG',
    title: 'Groom Sword Detail',
    category: 'groom',
    src: './assets/cat_groom.png',
    resolution: '6000 x 4000',
    iso: 'ISO 200',
    lens: '85mm f/1.4',
    isFavorite: false,
    isSelected: false
  },
  {
    id: 'photo-11',
    code: 'IMG_0111.JPG',
    title: 'Family Blessing Ceremony',
    category: 'family',
    src: './assets/cat_candid.png',
    resolution: '6000 x 4000',
    iso: 'ISO 400',
    lens: '35mm f/1.4',
    isFavorite: true,
    isSelected: true
  },
  {
    id: 'photo-12',
    code: 'IMG_0112.JPG',
    title: 'Palace Aerial Sunset',
    category: 'drone',
    src: './assets/cat_drone.png',
    resolution: '5472 x 3648',
    iso: 'ISO 100',
    lens: 'Drone 24mm f/2.8',
    isFavorite: true,
    isSelected: false
  }
];

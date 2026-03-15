-- Ushbu SQL kodni Supabase SQL Editor'ga nusxalab, ishga tushiring (Run)

-- 1. Sotuvchilar jadvali
CREATE TABLE sellers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0
);

-- 2. Mahsulotlar jadvali
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "originalPrice" NUMERIC,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  "isBestSeller" BOOLEAN DEFAULT false,
  seller_id TEXT REFERENCES sellers(id)
);

-- 3. Boshlang'ich sotuvchilarni qo'shish
INSERT INTO sellers (id, name, university, rating) VALUES
('s1', 'Azizbek', 'TATU', 4.8),
('s2', 'Sardor', 'TDTU', 4.5),
('s3', 'TalabaMarket Store', 'Barcha', 5.0),
('s4', 'Malika', 'O''zMU', 4.9),
('s5', 'Elektronika Uz', 'Barcha', 4.7);

-- 4. Boshlang'ich mahsulotlarni qo'shish
INSERT INTO products (title, price, "originalPrice", category, condition, image, description, "isBestSeller", seller_id) VALUES
('Oliy matematika 1-qism', 35000, 50000, 'Kitoblar', 'Ikkinchi qo''l', 'https://picsum.photos/seed/math/400/400', 'Yaxshi saqlangan, faqat 1-kursda o''qilgan. Barcha betlari joyida.', true, 's1'),
('MacBook Pro 2019 13"', 4500000, 5000000, 'Texnika', 'Ikkinchi qo''l', 'https://picsum.photos/seed/macbook/400/400', 'Holati a''lo, batareya 85%. Dasturlash uchun zo''r.', false, 's2'),
('Casio Kalkulyator fx-991EX', 120000, null, 'Texnika', 'Yangi', 'https://picsum.photos/seed/calc/400/400', 'Muhandislik kalkulyatori, yangi karobkada.', true, 's3'),
('Stol lampasi LED', 85000, 100000, 'Talaba uchun buyumlar', 'Yangi', 'https://picsum.photos/seed/lamp/400/400', 'Ko''zni charchatmaydigan yorug''lik, 3 xil rejim.', false, 's3'),
('Fizika konspekti (To''liq)', 15000, null, 'O''quv jihozlari', 'Ikkinchi qo''l', 'https://picsum.photos/seed/notes/400/400', '1-kurs fizika to''liq qamrab olingan. Yozuv tushunarli.', false, 's4'),
('Mi Powerbank 10000mAh', 150000, null, 'Talaba uchun buyumlar', 'Yangi', 'https://picsum.photos/seed/powerbank/400/400', 'Original Mi powerbank, telefonni 2-3 marta to''liq quvvatlaydi.', true, 's5'),
('Dasturlash asoslari PDF', 5000, null, 'O''quv jihozlari', 'Yangi', 'https://picsum.photos/seed/pdf/400/400', 'C++ va Python bo''yicha boshlang''ich tushunchalar. PDF formatda tashlab beraman.', false, 's1'),
('Ryukzak (Noutbuk uchun)', 180000, 220000, 'Talaba uchun buyumlar', 'Yangi', 'https://picsum.photos/seed/backpack/400/400', 'Suv o''tkazmaydigan, 15.6" noutbuk sig''adi.', false, 's3');

-- 5. Ruxsatlarni (RLS) sozlash
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;

-- Barchaga o'qish (SELECT) ruxsatini berish
CREATE POLICY "Public profiles are viewable by everyone." ON sellers FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone." ON products FOR SELECT USING (true);

-- Barchaga mahsulot qo'shish (INSERT) ruxsatini berish (Hozircha ochiq qoldiramiz, keyinchalik Auth bilan yopish mumkin)
CREATE POLICY "Anyone can insert products." ON products FOR INSERT WITH CHECK (true);

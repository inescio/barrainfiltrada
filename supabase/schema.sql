-- Coffees table
CREATE TABLE IF NOT EXISTS coffees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  origin TEXT NOT NULL,
  process TEXT NOT NULL,
  altitude TEXT,
  roaster TEXT,
  flavor_notes TEXT[],
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Editions/events table
CREATE TABLE IF NOT EXISTS editions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  attendees INTEGER DEFAULT 0,
  average_rating DECIMAL(3,1) DEFAULT 0,
  image_url TEXT,
  event_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coffee_id UUID REFERENCES coffees(id) ON DELETE SET NULL,
  general_rating INTEGER CHECK (general_rating BETWEEN 1 AND 5),
  aroma INTEGER CHECK (aroma BETWEEN 1 AND 5),
  acidity INTEGER CHECK (acidity BETWEEN 1 AND 5),
  sweetness INTEGER CHECK (sweetness BETWEEN 1 AND 5),
  body INTEGER CHECK (body BETWEEN 1 AND 5),
  aftertaste INTEGER CHECK (aftertaste BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed data
INSERT INTO coffees (name, origin, process, altitude, roaster, flavor_notes, description, is_active) VALUES
('Terroir', 'Águas Paulistas, Brasil', 'Natural', '700–1.100 msnm', 'Ángel', ARRAY['Chocolate', 'Azúcar Mascabo', 'Ácido Cítrico', 'Crema'], 'Chocolate, azúcar mascabo, ácido cítrico y crema. Ácido, herbal y acaramelado.', true),
('Berry Bliss', 'Alta Mogiana, Brasil', 'Natural', '700–1.100 msnm', 'Ángel', ARRAY['Arándanos', 'Jarabe de Arce', 'Azúcar Mascabo', 'Crema'], 'Balanceado y cremoso. Suave, dulce y aromático.', false),
('San Agustín', 'Huila, Colombia', 'Lavado', '1.700 msnm', 'Ángel', ARRAY['Frutos Rojos', 'Caramelo', 'Chocolate Negro'], 'Cuerpo sedoso con aroma bien intenso. Balanceado y sutil.', false);

INSERT INTO editions (number, title, description, attendees, average_rating, image_url, event_date) VALUES
(4, 'Benteveo Café', 'Con Fuego Tostadores de Café. Joaquín V. González 460.', 42, 4.9, 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9mWxP58k1Rl9HQEyi1Q-_I30jFSjAnRrN5F9LAVeo4taYBn03JNNJmk9XWhyoBQtk528wFXG72p0mJZeth_rSvtGmdJ4NjQAyzb45MWY4bwBMFtj1VSct_yVPFFNUCJCJ_Z8xzjr0vDaOPYzwUi1wK9bmyfB3cjV4l_lI2s8Sg2Lx2nftmKaB4AJvcgABBTgPcyGw7fF7eLxId3TTKJMiqQz_f2k5ef0mUk2XN55HjBejX2hS1Orlfy1yVhNrlaqQFEAazJ4odefp', '2025-05-02'),
(3, 'Antonieta', 'Con La Motofeca. Pelagio B. Luna 321.', 35, 4.8, 'https://lh3.googleusercontent.com/aida-public/AB6AXuByAKWRu8GW3jmc8da_KrH7iLLfCgpNm45wjyLlf5DdkSyW1Nnc7Xjo5NqTYRlV6kQYUPwbhIH6fB42qU23weIBUh4ctFWL5_9RDTl9M5fEqvgAakcDu8zgeI_7h31KWg6YzRQcnBixLomJTRBjDdXCj1yE5tdyYthN6nHoB2A8unPwT2o_b6KksWn_W021g9cPo3ZED4fMYni8Wwr3v0iTBVIXPr6ACoB13XE1mfxYAEVtb161xxsbG-Vg0fZ1MJDHquHHW8HtZ0cV', '2025-04-23'),
(2, 'Donato. Café Club', 'Con Stellar Specialty Coffee. Peatonal Buenos Aires 37.', 0, 0, NULL, '2025-04-16'),
(1, 'Gardelito Club', 'Con John & Joe Café de Especialidad. Urquiza 925.', 0, 0, NULL, '2025-04-09');

🏥 Hospital Appointment Management System

Full-Stack Uygulama • Ruby on Rails API + React Frontend • AI-Assisted Development

Bu proje; doktor, hasta, bölüm ve randevu yönetimini tek bir panelde toplayan modern bir Hastane Randevu ve Yönetim Sistemidir.
Kullanıcı dostu arayüzü, düzenli API yapısı ve tamamlayıcı test otomasyonuyla, uçtan uca bir full-stack geliştirme çalışması sunmaktadır.

🧠 AI Destekli Geliştirme (Antigravity)

Bu projeyi benim için değerli kılan noktalardan biri de geliştirme sürecinde Microsoft Antigravity kullanmış olmamdır.
Antigravity, proje içerindeki birçok yapılandırma ve dosyalama adımını hızlandırarak geliştirme sürecini oldukça verimli hale getirdi.

Özellikle:

proje iskeletinin oluşturulması,

sayfa ve component şablonlarının üretilmesi,

API akışlarının düzenlenmesi,

test dosyalarının hazırlanması

gibi adımlarda çoklu ajan yapısından yararlanarak zamandan tasarruf ettim ve tasarım/mimari kararlarına daha fazla odaklanabildim.

Bu proje benim için sadece bir full-stack deneyimi değil, aynı zamanda AI-assisted software development yaklaşımını gerçek bir projede uygulama fırsatı oldu.

🚀 Kullanılan Teknolojiler
Backend – Ruby on Rails 8 (API-only)

RESTful API mimarisi

SQLite veritabanı

CORS yapılandırması

Validasyonlar

Model ilişkileri (has_many / belongs_to)

Frontend – React 18 + Vite

React Router ile çoklu sayfa yönetimi

Axios ile API istekleri

Lucide React ikon seti

Custom CSS (Soft Pro Healthcare Tema)

Test & Otomasyon – Cypress

Uçtan uca test senaryoları

Otomatik video kaydı

Mouse hareketleri / tıklama loglama

Voiceover script üretimi

.srt altyazı oluşturma

📌 Öne Çıkan Özellikler
🏥 Bölüm Yönetimi

Bölüm ekleme / düzenleme / silme

Doktorlara bölüm atama

👨‍⚕️ Doktor Yönetimi

Doktor ekleme

Doktor profili

İlgili bölüm bilgisi

Doktora ait randevuların görüntülenmesi

👤 Hasta Yönetimi

Hasta kaydı

Hasta detay sayfası

Randevu geçmişi

📅 Randevu Yönetimi

Doktor & hasta seçilerek randevu oluşturma

Tarih / saat seçimi

Çakışma kontrol mekanizması

📊 Dashboard

Doktor / hasta / randevu istatistikleri

Günlük randevu listesi

📁 Proje Yapısı
hospital_app/
 ├── backend/            # Rails API
 ├── frontend/           # React UI
 ├── cypress/            # Test otomasyonu
 ├── demo-output/        # Video, loglar, voiceover script, altyazı
 └── README.md

⚙️ Kurulum Talimatları
1. Backend (Rails API)
cd backend
bundle install
rails db:migrate
rails db:seed
rails s


Varsayılan API adresi:

http://localhost:3000/api/v1/

2. Frontend (React + Vite)
cd frontend
npm install
npm run dev


Uygulama:

http://localhost:5173

3. Cypress Testlerini Çalıştırma
cd frontend
npx cypress run


Video çıktıları:

frontend/cypress/videos/



👩‍💻 Geliştirici

Aybüke Turgun
Software Engineering Student
